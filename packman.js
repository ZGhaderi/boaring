import React, { Component } from "react";
import {AppRegistry, BackHandler, View , StyleSheet, ImageBackground,Image, Dimensions , Alert,TouchableOpacity, Text } from "react-native";

import {accelerometer} from "react-native-sensors";
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import io from 'socket.io-client/dist/socket.io';//'socket.io-client';
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Orientation from 'react-native-orientation';
//import { thisTypeAnnotation } from "@babel/types";

const responsiveWidth = Dimensions.get('screen').width;
const responsiveHeight = Dimensions.get('screen').height;


export default class App extends Component {
  constructor(){
    super();
    this.state = { 
      data_in: "",
      rec:[],
      element:"",
      
      data: {x: 0,
            y: 0,
            z: 0,
          },     
      number:0,
    };
    this.timer = null;
    
    this.btnP = this.btnP.bind(this);
    this.btnUp = this.btnUp.bind(this);
    this.btnLeft = this.btnLeft.bind(this);
    this.btnRight = this.btnRight.bind(this);
    this.btnDown = this.btnDown.bind(this);
    
    this.stopTimer = this.stopTimer.bind(this);
 }
 

   async componentDidMount() {
    Orientation.lockToLandscape();
    const ip = String(await AsyncStorage.getItem('@storage_Key'));
    var ipaddr = 'http://'+ ip + ':8000';
    this.setState({data_in : ipaddr});
    //this.socket = io("http://192.168.43.136:8000");
    this.socket = io(this.state.data_in);
    var flag ;//= true;
    //this.setState({element : String(await AsyncStorage.getItem('element'))});
    if(String(await AsyncStorage.getItem('arrowKey')) == "true" && String(await AsyncStorage.getItem('accelerometer')) == "false"){
      this.socket.emit("here" ,"set flag to false");
      flag = false;
    }
    else if(String(await AsyncStorage.getItem('accelerometer')) == "true" && String(await AsyncStorage.getItem('arrowKey')) == "false"){
      this.socket.emit("here" ,"set flag to true");
      flag = true;
    }
    
   // this.socket.emit("rec" ,"common");
    // if(this.state.element == 'accelerometer'){
    //   this.socket.emit("rec" ,"accelerometer");
    // }
    // if(this.state.element == 'arrowKey'){
    //   this.socket.emit("rec" ,"arrowkey");
    // }
    // this.socket.on("send",msg=>{
    //   this.setState({rec:[...this.state.rec , msg]});
    // });
    
    setUpdateIntervalForType(SensorTypes.accelerometer, 50);
    accelerometer.subscribe(({ x, y, z }) => {
      this.setState({data : {x,y,z}})
    })
  
    accelerometer.subscribe(item => {
      var vertical = '';
      var horizontal = '';
      var msg = [];

      this.socket.emit("rec",flag);
      if(flag){
        var pos = "";
      if(item.y < -2 && item.x > 2 ){//&& this.state.element === 'accelerometer'){
        vertical = 'w';//'ver is w'; 57
        msg = 'left';//87;up
        this.socket.emit("chat message" ,msg);
        msg = 'down';//87;up
        this.socket.emit("chat message" ,msg);
        
        pos = item.x.toFixed(2) + " " + item.y.toFixed(2);
        this.socket.emit("position" ,pos);
      }
      if(item.y > 2 && item.x < -2 ){//&& this.state.element === 'accelerometer'){
        vertical = 's';//'ver is s'; 62
        // msg = ['right', 'up'];//83;down
        // this.socket.emit("chat message" ,msg);
        msg = 'right';//87;up
        this.socket.emit("chat message" ,msg);
        msg = 'up';//87;up
        this.socket.emit("chat message" ,msg);
        
        pos = item.x.toFixed(2) + " " + item.y.toFixed(2);
        this.socket.emit("position" ,pos);
      }
      if(item.y > 2 && item.x > 2 ){//&& this.state.element === 'accelerometer'){
        horizontal = 'a';//'hor is a'; 61
        // msg = ['down','right'];//65;left
        // this.socket.emit("chat message" ,msg);
        msg = 'right';//87;up
        this.socket.emit("chat message" ,msg);
        msg = 'down';//87;up
        this.socket.emit("chat message" ,msg);
        
        pos = item.x.toFixed(2) + " " + item.y.toFixed(2);
        this.socket.emit("position" ,pos);
      }
      if(item.y < -2 && item.x < -2 ){//&& this.state.element === 'accelerometer'){
        horizontal = 'd';//'hor is a'; 63
        // msg = ['up','left'];//68;right
        // this.socket.emit("chat message" ,msg);
        msg = 'left';//87;up
        this.socket.emit("chat message" ,msg);
        msg = 'up';//87;up
        this.socket.emit("chat message" ,msg);
        
        pos = item.x.toFixed(2) + " " + item.y.toFixed(2);
        this.socket.emit("position" ,pos);
      }
      if(item.y < -2 ){//&& this.state.element === 'accelerometer'){
        msg = 'left';//87;up
        this.socket.emit("chat message" ,msg);
        
        pos = item.x.toFixed(2) + " " + item.y.toFixed(2);
        this.socket.emit("position" ,pos);
      }
      if(item.y > 2 ){//&& this.state.element === 'accelerometer'){
        msg = 'right';//87;up
        this.socket.emit("chat message" ,msg);
        
        pos = item.x.toFixed(2) + " " + item.y.toFixed(2);
        this.socket.emit("position" ,pos);
      }
      if(item.x < -2 ){//&& this.state.element === 'accelerometer'){
        msg = 'up';//87;up
        this.socket.emit("chat message" ,msg);
        
        pos = item.x.toFixed(2) + " " + item.y.toFixed(2);
        this.socket.emit("position" ,pos);
        //this.socket.emit("rec" ,this.state.element);
      }
      if(item.x > 2){// && this.state.element === 'accelerometer'){
        msg = 'down';//87;up
        this.socket.emit("chat message" ,msg);
        
        pos = item.x.toFixed(2) + " " + item.y.toFixed(2);
        this.socket.emit("position" ,pos);
       // this.socket.emit("rec" ,element);
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
    }
  });
  // }

    
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
    this.backHandler.remove();
    this.socket.emit("chat message" ,"close");
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
    //alert("back");
    this.socket.emit("chat message" ,"close");
    this.props.navigation.navigate('Home');
    return true;
  }
  stopTimer() {
    clearTimeout(this.timer);
  }

  btnP=()=>{                         
    this.socket.emit("chat message" ,'p');//82
    //this.setState({number: this.state.number+1});
    //this.timer = setTimeout(this.btnR, 100);
  }
  btnQ=()=>{                         
    this.socket.emit("chat message" ,'q');//82
    //this.setState({number: this.state.number+1});
    //this.timer = setTimeout(this.btnR, 100);
  }
  btnM=()=>{                         
    this.socket.emit("chat message" ,'m');//82
    //this.setState({number: this.state.number+1});
    //this.timer = setTimeout(this.btnR, 100);
  }
  btnL=()=>{                         
    this.socket.emit("chat message" ,'l');//82
    //this.setState({number: this.state.number+1});
    //this.timer = setTimeout(this.btnR, 100);
  }
  btnUp=()=>{
    this.socket.emit("chat message" ,'up');
    this.timer = setTimeout(this.btnUp, 100);
  }
  btnDown=()=>{
    this.socket.emit("chat message" ,'down');
    this.timer = setTimeout(this.btnDown, 100);
  }
  btnLeft=()=>{ 
    this.socket.emit("chat message" ,'left');
    this.timer = setTimeout(this.btnLeft, 100);
  }
  btnRight=()=>{
    this.socket.emit("chat message" ,'right');
    this.timer = setTimeout(this.btnRight, 100);
  }

  _menu = null;

  SsetMenuRef = ref => {
    this._menu = ref;
  };
  //        <ImageBackground source={require("./image/car4.jpeg")} style={{flex:1,width:null,height:null}}>

  render() {  
    return (    
      <View style = {styles.mainContainer} >
        <View style={styles.cont2}>
          <View style={styles.btnUPview}>
          
            <TouchableOpacity style={styles.btnUPtouch}
            onPressIn={this.btnUp} onPressOut={this.stopTimer}>
              <Image source={require("./image/up.png")} style={styles.btnUPimage}></Image>
            </TouchableOpacity>
          </View>
          
          <View style={styles.arrowView}>
              <TouchableOpacity style={styles.btnLEFTtouch}
              onPressIn={this.btnLeft} onPressOut={this.stopTimer}>
                <Image source={require("./image/left.png")} style={styles.btnLEFTimage}></Image>
              </TouchableOpacity>
              <TouchableOpacity 
              style={styles.btnRtouch} 
              onPressIn={this.btnP} onPressOut={this.stopTimer}>
                <Image source={require("./image/p.png")} style={styles.btnRimage}></Image>
              </TouchableOpacity>
              <TouchableOpacity 
              style={styles.btnRtouch} 
              onPress={this.btnQ}>
                <Image source={require("./image/q.png")} style={styles.btnRimage}></Image>
              </TouchableOpacity>
              <TouchableOpacity 
              style={styles.btnRtouch} 
              onPress={this.btnM}>
                <Image source={require("./image/m.png")} style={styles.btnRimage}></Image>
              </TouchableOpacity>
              <TouchableOpacity 
              style={styles.btnRtouch} 
              onPress={this.btnL}>
                <Image source={require("./image/l.png")} style={styles.btnRimage}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnLEFTtouch} 
              onPressIn={this.btnRight} onPressOut={this.stopTimer}>
                <Image source={require("./image/right.png")} style={styles.btnLEFTimage}></Image>
              </TouchableOpacity>
          </View>
          <View style={styles.btnRview}>
              <TouchableOpacity style={styles.btnLEFTtouch} 
              onPressIn={this.btnDown} onPressOut={this.stopTimer}>
                <Image source={require("./image/down.png")} style={styles.btnLEFTimage}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnpacman}>
                    <Image source={require("./image/pacman.png")} style={styles.btnPacmanimage}></Image>
              </TouchableOpacity>
            </View>
        </View>
      
      
      </View>
    );
  }

