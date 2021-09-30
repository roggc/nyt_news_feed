import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { baseUrl, apiKey } from '../../utils'
import { IData, IResult, IMultimedia } from '../../interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, setResults } from '../../redux'
import { sections } from '../../data'
import Section from '../Section'
import Header from '../Header'
import ArticlesList from '../ArticlesList'
import Filter from '../Filter'
import { useIsConnected } from 'react-native-offline'

const SINGLE_OR_DEFAULT = 0

const Screen = () => {
  const dispatch = useDispatch()
  const { isConnected } = useSelector((state: RootState) => state.network)
  const { results, sectionIndex } = useSelector(
    (state: RootState) => state.reducer
  )
  const [section, setSection] = useState(sections[sectionIndex])
  const [filteredResults, setFilteredResults] = useState(results)
  const isConnected_ = useIsConnected()

  useEffect(() => {
    const fetchAsync = async () => {
      try {
        const resp = await fetch(`${baseUrl}/${section}.json?api-key=${apiKey}`)
        const { status, results: results__ }: IData = await resp.json()
        if (status === 'OK') {
          const results_: IResult[] = []
          results__.forEach((result) => {
            const {
              byline,
              title,
              published_date,
              geo_facet,
              des_facet,
              multimedia,
            } = result
            const { type, url }: IMultimedia = !!multimedia
              ? multimedia[SINGLE_OR_DEFAULT]
              : {}
            results_.push({
              byline,
              title,
              published_date,
              geo_facet,
              des_facet,
              multimedia: { type, url },
            })
          })
          dispatch(setResults(results_))
        }
      } catch (e) {
        console.log(e)
      }
    }
    isConnected && fetchAsync()
  }, [isConnected, section, isConnected_])

  return (
    <View>
      <Header />
      <Section setSection={setSection} />
      <Filter results={results} setFilteredResults={setFilteredResults} />
      <ArticlesList results={filteredResults} />
    </View>
  )
}

export default Screen

const View = styled.View`
  flex: 1;
`
