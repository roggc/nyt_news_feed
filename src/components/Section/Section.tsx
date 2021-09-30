import React from 'react'
import styled from 'styled-components/native'
import { sections } from '../../data'
import { Text } from '../utils'
import { useDispatch } from 'react-redux'
import { setSectionIndex } from '../../redux'

interface ISectionProps {
  setSection: React.Dispatch<React.SetStateAction<string>>
}

const Section: React.FC<ISectionProps> = ({ setSection }) => {
  const dispatch = useDispatch()
  const renderItem = ({ item }: any) => {
    const section_ = item as string
    const sectionIndex = sections.findIndex((sect) => sect === section_)
    return (
      <Button
        onPress={() => {
          setSection(section_)
          dispatch(setSectionIndex(sectionIndex))
        }}
        title={section_}
      />
    )
  }
  return (
    <Wrapper>
      <Text isBold>Section</Text>
      <FlatList
        contentContainerStyle={{ alignSelf: 'flex-start' }}
        numColumns={Math.ceil(sections.length / 2)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={sections}
        renderItem={renderItem}
      />
    </Wrapper>
  )
}

export default Section

const Button = styled.Button`
  margin: 0px;
  padding: 0px;
`
const FlatList = styled.FlatList`
  padding: 0px;
  margin: 0px;
`

const Wrapper = styled.View`
  padding: 10px;
`
