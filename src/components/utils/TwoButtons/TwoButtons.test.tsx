import React from 'react'
import { render } from '@testing-library/react-native'
import { TwoButtons } from '.'

it('renders', () => {
  render(
    <TwoButtons
      onPressButtonBottom={() => {}}
      onPressButtonTop={() => {}}
      titleBottom=""
      titleTop=""
    />
  )
})
