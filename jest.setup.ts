import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import { NativeModules } from 'react-native'

NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
}

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)
