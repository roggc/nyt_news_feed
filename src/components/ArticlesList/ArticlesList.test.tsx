import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'
import ArticlesList from '.'

it('renders', () => {
  render(<ArticlesList results={[]} />)
})
