import React, { Component } from 'react'
import { View } from 'react-native'
import { Provider, connect } from 'react-redux'
import { Router, Scene } from 'react-native-router-flux'
import configureStore from '@Configs/configureStore'
import RouterScene from './src/Router'
const store = configureStore()
const RouterWithRedux = connect()(Router)
import Geolocation from '@react-native-community/geolocation'

const config = {
  skipPermissionRequests: false,
  authorizationLevel: 'auto'
}

Geolocation.setRNConfiguration(config)
export default class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>{RouterScene()}</RouterWithRedux>
      </Provider>
    )
  }
}
