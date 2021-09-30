import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components/native'
import DDP from 'react-native-dropdown-picker'
import { IResult } from '../../interfaces'

const DROP_DOWN_WIDTH = 150

interface IDropDownItem {
  label: string
  value: string
}

interface IFilterProps {
  results: IResult[]
}

const Filter: React.FC<IFilterProps> = ({ results }) => {
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
    const descriptionDropDownItems_: IDropDownItem[] = []
    descriptionKeys.forEach((key) => {
      descriptionDropDownItems_.push({ label: key, value: key })
    })
    setDescriptionDropDownItems(descriptionDropDownItems_)
    setDescriptionDropDownOpen(false)
    setDescriptionDropDownValue(null)
  }, [descriptionKeys])
  useEffect(() => {
    const locationDropDownItems_: IDropDownItem[] = []
    locationKeys.forEach((key) => {
      locationDropDownItems_.push({ label: key, value: key })
    })
    setLocationDropDownItems(locationDropDownItems_)
    setLocationDropDownOpen(false)
    setLocationDropDownValue(null)
  }, [locationKeys])
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
          placeholder="Location"
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
          placeholder="Keywords"
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
