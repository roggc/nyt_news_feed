import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components/native'
import { Platform } from 'react-native'
import DDP, { ValueType } from 'react-native-dropdown-picker'
import RNPickerSelect from 'react-native-picker-select'
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

/**
 * shows two dropdowns to filter by location and keywords
 */
const Filter: React.FC<IFilterProps> = ({ results, setFilteredResults }) => {
  const [descriptionDropDownValue, setDescriptionDropDownValue] = useState<
    string | null
  >(null)
  const [descriptionDropDownOpen, setDescriptionDropDownOpen] = useState(false)
  const [locationDropDownValue, setLocationDropDownValue] = useState<
    string | null
  >(null)
  const [locationDropDownOpen, setLocationDropDownOpen] = useState(false)
  const [descriptionKeys, setDescriptionKeys] = useState<string[]>([])
  const [locationKeys, setLocationKeys] = useState<string[]>([])
  const [descriptionDropDownItems, setDescriptionDropDownItems] = useState<
    IDropDownItem[]
  >([])
  const [locationDropDownItems, setLocationDropDownItems] = useState<
    IDropDownItem[]
  >([])

  // set new location key words and description key words when results change
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

  // refill description keywords dropdown
  useEffect(() => {
    const descriptionDropDownItems_: IDropDownItem[] =
      Platform.OS === 'android'
        ? []
        : [
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

  // refill location keywords dropdown
  useEffect(() => {
    const locationDropDownItems_: IDropDownItem[] =
      Platform.OS === 'android'
        ? []
        : [
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

  /**
   * filters by location keywords
   */
  const filterByLocation = useCallback(
    (value: ValueType | ValueType[] | null) => {
      if (Platform.OS === 'android') {
        setLocationDropDownValue(value as string)
      }
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

  /**
   * filters by description keywords
   */
  const filterByKeyword = useCallback(
    (value: ValueType | ValueType[] | null) => {
      if (Platform.OS === 'android') {
        setDescriptionDropDownValue(value as string)
      }
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

  /**
   * renders dropdowns for iOS
   * @returns {JSX.Element}
   */
  const getDropDwonsForIOS = () => (
    <>
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
          containerStyle={{ width: DROP_DOWN_WIDTH }}
          placeholder={KEYWORDS_DROP_DOWN_DO_NOT_FILTER_VALUE}
          onChangeValue={filterByKeyword}
        />
      </DropDownWrapper>
    </>
  )

  /**
   * renders dropdowns for android
   */
  const getDropDownsForAndroid = useCallback(
    () => (
      <>
        <RNPickerSelect
          onValueChange={filterByLocation}
          items={locationDropDownItems}
          style={{
            inputAndroid: { color: 'black', width: 150 },
            placeholder: { color: 'black' },
          }}
          placeholder={{
            label: LOCATION_DROP_DOWN_DO_NOT_FILTER_VALUE,
            value: null,
          }}
          value={locationDropDownValue}
        />
        <RNPickerSelect
          onValueChange={filterByKeyword}
          items={descriptionDropDownItems}
          style={{
            inputAndroid: { width: 150, color: 'black' },
            placeholder: { color: 'black' },
          }}
          placeholder={{
            label: KEYWORDS_DROP_DOWN_DO_NOT_FILTER_VALUE,
            value: null,
          }}
          value={descriptionDropDownValue}
        />
      </>
    ),
    [
      locationDropDownItems,
      descriptionDropDownItems,
      filterByLocation,
      filterByKeyword,
      locationDropDownValue,
      descriptionDropDownValue,
    ]
  )

  return (
    <FilterWrapper>
      {Platform.OS !== 'android'
        ? getDropDwonsForIOS()
        : getDropDownsForAndroid()}
    </FilterWrapper>
  )
}

export default Filter

const FilterWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: deepskyblue;
`

const DropDownPicker = styled(DDP)`
  width: ${DROP_DOWN_WIDTH}px;
`
const DropDownWrapper = styled.View`
  margin: 5px;
`