//</ImageBackground>
static navigationOptions = ({ navigation }) => {
  return {
      title: 'cotroller',
      headerStyle: {
        
        backgroundColor: '#6fffe9',
        barStyle: "light-content", // or directly
      },
      headerTintColor: '#0b132b',
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
                //this.socket.emit("chat message" ,"close");
                navigation.navigate('Home')
                }} textStyle={{color: '#000', fontSize: 16}}>startPage</MenuItem>
              <MenuItem  onPress={() =>{
                this._menu.hide()
                //this.socket.emit("chat message" ,"close");
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
  mainContainer:{
    flex : 1,
    flexDirection:"row",
    backgroundColor:"#1c2541",
    justifyContent:"space-between",
  },
  firstFlex:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center"
  },
  btnXview:{
    flex:1,
    marginHorizontal:30,
    marginTop:50,
    justifyContent:"center",
    alignItems:"flex-start"
  },
  btnXtouch:{
    justifyContent:"center",
    borderRadius:15,
    marginHorizontal:5,
    marginVertical:5
  },
  btnXimage:{
    height:70,
    width:70,
    resizeMode:"contain"
  },
  btnRview:{
    flex:1,
    marginHorizontal:30,
    marginTop:50,
    justifyContent:"space-around",
    //alignItems:"center"
  },
  btnRtouch:{
    justifyContent:"center",
    borderRadius:15,
    marginHorizontal:5,
    marginVertical:5
  },
  btnRimage:{
    height:70,
    width:70,
    resizeMode:"contain"
  },
  btnUPview:{
    flex:1,
    flexDirection:"column",
    alignItems:'center',
    justifyContent:"flex-start"
  },
  btnUPtouch:{
    justifyContent:"center",
    borderRadius:15,
    marginHorizontal:5,
    marginVertical:5
  },
  btnpacman:{
    justifyContent:"flex-end",
    alignItems:"flex-end",
    borderRadius:15,
    marginHorizontal:5,
    marginVertical:5
  },
  btnUPimage:{
    height:70,
    width:70,
    resizeMode:"contain"
  },
  btnPacmanimage:{
    // justifyContent:"flex-end",
    // alignItems:"flex-end",
    // marginHorizontal:15,
    // marginVertical:15,
    height:150,
    width:150,
    resizeMode:"contain"
  },
  arrowView:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    justifyContent:"space-between"
  },
  btnLEFTtouch:{
    justifyContent:"center",
    alignItems:"center",
    borderRadius:15,
    marginHorizontal:5,
    marginVertical:5
  },
  btnLEFTimage:{
    height:70,
    width:70,
    resizeMode:"contain"
  },
  btnSHIFTview:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center"
  },
  btnLeftShiftview:{
    flex:1,
    marginHorizontal:30,
    marginTop:50,
    justifyContent:"flex-end",
    alignItems:"flex-start"
  },
  btnRightShiftview:{
    flex:1,
    marginHorizontal:30,
    marginTop:50,
    justifyContent:"flex-end",
    alignItems:"flex-end"
  },
  btnSHIFTtouch:{
    justifyContent:"center",
    borderRadius:15,
    marginHorizontal:5,
    marginVertical:5
  },
  btnSHIFTimage:{
    height:100,
    width:150,
    resizeMode:"contain"
  },
  lastView:{
    flex:2,
    flexDirection:"row"
  },
  btnCTRLview:{
    flex:1,
    justifyContent:"center"
  },
  btnSPACEview:{
    flex:3,
    justifyContent:"center"
  },
  btnCTRLtouch:{
    borderRadius:15,
    marginHorizontal:30
  },
  btnCTRLimage:{
    height:70,
    width:70,
    resizeMode:"contain"
  },
  btnSPACEtouch:{
    justifyContent:"center",
    borderRadius:15,
    marginHorizontal:5,
    marginVertical:5,
    alignContent:"center"
  },
  btnSPACEimage:{
    height:80,
    width:420,
    resizeMode:"contain"
  },
  cont2:{
    flex: 1,
  //backgroundColor: '#F5FCFF',//'#F5FCFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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