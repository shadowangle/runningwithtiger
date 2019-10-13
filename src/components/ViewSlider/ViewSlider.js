import React, { Component, Fragment } from 'react'
import { View } from 'react-native'
import Swiper from 'react-native-swiper'
import PropTypes from 'prop-types'
import Colors from '@Colors'

export class ViewSlider extends Component {
  static propTypes = {
    items: PropTypes.array,
    style: PropTypes.object,
    dotColor: PropTypes.string,
  }
  static defaultProps = {
    items: [],
    style: {},
    dotColor: '',
  }

  render() {
    const { items, style, dotColor } = this.props
    return (
      <View style={style}>
        <Swiper
          dotColor={`${dotColor || Colors.WHITE_SMOKE}32`}
          activeDotColor={dotColor || Colors.WHITE_SMOKE}
        >
          {items.map((item, index) => (
            <Fragment key={index}>{item}</Fragment>
          ))}
        </Swiper>
      </View>
    )
  }
}

export default ViewSlider
