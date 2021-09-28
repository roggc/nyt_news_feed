import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ReduxNetworkProvider } from 'react-native-offline'
import { store, persistor } from '../../redux'

const baseUrl = 'https://api.nytimes.com/svc/topstories/v2'
const apiKey = 'uBA5APCAHea1N6NfOmtJkqYaWo89TvgN'
const topic = 'science'

type OkType = 'OK'

type ImageType = 'image'

interface IMultimedia {
  url: string
  type: ImageType | string
}

export interface IResult {
  byline: string
  title: string
  published_date: string
  geo_facet: string[]
  des_facet: string[]
  multimedia: IMultimedia
}

interface IData {
  status: OkType | string
  results: any[]
}

const App = () => {
  useEffect(() => {
    const fetchAsync = async () => {
      try {
        const resp = await fetch(`${baseUrl}/${topic}.json?api-key=${apiKey}`)
        const { status, results }: IData = await resp.json()
        if (status === 'OK') {
          const results_: IResult[] = []
          results.forEach((result) => {
            const {
              byline,
              title,
              published_date,
              geo_facet,
              des_facet,
              multimedia,
            } = result

            const { type, url }: IMultimedia = !!multimedia ? multimedia[0] : {}
            results_.push({
              byline,
              title,
              published_date,
              geo_facet,
              des_facet,
              multimedia: { type, url },
            })
          })
          console.log(results_)
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchAsync()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReduxNetworkProvider
          pingInBackground={true}
          pingTimeout={3000}
          httpMethod="HEAD"
          pingOnlyIfOffline={true}
          shouldPing={true}
          pingInterval={5000}
          pingServerUrl={baseUrl}
        >
          <StyledView>
            <StyledText>hello</StyledText>
          </StyledView>
        </ReduxNetworkProvider>
      </PersistGate>
    </Provider>
  )
}

const StyledView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const StyledText = styled.Text`
  font-weight: 700;
`

export default App
