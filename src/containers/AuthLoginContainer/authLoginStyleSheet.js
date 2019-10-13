import { StyleSheet } from 'react-native'
import Colors from '@Colors'

const style = StyleSheet.create({
  page: {
    backgroundColor: Colors.SECONDARY,
    paddingBottom: 10,
    flex: 1,
  },
  headerText: {
    fontSize: 32,
    marginBottom: 32,
    color: Colors.PRIMARY_TEXT,
  },
  loginContainer: {
    height: 350,
    marginBottom: 16,
    paddingHorizontal: 28,
  },
})

export default style
