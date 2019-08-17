import React, { Component } from "react";
import {AppRegistry, View , Text ,StyleSheet, ImageBackground,Image, Dimensions , Alert,TouchableOpacity } from "react-native";
import {accelerometer} from "react-native-sensors";
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import io from 'socket.io-client/dist/socket.io';//'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import Orientation from 'react-native-orientation';
//import { TouchableOpacity } from "react-native-gesture-handler";

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
    var ipaddr = 'http://'+ ip + ':7000';
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
        vertical = 'w';//'ver is w'; 57
        msg = 'up';//87;
        this.socket.emit("chat message" ,msg);
      }
      if(item.y > 0.2){
        vertical = 's';//'ver is s'; 62
        msg = 'down';//83;
        this.socket.emit("chat message" ,msg);
      }
      if(item.x > 0.2){
        horizontal = 'a';//'hor is a'; 61
        msg = 'left';//65;
        this.socket.emit("chat message" ,msg);
      }
      if(item.x < -0.2){
        horizontal = 'd';//'hor is a'; 63
        msg = 'right';//68;
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
    this.socket.emit("chat message" ,'enter');//47
    //alert("enter pressed");
  }
  space=()=>{
    this.socket.emit("chat message" ,'space');//5E
  }

  btnx=()=>{
    this.socket.emit("chat message" ,'x');
  }
  //<Text>{this.state.data_in }</Text>
  /***
   * <View style={styles.cont1}>
          <Text>{this.state.data_in}</Text>
          <Text style={styles.txt}>X : {this.state.data.x}</Text>
          <Text style={styles.txt}>Y : {this.state.data.y}</Text>
          <Text style={styles.txt}>Z : {this.state.data.z}</Text>
        </View>
   * <Button  title="BACK"  onPress={ this.backtoPrevScreen}/>
          <Button  title = "ENTER" onPress={this.enter}/>       
          <Button style={styles.btnSpace} title = "SPACE" onPress={this.space}/>
   */
  render() {  
    return (
      
      
      <View style = {{flex : 1,flexDirection:"row",backgroundColor:"transparent"}}>
        <ImageBackground source={require("./image/car3.jpg")} style={{flex:1,width:null,height:null}}>
        <View style={styles.cont2}>
          <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
            <View style={{flex:1,marginHorizontal:30,marginTop:50,justifyContent:"center",alignItems:"flex-start"}}>
              <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}}>
                <Image source={require("./image/x.png")} style={{height:70,width:70,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
            </View>
            <View style={{flex:1,marginHorizontal:30,marginTop:50,justifyContent:"center",alignItems:"flex-end"}}>
            <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}}>
                <Image source={require("./image/r.png")} style={{height:70,width:70,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex:1,flexDirection:"column",alignItems:'center',justifyContent:"flex-end"}}>
            <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}}>
              <Image source={require("./image/up.png")} style={{height:70,width:70,resizeMode:"contain"}}></Image>
            </TouchableOpacity>
          </View>
          
          <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
              <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}}>
                <Image source={require("./image/left.png")} style={{height:70,width:70,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}}>
                <Image source={require("./image/down.png")} style={{height:70,width:70,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}}>
                <Image source={require("./image/right.png")} style={{height:70,width:70,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
          </View>

          <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
            <View style={{flex:1,marginHorizontal:30,marginTop:50,justifyContent:"center",alignItems:"flex-start"}}>
              <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}}>
                <Image source={require("./image/shift.png")} style={{height:100,width:150,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
            </View>
            <View style={{flex:1,marginHorizontal:30,marginTop:50,justifyContent:"center",alignItems:"flex-end"}}>
            <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}}>
                <Image source={require("./image/shift.png")} style={{height:100,width:150,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex:2,flexDirection:"row"}}>
            <View style={{flex:1,justifyContent:"center"}}>
              <TouchableOpacity style={{borderRadius:15,marginHorizontal:30}}>
                <Image source={require("./image/ctrl.png")} style={{height:70,width:70,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
            </View>
            <View style={{flex:3,justifyContent:"center"}}>
              <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5,alignContent:"center"}}>
                <Image source={require("./image/space.png")} style={{height:80,width:420,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
            </View>
            <View style={{flex:1,justifyContent:"center"}}>
              <TouchableOpacity style={{borderRadius:15,marginHorizontal:30}}>
                <Image source={require("./image/ctrl.png")} style={{height:70,width:70,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
            </View>  
          </View>
        </View>
      
      </ImageBackground>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  cont1:{
    flex: 1,
   // backgroundColor: '#F5FCFF',//'#F5FCFF',
  },
  cont2:{
    flex: 2,
  //backgroundColor: '#F5FCFF',//'#F5FCFF',
  },
  input: {
    height: 40,
    borderWidth: 2,
    //padding: 40
  },
  txt:{
    marginHorizontal: 20,
    fontSize: 15,
    //color: '#c3cfef',
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