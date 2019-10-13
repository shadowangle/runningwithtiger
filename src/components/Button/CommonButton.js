import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Colors from '@Colors'
import styles from './buttonStyleSheet'

const CommonButton = ({
  onPress,
  title,
  color,
  textColor,
  disabled,
  children,
  width,
  height,
  style,
}) => (
  <View>
    <TouchableOpacity
      style={[
        styles.commonButton,
        { backgroundColor: color || Colors.SECONDARY_TEXT },
        style,
        width && { width },
        height && { height },
      ]}
      onPress={onPress}
    >
      {title ? (
        <Text
          style={[styles.commonText, { color: textColor || Colors.SECONDARY }]}
        >
          {title}
        </Text>
      ) : typeof children !== 'string' ? (
        children
      ) : (
        <Text>{children}</Text>
      )}
    </TouchableOpacity>
  </View>
)

export default CommonButton
