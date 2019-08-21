import React, { Component } from "react";
import {AppRegistry, View , StyleSheet, ImageBackground,Image, Dimensions , Alert,TouchableOpacity, Text } from "react-native";

import {accelerometer} from "react-native-sensors";
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import io from 'socket.io-client/dist/socket.io';//'socket.io-client';
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Orientation from 'react-native-orientation';
import { thisTypeAnnotation } from "@babel/types";
//import { TouchableOpacity } from "react-native-gesture-handler";

const responsiveWidth = Dimensions.get('screen').width;
const responsiveHeight = Dimensions.get('screen').height;


export default class App extends Component {
  constructor(){
    super();
    this.state = { 
      data_in: "",
      rec:[],
      data: {x: 0,
            y: 0,
            z: 0,
          },     
      number:0,
    };
    this.timer = null;
    this.btnX = this.btnX.bind(this);
    this.btnR = this.btnR.bind(this);
    this.btnUp = this.btnUp.bind(this);
    this.btnLeft = this.btnLeft.bind(this);
    this.btnRight = this.btnRight.bind(this);
    this.btnDown = this.btnDown.bind(this);
    this.btnLeftShift = this.btnLeftShift.bind(this);
    this.btnRightShift = this.btnRightShift.bind(this);
    this.btnSpace = this.btnSpace.bind(this);
    this.btnLeftCtrl = this.btnLeftCtrl.bind(this);
    this.btnRightCtrl = this.btnRightCtrl.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
 }
 

