import React from 'react'
import styled from 'styled-components/native'
import { ListRenderItem, FlatList } from 'react-native'
import { Text } from '../utils'
import { IResult } from '../../interfaces'
import moment from 'moment'

const LITTLE_FONT_SIZE = 10

interface IArticlesListProps {
  results: IResult[]
}

/**
 * displays a list of articles
 */
const ArticlesList: React.FC<IArticlesListProps> = ({ results }) => {
  const momentNow = moment()
  const momentNowYear = momentNow.year()
  const momentNowMonth = momentNow.month()
  const momentNowDate = momentNow.date()
  const momentNowHour = momentNow.hour()
  const momentNowMinute = momentNow.minute()

  const renderItem: ListRenderItem<IResult> = ({ item: result }) => {
    let published = ''
    const momentPublished = moment(result.published_date)
    const momentPublishedMinute = momentPublished.minute()
    const momentPublishedHour = momentPublished.hour()
    const momentPublishedDate = momentPublished.date()
    const momentPublishedMonth = momentPublished.month()
    const momentPublishedYear = momentPublished.year()

    if (momentPublishedYear === momentNowYear) {
      if (momentPublishedMonth === momentNowMonth) {
        if (momentPublishedDate === momentNowDate) {
          if (momentPublishedHour === momentNowHour) {
            published = `${momentNowMinute - momentPublishedMinute} minutes ago`
          } else {
            published = `${momentNowHour - momentPublishedHour} hours ago`
          }
        } else {
          published = `${momentNowDate - momentPublishedDate} days ago`
        }
      } else {
        published = `${momentNowMonth - momentPublishedMonth} months ago`
      }
    } else {
      published = `${momentNowYear - momentPublishedYear} years ago`
    }

    return (
      <ArticleWrapper>
        <Image source={{ uri: result.multimedia.url }} />
        <ArticleRightSide>
          <Text isBold style={{ flexShrink: 1 }}>
            {result.title}
          </Text>
          <BottomText>
            <Text fontSize={LITTLE_FONT_SIZE}>{result.byline}</Text>
            <Text fontSize={LITTLE_FONT_SIZE}>{`Published: ${published}`}</Text>
          </BottomText>
        </ArticleRightSide>
      </ArticleWrapper>
    )
  }
  return (
    <StyledFlatList
      renderItem={renderItem}
      data={results}
      keyExtractor={(item) => item.title}
    />
  )
}

export default ArticlesList

const StyledFlatList = styled(FlatList as new () => FlatList<IResult>)`
  z-index: -1;
  elevation: -1;
  background-color: lightblue;
`

const ArticleWrapper = styled.View`
  flex-direction: row;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  background-color: white;
`
const Image = styled.Image`
  width: 100px;
  height: 100px;
`
const ArticleRightSide = styled.View`
  justify-content: space-between;
  flex-shrink: 1;
  margin-left: 10px;
`

const BottomText = styled.View``
