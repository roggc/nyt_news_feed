import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { reducer as network } from 'react-native-offline'
import reducer from './reducer'
import { offline } from '@redux-offline/redux-offline'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import { create } from 'react-test-renderer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  reducer,
  network,
})

// export const store = createStore(
//   rootReducer,
//   {},
//   compose(applyMiddleware(...[]), offline(offlineConfig))
// )

const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = createStore(
//   persistedReducer,
//   {},
//   compose(applyMiddleware(...[]), offline(offlineConfig))
// )

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof rootReducer>
