// import React from "react";
// import { View, AsyncStorage, TouchableOpacity } from "react-native";
// import { Button, Text } from 'native-base';
// // import BackgroundGeolocation from 'react-native-background-geolocation';
// import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import Spinner from 'react-native-loading-spinner-overlay';
// import haversine from "haversine";
// import _ from 'lodash';
// import styles from './home.style';
// const LATITUDE_DELTA = 0.009;
// const LONGITUDE_DELTA = 0.009;
// import * as geolib from 'geolib';

// export default class HomeScreen extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             distanceTravelled: 0,
//             odometer: 0,
//             prevLatLng: {},
//             isLoading: true,
//             runState: {},
//             runningDuration: 0,
//             isMoving: false,
//             markers: [],
//             coordinates: [],
//             showsUserLocation: true
//         };
//     }

//     componentDidMount() {
//         this.getCurrentLocation(false);
//         // AsyncStorage.removeItem(`@runx:history`)
//         console.log(BackgroundGeolocation)
//         AsyncStorage.removeItem(`@runx:runstate`);
//         this.geoLocationListener();
//     }

//     componentWillUnmount() {
//       BackgroundGeolocation.removeAllListeners();
//         // BackgroundGeolocation.events.forEach(event =>
//         //     BackgroundGeolocation.removeAllListeners(event)
//         // );
//     }

//     checkRunState = async () => {
//         const value = await AsyncStorage.getItem(`@runx:runstate`);

//         console.log('value', value)
//         if (value) {
//             const runState = JSON.parse(value);
//             if (runState.state) {
//                 const timeStart = new Date(runState.runAt).getTime();
//                 let timeDiff = 0;
//                 switch (runState.state) {
//                     case "running":
//                         timeDiff = (new Date().getTime() - timeStart) / 1000;
//                         this._interval = setInterval(() => {
//                             this.setState({ runningDuration: this.state.runningDuration + 1 })
//                         }, 1000);
//                         break;
//                     case "paused":
//                         timeDiff = (new Date(runState.pauseAt).getTime() - timeStart) / 1000;
//                         break;
//                     case "finished":
//                         timeDiff = (new Date(runState.finishAt).getTime() - timeStart) / 1000;

//                         break;
//                 }

//                 const distance = await BackgroundGeolocation.getOdometer();
//                 const locations = await BackgroundGeolocation.getLocations();
//                 console.log(locations)
//                 let coordinates = [];
//                 let markers = [...this.state.markers];
//                 if (locations.length) {
//                     _.forEach(locations, (item) => {
//                         coordinates.push({ latitude: item.coords.latitude, longitude: item.coords.longitude })
//                     })
//                     markers = [{
//                         key: locations[0].uuid,
//                         title: locations[0].timestamp,
//                         heading: locations[0].coords.heading,
//                         coordinate: {
//                             latitude: locations[0].coords.latitude,
//                             longitude: locations[0].coords.longitude
//                         }
//                     }]
//                 }

//                 this.setState({
//                     isLoading: false,
//                     runningDuration: timeDiff || 0,
//                     distanceTravelled: (distance / 1000) || 0,
//                     coordinates: coordinates,
//                     markers: markers,
//                     runState: runState
//                 })
//             } else {
//                 this.setState({ isLoading: false })
//             }
//         } else {
//             this.setState({ isLoading: false })
//         }
//     }

//     componentWillUnmount() {
//         if (this._interval) {
//             clearInterval(this._interval);
//         }
//     }

//     getCurrentLocation = (resetGeo) => {
//       BackgroundGeolocation.getCurrentLocation((location) => {
//         //console.log('- getCurrentPosition success: ', location);
//         this.addMarker(location)
//         this.setCenter(location)
//         if (resetGeo) {
//             this.resetGeoLocation();
//         } else {
//             this.checkRunState();
//         }
//     }, (error) => {
//         console.warn('- getCurrentPosition error: ', error);
//     }, { persist: true, samples: 1 });
//     }

