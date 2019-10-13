const actionCreator = actionName => ({
  REQUEST: `${actionName}.REQUEST`,
  SUCCESS: `${actionName}.SUCCESS`,
  FAILURE: `${actionName}.FAILURE`,
})

export default actionCreator
