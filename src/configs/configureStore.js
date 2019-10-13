import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middleware/logger'
import rootReducer from '../redux/reducers'

const ALLOW_LOGGER = false
const ALLOW_THUNK = true

export default function configureStore(preloadedState) {
  const middlewares = []
  if (ALLOW_LOGGER) {
    middlewares.push(loggerMiddleware)
  }
  if (ALLOW_THUNK) {
    middlewares.push(thunkMiddleware)
  }
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = compose(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  return store
}
