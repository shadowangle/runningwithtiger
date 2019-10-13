import React from 'react'
import { Stack, Scene } from 'react-native-router-flux'
import { AuthHomeContainer, AuthLoginContainer, AppContainer } from '@Containers'
import { statusBarHeight } from '@Utils'
import Colors from '@Colors'
import NAVBAR_LOGO from '@Images/navbar-logo/navbar-logo.png'

const navBarStyle = {
  paddingTop: statusBarHeight,
  backgroundColor: Colors.SECONDARY,
  height: 100,
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth: 0,
}

const App = () => (
  <Stack
    key="root"
  >
    <Scene key="test" component={AppContainer} type="reset" title="Home" />
    <Scene key="authHome" component={AuthHomeContainer} title="Tracking" />
    <Scene key="login" component={AuthLoginContainer} title="History" />
  </Stack>
)

export default App
