import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ReduxNetworkProvider, NetworkProvider } from 'react-native-offline'
import { store, persistor } from '../../redux'
import Screen from '../Screen'

/**
 * offline first nyt news feed application
 */
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReduxNetworkProvider
          pingTimeout={10000}
          pingServerUrl="https://www.google.com/"
          shouldPing={true}
          pingInterval={20000}
          pingOnlyIfOffline={false}
          pingInBackground={false}
          httpMethod="HEAD"
          customHeaders={{}}
        >
          <NetworkProvider pingInterval={20000}>
            <Screen />
          </NetworkProvider>
        </ReduxNetworkProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
