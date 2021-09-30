import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'
import Section from '.'

it('renders', () => {
  render(<Section setSection={() => {}} />)
})