//     geoLocationListener = () => {
//         BackgroundGeolocation.on('location', (location) => {
//             console.log('[event] location: ', location);

//             if (!location.sample) {
//                 const newCoordinate = {
//                     latitude: location.latitude,
//                     longitude: location.longitude
//                 };
//                 const { distanceTravelled } = this.state;
//                 this.addMarker(location);
//                 this.setState({
//                     distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
//                     prevLatLng: newCoordinate,
//                     odometer: (location.odometer / 1000).toFixed(1)
//                 });
//             }
//             this.setCenter(location)
//         });
//     }

//     addMarker(location) {
//       // console.log('maker', location)
//         let marker = {
//             key: location.uuid,
//             title: location.time,
//             // heading: location.coords.heading,
//             coordinate: {
//                 latitude: location.latitude,
//                 longitude: location.longitude
//             }
//         };

//         this.setState({
//             markers: [...this.state.markers, marker],
//             coordinates: [...this.state.coordinates, {
//                 latitude: location.latitude,
//                 longitude: location.longitude
//             }]
//         });
//     }

//     setCenter(location) {
//         if (!this.refs.map) { return; }

//         // console.log(location)
//         this.refs.map.animateToRegion({
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA
//         });
//     }

//     calcDistance = newLatLng => {
//         const { prevLatLng } = this.state;
//         return haversine(prevLatLng, newLatLng) || 0;
//     };

//     handleRunStateChange = async (state) => {
//         if (state) {
//             let runState = {};
//             switch (state) {
//                 case 'running':
//                     runState = { ...this.state.runState, state: 'running', runAt: new Date() };
//                     BackgroundGeolocation.start();
//                     this._interval = setInterval(() => {
//                         this.setState({ runningDuration: this.state.runningDuration + 1 })
//                     }, 1000);
//                     break;
//                 case 'paused':
//                     runState = { ...this.state.runState, state: 'paused', pauseAt: new Date() };
//                     clearInterval(this._interval);
//                     BackgroundGeolocation.stopWatchPosition();
//                     break;
//                 // case 'resume':
//                 //     runState = { ...this.state.runState, state: 'running' };
//                 //     BackgroundGeolocation.watchPosition();
//                 //     this._interval = setInterval(() => {
//                 //         this.setState({ runningDuration: this.state.runningDuration + 1 })
//                 //     }, 1000);
//                 //     break;
//                 case 'finished':
//                     runState = { ...this.state.runState, state: 'finished', finishAt: new Date() };
//                     clearInterval(this._interval);
//                     BackgroundGeolocation.stop();
//                     break;
//             }
//             await AsyncStorage.setItem(`@runx:runstate`, JSON.stringify(runState, null));

//             this.setState({ runState })
//         }
//     }

//     handleRunReset = async () => {
//       let oldRecord = await AsyncStorage.getItem(`@runx:history`)
//       let setoldrecord = JSON.parse(oldRecord) !== null ? JSON.parse(oldRecord) : []
//       // console.log(setoldrecord)
//       let newRecord = [
//         ...setoldrecord,
//         {
//           distance: this.state.distanceTravelled,
//           startTime: this.state.runState.runAt,
//           duration: this.state.runningDuration
//         }
//       ]

//       // console.log(newRecord)
//         await AsyncStorage.setItem(`@runx:history`, JSON.stringify(newRecord))
//         await AsyncStorage.removeItem(`@runx:runstate`, null);

//         this.setState({
//             isLoading: true,
//             runState: {},
//             runningDuration: 0,
//             distanceTravelled: 0,
//             markers: [],
//             coordinates: []
//         }, () => {
//             this.getCurrentLocation(true)
//         })
//     }

//     resetGeoLocation = async () => {
//         // await BackgroundGeolocation.setOdometer(0);
//         await BackgroundGeolocation.deleteAllLocations();
//         this.setState({ isLoading: false })
//     }

//     renderActions = () => {
//         const { isLoading, runState, runningDuration, distanceTravelled } = this.state;
//         console.log(this.state)
//         if (!isLoading) {
//           console.log(3)

