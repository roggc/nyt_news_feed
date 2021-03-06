//import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'
import Section from '.'
import { Provider } from 'react-redux'
import { store } from '../../redux'

it('renders', () => {
  render(
    <Provider store={store}>
      <Section setSection={() => {}} />
    </Provider>
  )
})
