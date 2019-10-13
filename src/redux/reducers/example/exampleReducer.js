import initialState from './exampleInitialState'
import ACTION from '../../actionTypes/exampleActionTypes'

const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.EXAMPLE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default exampleReducer
