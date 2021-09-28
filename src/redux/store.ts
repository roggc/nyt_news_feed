import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { reducer as network } from 'react-native-offline'
import reducer from './reducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  reducer,
  network,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
