import React from 'react'
import { render } from '@testing-library/react-native'
import Screen from '.'
import { Provider } from 'react-redux'
import { store } from '../../redux'
import { NetworkProvider } from 'react-native-offline'

it('renders', () => {
  render(
    <Provider store={store}>
      <NetworkProvider>
        <Screen />
      </NetworkProvider>
    </Provider>
  )
})
