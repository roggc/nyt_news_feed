import React from 'react'
import styled from 'styled-components/native'
import { Text } from '../utils'
import { IResult } from '../../interfaces'

interface IArticlesListProps {
  results: IResult[]
}

const ArticlesList: React.FC<IArticlesListProps> = ({ results }) => {
  const renderItem = ({ item }: any) => {
    const result = item as IResult
    return (
      <ArticleWrapper key={result.title}>
        <Image source={{ uri: result.multimedia.url }} />
        <ArticleRightSide>
          <Text isBold style={{ flexShrink: 1 }}>
            {result.title}
          </Text>
          <BottomText>
            <Text fontSize={10}>{result.byline}</Text>
            <Text fontSize={10}>{result.published_date}</Text>
          </BottomText>
        </ArticleRightSide>
      </ArticleWrapper>
    )
  }
  return <FlatList renderItem={renderItem} data={results} />
}

export default ArticlesList

const FlatList = styled.FlatList``

const ArticleWrapper = styled.View`
  flex-direction: row;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  background-color: green;
`
const Image = styled.Image`
  width: 100px;
  height: 100px;
`
const ArticleRightSide = styled.View`
  justify-content: space-between;
  flex-shrink: 1;
`

const BottomText = styled.View``