   async componentDidMount() {
    Orientation.lockToLandscape();
    const ip = String(await AsyncStorage.getItem('@storage_Key'));
    var ipaddr = 'http://'+ ip + ':8000';
    this.setState({data_in : ipaddr});
    this.socket = io(this.state.data_in);

    this.socket.on("send",msg=>{
      this.setState({rec:[...this.state.rec , msg]});
    });

    setUpdateIntervalForType(SensorTypes.accelerometer, 50);
    accelerometer.subscribe(({ x, y, z }) => {
      this.setState({data : {x,y,z}})
    })
    accelerometer.subscribe(item => {
      var vertical = '';
      var horizontal = '';
      var msg = [];
      if(item.y < -2 && item.x > 2){
        vertical = 'w';//'ver is w'; 57
        msg = 'left';//87;up
        this.socket.emit("chat message" ,msg);
        msg = 'down';//87;up
        this.socket.emit("chat message" ,msg);
      }
      if(item.y > 2 && item.x < -2){
        vertical = 's';//'ver is s'; 62
        // msg = ['right', 'up'];//83;down
        // this.socket.emit("chat message" ,msg);
        msg = 'right';//87;up
        this.socket.emit("chat message" ,msg);
        msg = 'up';//87;up
        this.socket.emit("chat message" ,msg);
      }
      if(item.y > 2 && item.x > 2){
        horizontal = 'a';//'hor is a'; 61
        // msg = ['down','right'];//65;left
        // this.socket.emit("chat message" ,msg);
        msg = 'right';//87;up
        this.socket.emit("chat message" ,msg);
        msg = 'down';//87;up
        this.socket.emit("chat message" ,msg);
      }
      if(item.y < -2 && item.x < -2){
        horizontal = 'd';//'hor is a'; 63
        // msg = ['up','left'];//68;right
        // this.socket.emit("chat message" ,msg);
        msg = 'left';//87;up
        this.socket.emit("chat message" ,msg);
        msg = 'up';//87;up
        this.socket.emit("chat message" ,msg);
      }
      if(item.y < -2){
        msg = 'left';//87;up
        this.socket.emit("chat message" ,msg);
      }
      if(item.y > 2){
        msg = 'right';//87;up
        this.socket.emit("chat message" ,msg);
      }
      if(item.x < -2){
        msg = 'up';//87;up
        this.socket.emit("chat message" ,msg);
      }
      if(item.x > 2){
        msg = 'down';//87;up
        this.socket.emit("chat message" ,msg);
      }
      // if(item.y < -0.2){
      //   msg = 'left';//87;up
      //   this.socket.emit("chat message" ,msg);
      // }
      // if(item.y > 0.2){
      //   msg = 'right';//87;up
      //   this.socket.emit("chat message" ,msg);
      // }
      // if(item.x < -0.2){
      //   msg = 'up';//87;up
      //   this.socket.emit("chat message" ,msg);
      // }
      // if(item.x > 0.2){
      //   msg = 'down';//87;up
      //   this.socket.emit("chat message" ,msg);
      // }
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
  stopTimer() {
    clearTimeout(this.timer);
  }
  btnX=()=>{
    this.socket.emit("chat message" ,['x']);//88
    this.timer = setTimeout(this.btnX, 100);
  }
  btnR=()=>{                         
    this.socket.emit("mouse location" ,['r']);//82
    //this.setState({number: this.state.number+1});
    this.timer = setTimeout(this.btnR, 100);
  }
  btnUp=()=>{
    this.socket.emit("chat message" ,['up']);
    this.timer = setTimeout(this.btnUp, 100);
  }
  btnDown=()=>{
    this.socket.emit("chat message" ,['down']);
    this.timer = setTimeout(this.btnDown, 100);
  }
  btnLeft=()=>{ 
    this.socket.emit("chat message" ,['left']);
    this.timer = setTimeout(this.btnLeft, 100);
  }
  btnRight=()=>{
    this.socket.emit("chat message" ,['right']);
    this.timer = setTimeout(this.btnRight, 100);
  }
  btnSpace=()=>{
    this.socket.emit("chat message" ,['space']);//32
    this.timer = setTimeout(this.btnSpace, 100);
  }
  btnLeftShift=()=>{
    this.socket.emit("chat message" ,['LSHIFT']);//160
    this.timer = setTimeout(this.btnLeftShift, 100);
  }
  btnRightShift=()=>{
    this.socket.emit("chat message" ,['RSHIFT']);//161
    this.timer = setTimeout(this.btnRightShift, 100);
  }
  btnLeftCtrl=()=>{
    this.socket.emit("chat message" ,['LCTRL']);//162
    this.timer = setTimeout(this.btnLeftCtrl, 100);
  }
  btnRightCtrl=()=>{
    this.socket.emit("chat message" ,['RCTRL']);//163
    this.timer = setTimeout(this.btnRightCtrl, 100);
  }
  //<Text>{this.state.data_in }</Text>
  /***
   * <View style={styles.consts1}>
          <Text>{this.state.data_in}</Text>
          <Text style={styles.txt}>X : {this.state.data.x}</Text>
          <Text style={styles.txt}>Y : {this.state.data.y}</Text>
          <Text style={styles.txt}>Z : {this.state.data.z}</Text>
        </View>
   * <Button  title="BACK"  onPress={ this.backtoPrevScreen}/>
          <Button  title = "ENTER" onPress={this.enter}/>       
          <Button style={styles.btnSpace} title = "SPACE" onPress={this.space}/>


          <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}}>
                <Text style={{backgroundColor:"white"}}>{this.state.rec}</Text>
              </TouchableOpacity>
   */
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };
  
  render() {  
    return (    
      <View style = {{flex : 1,flexDirection:"row",backgroundColor:"transparent"}}>
        <ImageBackground source={require("./image/car4.jpeg")} style={{flex:1,width:null,height:null}}>
        <View style={styles.cont2}>
          <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
            <View style={{flex:1,marginHorizontal:30,marginTop:50,justifyContent:"center",alignItems:"flex-start"}}>
              <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}} 
              onPressIn={this.btnX} onPressOut={this.stopTimer}>
                <Image source={require("./image/x.png")} style={{height:70,width:70,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
            </View>
            <View style={{flex:1,marginHorizontal:30,marginTop:50,justifyContent:"center",alignItems:"flex-end"}}>
            <TouchableOpacity 
              style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}} 
              onPressIn={this.btnR} onPressOut={this.stopTimer}>
                <Image source={require("./image/r.png")} style={{height:70,width:70,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex:1,flexDirection:"column",alignItems:'center',justifyContent:"flex-end"}}>
            <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}}
            onPressIn={this.btnUp} onPressOut={this.stopTimer}>
              <Image source={require("./image/up.png")} style={{height:70,width:70,resizeMode:"contain"}}></Image>
            </TouchableOpacity>
          </View>
          
