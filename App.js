// // // import React, { Component } from "react";
// // // import {AppRegistry, View , Text ,StyleSheet, TextInput, Dimensions } from "react-native";
// // // import {accelerometer} from "react-native-sensors";
// // // import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
// // // import io from 'socket.io-client/dist/socket.io';//'socket.io-client';

// // // const responsiveWidth = Dimensions.get('screen').width;
// // // const responsiveHeight = Dimensions.get('screen').height;


// // // export default class App extends Component {
// // //   constructor(){
// // //     super();
// // //     this.state= {
// // //       data: {x: 0,
// // //             y: 0,
// // //             z: 0,
// // //           },     
// // //       }
// // //   }
// // //   componentDidMount() {
    
// // //     this.socket = io("http://192.168.1.3:5000");
// // //     setUpdateIntervalForType(SensorTypes.accelerometer, 120);
// // //     accelerometer.subscribe(({ x, y, z }) => {
// // //       this.setState({data : {x,y,z}})
// // //     })
// // //     accelerometer.subscribe(item => {
// // //       var vertical = '';
// // //       var horizontal = '';
// // //       var msg = '';
// // //       if(item.y < -0.2){
// // //         vertical = 'w';//'ver is w';
// // //         msg = 'w';
// // //         this.socket.emit("chat message" ,msg);
// // //       }
// // //       if(item.y > 0.2){
// // //         vertical = 's';//'ver is s';
// // //         msg = 's';
// // //         this.socket.emit("chat message" ,msg);
// // //       }
// // //       if(item.x > 0.2){
// // //         horizontal = 'a';//'hor is a';
// // //         msg = 'a';
// // //         this.socket.emit("chat message" ,msg);
// // //       }
// // //       if(item.x < -0.2){
// // //         horizontal = 'd';//'hor is a';
// // //         msg = 'd';
// // //         this.socket.emit("chat message" ,msg);
// // //       }
      
// // //     });  
// // //   }
// // //   render() {  
// // //     return (
// // //       <View style={styles.cont}>
        
// // //         <Text style={styles.txt}>X : {this.state.data.x}</Text>
// // //         <Text style={styles.txt}>Y : {this.state.data.y}</Text>
// // //         <Text style={styles.txt}>Z : {this.state.data.z}</Text>
        
// // //       </View>
// // //     );
// // //   }
// // // }
// // // const styles=StyleSheet.create({
// // //   cont:{
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     backgroundColor: '#F5FCFF',
// // //   },
// // //   input: {
// // //     height: 40,
// // //     borderWidth: 2,
// // //     //padding: 40
// // //   },
// // //   txt:{
// // //     marginHorizontal: 20,
// // //     fontSize: 20
// // //   },
// // //   container: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     backgroundColor: '#F5FCFF',
// // //   },
// // //   welcome: {
// // //     fontSize: 20,
// // //     textAlign: 'center',
// // //     margin: 10,
// // //   },
// // //   instructions: {
// // //     textAlign: 'center',
// // //     color: '#333333',
// // //     marginBottom: 5,
// // //   },
// // // })

// // // AppRegistry.registerComponent('App',()=> App)
// // import React, { Component } from 'react';
// // import {
// //   Platform,
// //   StyleSheet,
// //   Text,
// //   View
// // } from 'react-native';
// // import { createStackNavigator, } from 'react-navigation';

// // import first from './screen/first';
// // import second from './screen/second';

// // const AppNavigator = createStackNavigator({
// //   firstScreen: { screen: first },
// //   secondScreen: { screen: second }
// // });

// import React from 'react';
// import AppNavigator from './AppNavigator';
// //import{AppRegistry,StyleSheet,View} from "react-native";

// export default class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       possibleFriends: [
//         'Allie',
//         'Gator',
//         'Lizzie',
//       ],
//       currentFriends: [],
//     }
//   }

//   addFriend = (index) => {
//     const {
//       currentFriends,
//       possibleFriends,
//     } = this.state

//     // Pull friend out of possibleFriends
//     const addedFriend = possibleFriends.splice(index, 1)

//     // And put friend in currentFriends
//     currentFriends.push(addedFriend)

//     // Finally, update our app state
//     this.setState({
//       currentFriends,
//       possibleFriends,
//     })
//   }

//   render() {
//     return (
//       <AppNavigator
//         screenProps={ {
//           currentFriends: this.state.currentFriends,
//           possibleFriends: this.state.possibleFriends,
//           addFriend: this.addFriend,
//         } }
//       />
//     );
//   }
// }
import React from 'react';
import AppNavigator from './AppNavigator';

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}