//             const report = () => {
//                 const duration = new Date(runningDuration * 1000).toISOString().substr(11, 8);
//                 const distance = parseFloat(distanceTravelled).toFixed(1);
//                 return (
//                     <View style={styles.groupButtons}>
//                         <View>
//                             <Text style={styles.lable}>Duration</Text>
//                             <Text style={styles.duration}>{duration}</Text>
//                         </View>
//                         <View style={styles.borderMiddle}></View>
//                         <View>
//                             <Text style={styles.lable}>Distance</Text>
//                             <Text style={styles.duration}>{distance}km</Text>
//                         </View>
//                     </View>
//                 )
//             }
//             if (runState.state === "running" || runState.state == "paused") {
//           console.log(43)

//                 return (
//                     <View style={styles.runningContainer}>
//                         <Text style={styles.stateText}>{runState.state === 'paused' ? 'PAUSE' : 'RUNNING'}</Text>
//                         {report()}
//                         <View style={styles.groupButtons}>
//                             {/* <TouchableOpacity
//                                 onPress={() => this.handleRunStateChange(runState.state === 'paused' ? 'resume' : 'paused')}
//                                 style={[styles.circleButton, styles.pauseButton]}>
//                                 <Text style={{ fontSize: 15, color: '#ffffff' }}>
//                                     {runState.state === 'paused' ? 'RESUME' : 'PAUSE'}
//                                 </Text>
//                             </TouchableOpacity> */}
//                             <TouchableOpacity
//                                 onPress={() => this.handleRunStateChange('finished')}
//                                 style={[styles.circleButton, styles.finishButton]}>
//                                 <Text style={{ fontSize: 15, color: '#ffffff' }}>FINISH</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 )
//             } else if (runState.state == "finished") {
//               console.log(2)

//                 return (
//                     <View style={styles.runningContainer}>
//                         <Text style={styles.stateText}>FINISHED</Text>
//                         {report()}
//                         <View style={styles.groupButtons}>
//                             <Button
//                                 onPress={() => this.handleRunReset()}
//                                 style={styles.shareButton}>
//                                 <Text style={{ fontSize: 15, color: '#ffffff' }}>BACK</Text>
//                             </Button>
//                         </View>
//                     </View>
//                 )
//             } else {
//               console.log(1)
//                 return (
//                     <Button
//                         rounded
//                         style={styles.startButton}
//                         onPress={() => { this.handleRunStateChange('running') }}>
//                         <Text>BEGIN RUN</Text>
//                     </Button>
//                 )
//             }
//         } else {
//             return null
//         }
//     }

//     renderMap = () => {
//         const { showsUserLocation, markers } = this.state;
//         return (
//             <MapView
//                 ref="map"
//                 provider={PROVIDER_GOOGLE}
//                 style={styles.map}
//                 showsUserLocation={true}
//                 followsUserLocation={true}
//                 scrollEnabled={true}
//                 showsMyLocationButton={true}
//                 showsPointsOfInterest={false}
//                 showsScale={false}
//                 showsTraffic={false}
//                 toolbarEnabled={false}>
//                 <MapView.Polyline
//                     key="polyline"
//                     coordinates={this.state.coordinates}
//                     geodesic={true}
//                     strokeColor='rgba(232, 67, 147, 1)'
//                     strokeWidth={6}
//                     zIndex={0}
//                 />
//                 {
//                     markers.length > 0 &&
//                     <MapView.Marker
//                         key={markers[0].key}
//                         coordinate={markers[0].coordinate}
//                         // title={markers[0].title}
//                         >
//                     </MapView.Marker>
//                 }
//             </MapView>
//         )
//     }

//     render() {
//         const { isLoading } = this.state;

//         return (
//             <View style={styles.container}>
//                 {this.renderMap()}
//                 {this.renderActions()}
//                 {/* <Spinner visible={isLoading} /> */}
//             </View>
//         );
//     }
// }