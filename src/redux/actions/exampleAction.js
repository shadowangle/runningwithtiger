import ACTION from '../actionTypes/exampleActionTypes'

const exampleAction = payload => ({
  type: ACTION.EXAMPLE,
  payload,
})

export default {
  exampleAction,
}
