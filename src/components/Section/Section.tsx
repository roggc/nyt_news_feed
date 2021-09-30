import React from 'react'
import styled from 'styled-components/native'
import { sections } from '../../data'

interface ISectionProps {
  setSection: React.Dispatch<React.SetStateAction<string>>
}

const Section: React.FC<ISectionProps> = ({ setSection }) => {
  const renderItem = ({ item }: any) => {
    const section_ = item as string
    return (
      <Button
        onPress={() => {
          setSection(section_)
        }}
        title={section_}
      />
    )
  }
  return (
    <FlatList
      contentContainerStyle={{ alignSelf: 'flex-start' }}
      numColumns={Math.ceil(sections.length / 2)}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={sections}
      renderItem={renderItem}
    />
  )
}

export default Section

const Button = styled.Button`
  margin: 5px;
`
const FlatList = styled.FlatList``
