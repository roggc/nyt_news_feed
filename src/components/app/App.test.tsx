/**
 * @format
 */

//import 'react-native'
import React from 'react'
import App from '.'
import { render } from '@testing-library/react-native'
// import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock'

// jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo)
// jest.doMock('react-dom', () => ({
//   render: jest.fn(),
// }))

it('renders correctly', () => {
  render(<App />)
})
