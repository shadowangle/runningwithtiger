import { Platform, StatusBar } from 'react-native'

const statusBarHeight = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight

export default statusBarHeight
