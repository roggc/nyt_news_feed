import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components/native'
import DDP, { ValueType } from 'react-native-dropdown-picker'
import { IResult } from '../../interfaces'

const DROP_DOWN_WIDTH = 150
const LOCATION_DROP_DOWN_DO_NOT_FILTER_VALUE = 'Location'
const KEYWORDS_DROP_DOWN_DO_NOT_FILTER_VALUE = 'Keywords'

interface IDropDownItem {
  label: string
  value: string
}

interface IFilterProps {
  results: IResult[]
  setFilteredResults: React.Dispatch<React.SetStateAction<IResult[]>>
}

const Filter: React.FC<IFilterProps> = ({ results, setFilteredResults }) => {
  const [descriptionDropDownValue, setDescriptionDropDownValue] = useState(null)
  const [descriptionDropDownOpen, setDescriptionDropDownOpen] = useState(false)
  const [locationDropDownValue, setLocationDropDownValue] = useState(null)
  const [locationDropDownOpen, setLocationDropDownOpen] = useState(false)
  const [descriptionKeys, setDescriptionKeys] = useState<string[]>([])
  const [locationKeys, setLocationKeys] = useState<string[]>([])
  const [descriptionDropDownItems, setDescriptionDropDownItems] = useState<
    IDropDownItem[]
  >([])
  const [locationDropDownItems, setLocationDropDownItems] = useState<
    IDropDownItem[]
  >([])
  useEffect(() => {
    const descriptionKeys_: string[] = []
    const locationKeys_: string[] = []
    results.forEach((result) => {
      const { des_facet, geo_facet } = result
      if (des_facet) {
        des_facet.forEach((desKey) => {
          if (!descriptionKeys_.some((desKey_) => desKey === desKey_)) {
            descriptionKeys_.push(desKey)
          }
        })
      } else {
        console.log('des_facet undefined')
      }
      if (geo_facet) {
        geo_facet.forEach((geoKey) => {
          if (!locationKeys_.some((geoKey_) => geoKey === geoKey_)) {
            locationKeys_.push(geoKey)
          }
        })
      } else {
        console.log('geo_facet undefined')
      }
    })
    setDescriptionKeys(descriptionKeys_.sort((a, b) => (a > b ? 1 : -1)))
    setLocationKeys(locationKeys_.sort((a, b) => (a > b ? 1 : -1)))
  }, [results])
  useEffect(() => {
    const descriptionDropDownItems_: IDropDownItem[] = [
      {
        label: KEYWORDS_DROP_DOWN_DO_NOT_FILTER_VALUE,
        value: KEYWORDS_DROP_DOWN_DO_NOT_FILTER_VALUE,
      },
    ]
    descriptionKeys.forEach((key) => {
      descriptionDropDownItems_.push({ label: key, value: key })
    })
    setDescriptionDropDownItems(descriptionDropDownItems_)
    setDescriptionDropDownOpen(false)
    setDescriptionDropDownValue(null)
  }, [descriptionKeys])
  useEffect(() => {
    const locationDropDownItems_: IDropDownItem[] = [
      {
        label: LOCATION_DROP_DOWN_DO_NOT_FILTER_VALUE,
        value: LOCATION_DROP_DOWN_DO_NOT_FILTER_VALUE,
      },
    ]
    locationKeys.forEach((key) => {
      locationDropDownItems_.push({ label: key, value: key })
    })
    setLocationDropDownItems(locationDropDownItems_)
    setLocationDropDownOpen(false)
    setLocationDropDownValue(null)
  }, [locationKeys])
  const filterByLocation = useCallback(
    (value: ValueType | ValueType[] | null) => {
      let filteredResults_: IResult[] = []
      if (value === LOCATION_DROP_DOWN_DO_NOT_FILTER_VALUE || value === null) {
        if (
          descriptionDropDownValue === KEYWORDS_DROP_DOWN_DO_NOT_FILTER_VALUE ||
          descriptionDropDownValue === null
        ) {
          filteredResults_ = [...results]
        } else {
          filteredResults_ = results.filter((result) =>
            result.des_facet.some(
              (desKey) => desKey === descriptionDropDownValue
            )
          )
        }
      } else {
        if (
          descriptionDropDownValue === KEYWORDS_DROP_DOWN_DO_NOT_FILTER_VALUE ||
          descriptionDropDownValue === null
        ) {
          filteredResults_ = results.filter((result) =>
            result.geo_facet.some((geoKey) => geoKey === value)
          )
        } else {
          filteredResults_ = results
            .filter((result) =>
              result.geo_facet.some((geoKey) => geoKey === value)
            )
            .filter((result) =>
              result.des_facet.some(
                (desKey) => desKey === descriptionDropDownValue
              )
            )
        }
      }
      setFilteredResults(filteredResults_)
    },
    [results, descriptionDropDownValue]
  )
  const filterByKeyword = useCallback(
    (value: ValueType | ValueType[] | null) => {
      let filteredResults_: IResult[] = []
      if (value === KEYWORDS_DROP_DOWN_DO_NOT_FILTER_VALUE || value === null) {
        if (
          locationDropDownValue === LOCATION_DROP_DOWN_DO_NOT_FILTER_VALUE ||
          locationDropDownValue === null
        ) {
          filteredResults_ = [...results]
        } else {
          filteredResults_ = results.filter((result) =>
            result.geo_facet.some((geoKey) => geoKey === locationDropDownValue)
          )
        }
      } else {
        if (
          locationDropDownValue === LOCATION_DROP_DOWN_DO_NOT_FILTER_VALUE ||
          locationDropDownValue === null
        ) {
          filteredResults_ = results.filter((result) =>
            result.des_facet.some((desKey) => desKey === value)
          )
        } else {
          filteredResults_ = results
            .filter((result) =>
              result.des_facet.some((desKey) => desKey === value)
            )
            .filter((result) =>
              result.geo_facet.some(
                (geoKey) => geoKey === locationDropDownValue
              )
            )
        }
      }
      setFilteredResults(filteredResults_)
    },
    [results, locationDropDownValue]
  )
  return (
    <FilterWrapper>
      <DropDownWrapper>
        <DropDownPicker
          items={locationDropDownItems}
          value={locationDropDownValue}
          setValue={setLocationDropDownValue}
          open={locationDropDownOpen}
          setOpen={setLocationDropDownOpen}
          onOpen={() => {
            setDescriptionDropDownOpen(false)
          }}
          zIndex={1000}
          containerStyle={{ width: DROP_DOWN_WIDTH }}
          placeholder={LOCATION_DROP_DOWN_DO_NOT_FILTER_VALUE}
          onChangeValue={filterByLocation}
        />
      </DropDownWrapper>
      <DropDownWrapper>
        <DropDownPicker
          items={descriptionDropDownItems}
          value={descriptionDropDownValue}
          setValue={setDescriptionDropDownValue}
          open={descriptionDropDownOpen}
          setOpen={setDescriptionDropDownOpen}
          onOpen={() => {
            setLocationDropDownOpen(false)
          }}
          zIndex={1000}
          containerStyle={{ width: DROP_DOWN_WIDTH }}
          placeholder={KEYWORDS_DROP_DOWN_DO_NOT_FILTER_VALUE}
          onChangeValue={filterByKeyword}
        />
      </DropDownWrapper>
    </FilterWrapper>
  )
}

export default Filter

const FilterWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const DropDownPicker = styled(DDP)`
  width: ${DROP_DOWN_WIDTH}px;
`
const DropDownWrapper = styled.View`
  margin: 5px;
`