          <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
              <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}}
              onPressIn={this.btnLeft} onPressOut={this.stopTimer}>
                <Image source={require("./image/left.png")} style={{height:70,width:70,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}} 
              onPressIn={this.btnDown} onPressOut={this.stopTimer}>
                <Image source={require("./image/down.png")} style={{height:70,width:70,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}} 
              onPressIn={this.btnRight} onPressOut={this.stopTimer}>
                <Image source={require("./image/right.png")} style={{height:70,width:70,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
          </View>

          <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
            <View style={{flex:1,marginHorizontal:30,marginTop:50,justifyContent:"center",alignItems:"flex-start"}}>
              <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}} 
              onPressIn={this.btnLeftShift} onPressOut={this.stopTimer}>
                <Image source={require("./image/shift.png")} style={{height:100,width:150,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
            </View>
            <View style={{flex:1,marginHorizontal:30,marginTop:50,justifyContent:"center",alignItems:"flex-end"}}>
            <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}} 
            onPressIn={this.btnRightShift} onPressOut={this.stopTimer}>
                <Image source={require("./image/shift.png")} style={{height:100,width:150,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex:2,flexDirection:"row"}}>
            <View style={{flex:1,justifyContent:"center"}}>
              <TouchableOpacity style={{borderRadius:15,marginHorizontal:30}} 
              onPressIn={this.btnLeftCtrl} onPressOut={this.stopTimer}>
                <Image source={require("./image/ctrl.png")} style={{height:70,width:70,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
            </View>
            <View style={{flex:3,justifyContent:"center"}}>
              <TouchableOpacity style={{justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5,alignContent:"center"}} 
              onPressIn={this.btnSpace} onPressOut={this.stopTimer}>
                <Image source={require("./image/space.png")} style={{height:80,width:420,resizeMode:"contain"}}></Image>
              </TouchableOpacity>
            </View>
            <View style={{flex:1,justifyContent:"center"}}>
              <TouchableOpacity style={{borderRadius:15,marginHorizontal:30}}>
                <Image source={require("./image/ctrl.png")} style={{height:70,width:70,resizeMode:"contain"}} 
                onPressIn={this.btnRightCtrl} onPressOut={this.stopTimer}></Image>
              </TouchableOpacity>
            </View>  
          </View>
        </View>
      
      </ImageBackground>
      </View>
    );
  }


static navigationOptions = ({ navigation }) => {
  return {
      title: 'cotroller',
      headerStyle: {
        
        backgroundColor: '#16A085',
        barStyle: "light-content", // or directly
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <View style={{
          flexDirection: "row-reverse",
          }}>
          <Menu
              ref={(ref) => this._menu = ref}
              button={<TouchableOpacity onPress={() => this._menu.show()} 
                style={{paddingHorizontal:16, height: '100%', alignItems:'center', 
                justifyContent: 'center'}}>
                  <Icon name={'ios-menu'} size={25} color={'white'} 
                  style={{alignSelf:'center'}} resizeMode='contain'/></TouchableOpacity>}
          >
              <MenuItem onPress={() => {
                this._menu.hide()
                }} textStyle={{fontSize: 16}} disabled>Controller</MenuItem>
              <MenuItem onPress={() => {
                this._menu.hide()
                navigation.navigate('Home')
                }} textStyle={{color: '#000', fontSize: 16}}>startPage</MenuItem>
              <MenuItem  onPress={() =>{
                this._menu.hide()
                navigation.navigate('mouse')
                }} textStyle={{color: '#000',fontSize: 16}}>Mouse</MenuItem>
              
          </Menu>
        </View>
      ),
    }
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