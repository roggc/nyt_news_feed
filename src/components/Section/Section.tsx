import React, { useMemo } from 'react'
import styled from 'styled-components/native'
import { FlatList, ListRenderItem } from 'react-native'
import { sections } from '../../data'
import { Text } from '../utils'
import { useDispatch } from 'react-redux'
import { setSectionIndex } from '../../redux'
import { TwoButtons } from '../utils'

const FIRST_SECTION = 0
const SECOND_SECTION = 1

interface ISection_ {
  section: string
  index: number
}

interface ISectionRevisited {
  value: ISection_[]
  id: number
}

interface ISectionProps {
  setSection: React.Dispatch<React.SetStateAction<string>>
}

const Section: React.FC<ISectionProps> = ({ setSection }) => {
  const dispatch = useDispatch()

  const renderItem: ListRenderItem<ISectionRevisited> = ({
    item: twoSections,
  }) => {
    const showResultsForSection = (section_: ISection_) => () => {
      setSection(section_.section)
      dispatch(setSectionIndex(section_.index))
    }
    return (
      <TwoButtons
        onPressButtonBottom={showResultsForSection(
          twoSections.value[FIRST_SECTION]
        )}
        onPressButtonTop={showResultsForSection(
          twoSections.value[SECOND_SECTION]
        )}
        titleBottom={twoSections.value[FIRST_SECTION].section}
        titleTop={twoSections.value[SECOND_SECTION].section}
        style={{ margin: 5 }}
      />
    )
  }

  const sections_ = useMemo(() => {
    const sections_: ISection_[] = sections.map((section, index) => ({
      section,
      index,
    }))
    const sections__: ISectionRevisited[] = []
    for (let i = 0; i < sections_.length; i += 2) {
      sections__.push({ value: [sections_[i], sections_[i + 1]], id: i })
    }
    return sections__
  }, [sections])

  return (
    <Wrapper>
      <Text isBold>Section</Text>
      <StyledFlatList
        contentContainerStyle={{ alignSelf: 'flex-start' }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={sections_}
        renderItem={renderItem}
      />
    </Wrapper>
  )
}

export default Section

const StyledFlatList = styled(
  FlatList as new () => FlatList<ISectionRevisited>
)`
  padding: 0px;
  margin: 0px;
`

const Wrapper = styled.View`
  padding: 10px;
  background-color: ghostwhite;
`
