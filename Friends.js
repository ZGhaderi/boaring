import React, { Component } from "react";
import {AppRegistry, View , Text ,StyleSheet, color,Button, Dimensions , Alert } from "react-native";
import {accelerometer} from "react-native-sensors";
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import io from 'socket.io-client/dist/socket.io';//'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import Orientation from 'react-native-orientation';

const responsiveWidth = Dimensions.get('screen').width;
const responsiveHeight = Dimensions.get('screen').height;


export default class App extends Component {
  constructor(){
    super();
    this.state= {
      data_in: "",
      data: {x: 0,
            y: 0,
            z: 0,
          },     
      }
      
  }
   async componentDidMount() {
    Orientation.lockToLandscape();
    const ip = String(await AsyncStorage.getItem('@storage_Key'));
    var ipaddr = 'http://'+ ip + ':3000';
    this.setState({data_in : ipaddr});
    this.socket = io(this.state.data_in);

    setUpdateIntervalForType(SensorTypes.accelerometer, 120);
    accelerometer.subscribe(({ x, y, z }) => {
      this.setState({data : {x,y,z}})
    })
    accelerometer.subscribe(item => {
      var vertical = '';
      var horizontal = '';
      var msg ;
      if(item.y < -0.2){
        vertical = 'w';//'ver is w';
        msg = 'w';//87;
        this.socket.emit("chat message" ,msg);
      }
      if(item.y > 0.2){
        vertical = 's';//'ver is s';
        msg = 's';//83;
        this.socket.emit("chat message" ,msg);
      }
      if(item.x > 0.2){
        horizontal = 'a';//'hor is a';
        msg = 'a';//65;
        this.socket.emit("chat message" ,msg);
      }
      if(item.x < -0.2){
        horizontal = 'd';//'hor is a';
        msg = 'd';//68;
        this.socket.emit("chat message" ,msg);
      }
      
    });
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backtoPrevScreen);  
    Orientation.addOrientationListener(this._orientationDidChange);
  }
 
  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      // do something with landscape layout
    } else {
      // do something with portrait layout
    }
  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
 
 
    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  // componentWillUnmount() {
  //   this.backHandler
  // }

  backtoPrevScreen=()=>{
    this.socket.emit("chat message" ,"close");
    this.props.navigation.navigate('Home');
    return true;
  }

  enter=()=>{
    this.socket.emit("chat message" ,'47');
    alert("enter pressed");
  }
  space=()=>{
    this.socket.emit("chat message" ,'5E');
  }
  //<Text>{this.state.data_in }</Text>
  render() {  
    return (
      <View style={styles.cont}>
        <Text>{this.state.data_in}</Text>
        <Text style={styles.txt}>X : {this.state.data.x}</Text>
        <Text style={styles.txt}>Y : {this.state.data.y}</Text>
        <Text style={styles.txt}>Z : {this.state.data.z}</Text>
        <Button  title="BACK"  onPress={ this.backtoPrevScreen}/>
        <Button style={styles.btnEnter} title = "ENTER" onpress={this.enter}/>
        <Button style={styles.btnSpace} title = "SPACE" onpress={this.enter}/>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  cont:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#65365a',//'#F5FCFF',
  },
  input: {
    height: 40,
    borderWidth: 2,
    //padding: 40
  },
  txt:{
    marginHorizontal: 20,
    fontSize: 20,
    color: '#c3cfef',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  btnEnter:{
    backgroundColor: '#65365a',//'#F7F9F9',
    color: '#060100',
    //width: 0.5,
    borderRadius: 8,
  },
  btnSpace:{
    backgroundColor: '#F7F9F9',
    borderColor: '#17A589',
    borderWidth: 1,
    borderRadius: 12,
    color: '#17A589',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  }
})

AppRegistry.registerComponent('App',()=> App)