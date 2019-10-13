import { StyleSheet } from 'react-native'
import Colors from '@Colors'

const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.SECONDARY,
    flex: 1,
  },
  sliderContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 28,
  },
  sliderBox: {
    height: 350,
    width: '100%',
  },
  sliderTextHeader: {
    color: Colors.SECONDARY_TEXT,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  sliderTextContext: {
    color: Colors.SECONDARY_TEXT,
    fontSize: 16,
    marginBottom: 28,
  },
  sliderImageContainer: {
    alignItems: 'center',
  },
  sliderImage: {
    tintColor: Colors.WHITE_SMOKE,
  },
})

export default styles
