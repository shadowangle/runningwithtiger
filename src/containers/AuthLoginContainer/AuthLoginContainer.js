import React, { Component } from 'react'
import {
  View,
  BackHandler,
  ScrollView,
  Text,
  AsyncStorage,
  Image
} from 'react-native'
import { Formik } from 'formik'
import { TextField } from 'react-native-material-textfield'
// import { Button } from '@Components'
import Colors from '@Colors'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

import styles from './authLoginStyleSheet'
import moment from 'moment'

export class AuthLoginContainer extends Component {
  static navigationOptions = {}

  state = {
    stat: false,
    sum: 0
  }

  componentDidMount() {
    // this.backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this._backButtonHandler,
    // )

    this.getStat()
  }

  async getStat() {
    let oldRecord = await AsyncStorage.getItem(`@runx:history`)
    let sum = 0
    if (JSON.parse(oldRecord) !== null) {
      this.setState({ stat: JSON.parse(oldRecord) })

      JSON.parse(oldRecord).map(data => {
        sum += +data.distance.toFixed(2)
        this.setState({ sum })
      })

    }
  }

  // componentWillUnmount() {
  //   this.backHandler.remove()
  // }

  _ฺBack = () => {
    Actions.test()
  }

  // _backButtonHandler = () => false

  render() {
    const { stat } = this.state

    return (
      <View style={styles.page}>
        <ScrollView style={styles.scrollView}>
      <Card title={`ประวัติย้อนหลัง (ระยะทั้งหมด ${this.state.sum} KM.)`} />
  {
    stat && stat.map((data, i) => {
      return (
      <Card containerStyle={{padding: 8}} >
        <Text>วันที่: {moment(data.startTime).format("YYYY-MM-DD HH:mm:ss")}</Text>
        <Text>เวลา: {Math.floor(data.duration / 60)} mins</Text>
        <Text>ระยะทาง: {data.distance.toFixed(2)} Km.</Text>
    </Card>
      );
    })
  }
  </ScrollView>
  {/* <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
    <Button
      raised
      onPress={this._ฺBack}
      buttonStyle={{ backgroundColor: '#ff4f00', borderRadius: 10 }}
      textStyle={{ textAlign: 'center' }}
      title={`กลับ`}
        />
    </View> */}
    </View>
    )
  }
}

export default AuthLoginContainer
