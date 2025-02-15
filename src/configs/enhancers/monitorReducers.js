const now = require('performance-now')
const round = number => Math.round(number * 100) / 100

const monitorReducerEnhancer = createStore => (
  reducer,
  initialState,
  enhancer,
) => {
  const monitoredReducer = (state, action) => {
    const start = now()
    const newState = reducer(state, action)
    const end = now()
    const diff = round(end - start)

    console.log('reducer process time:', diff)

    return newState
  }

  return createStore(monitoredReducer, initialState, enhancer)
}

export default monitorReducerEnhancer
