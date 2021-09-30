import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'
import Filter from '.'

it('renders', () => {
  render(<Filter results={[]} />)
})
