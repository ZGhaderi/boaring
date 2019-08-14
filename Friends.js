import React, { Component } from "react";
import {AppRegistry, View , Text ,StyleSheet, Button, Dimensions } from "react-native";
import {accelerometer} from "react-native-sensors";
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import io from 'socket.io-client/dist/socket.io';//'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';

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
  }
  backtoPrevScreen=()=>{
    this.socket.emit("chat message" ,"close");
    this.props.navigation.navigate('Home');
  }
  //<Text>{this.state.data_in }</Text>
  render() {  
    return (
      <View style={styles.cont}>
        <Text>{this.state.data_in}</Text>
        <Text style={styles.txt}>X : {this.state.data.x}</Text>
        <Text style={styles.txt}>Y : {this.state.data.y}</Text>
        <Text style={styles.txt}>Z : {this.state.data.z}</Text>
        <Button 
        title="BACK"
          onPress={ this.backtoPrevScreen}/>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  cont:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 40,
    borderWidth: 2,
    //padding: 40
  },
  txt:{
    marginHorizontal: 20,
    fontSize: 20
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
})

AppRegistry.registerComponent('App',()=> App)