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


var firstLeft=true;
var firstRight=true;
var firstUp=true;
var firstDown = true;
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
    console.disableYellowBox = true;
    Orientation.lockToLandscape();
    const ip = String(await AsyncStorage.getItem('@storage_Key'));
    var ipaddr = 'http://'+ ip + ':8000';
    this.setState({data_in : ipaddr});
    this.socket = io("http://192.168.43.136:8000");
    //this.socket = io(this.state.data_in);
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
    
    setUpdateIntervalForType(SensorTypes.accelerometer, 50);
    accelerometer.subscribe(({ x, y, z }) => {
      this.setState({data : {x,y,z}})
    })
  
    accelerometer.subscribe(item => {
      var msg = [];

      this.socket.emit("rec",flag);
      if(flag){
        var pos = "";
        pos = item.x.toFixed(2) + " " + item.y.toFixed(2);
        this.socket.emit("position" ,pos);

        if(item.y < -2 && item.x > 2 ){
          if(firstDown){
            firstDown = false;
            msg = 'down';  
            this.socket.emit("toggledown" ,msg);
          }
          if(firstRight){
            firstRight = false;
            msg = 'left';  
            this.socket.emit("toggledown" ,msg);
          }
        }
        if(item.y > 2 && item.x < -2 ){
          msg = 'right';  
          this.socket.emit("direction" ,msg);
          msg = 'up';  
          this.socket.emit("direction" ,msg);
          if(firstUp){
            firstUp = false;
            msg = 'up';  
            this.socket.emit("toggledown" ,msg);
          }
          if(firstLeft){
            firstLeft = false;
            msg = 'right';  
            this.socket.emit("toggledown" ,msg);
          }
        }
        if(item.y > 2 && item.x > 2 ){
          msg = 'right';  
          this.socket.emit("direction" ,msg);
          msg = 'down';  
          this.socket.emit("direction" ,msg);
          if(firstDown){
            firstDown = false;
            msg = 'down';  
            this.socket.emit("toggledown" ,msg);
          }
          if(firstLeft){
            firstLeft = false;
            msg = 'right';  
            this.socket.emit("toggledown" ,msg);
          }
        }
        if(item.y < -2 && item.x < -2 ){
          msg = 'left';  
          this.socket.emit("direction" ,msg);
          msg = 'up';  
          this.socket.emit("direction" ,msg);
          if(firstUp){
            firstUp = false;
            msg = 'up';  
            this.socket.emit("toggledown" ,msg);
          }
          if(firstRight){
            firstRight = false;
            msg = 'left';  
            this.socket.emit("toggledown" ,msg);
          }
        }
        if(item.y < -2 ){
          msg = 'left';  
          this.socket.emit("direction" ,msg);
          if(firstRight){
            firstRight = false;
            msg = 'left';  
            this.socket.emit("toggledown" ,msg);
          }
        }
        if(item.y > 2 ){
          msg = 'right';  
          this.socket.emit("direction" ,msg);
  
          if(firstLeft){
            firstLeft = false;
            msg = 'right';  
            this.socket.emit("toggledown" ,msg);
          }
        }
        if(item.x < -2 ){
          msg = 'up';  
          this.socket.emit("direction" ,msg);
          if(firstUp){
            firstUp = false;
            msg = 'up';  
            this.socket.emit("toggledown" ,msg);
          }
        }
        if(item.x > 2){
          msg = 'down';  
          this.socket.emit("direction" ,msg);
  
          if(firstDown){
            firstDown = false;
            msg = 'down';  
            this.socket.emit("toggledown" ,msg);
          }
        }
        if(item.y > -2 && item.y < 2 && item.x > -2 && item.x < 2){
          if(!firstLeft){
            firstLeft = true;
            msg = 'right';
            this.socket.emit("toggleup" ,msg);
          }
          if(!firstRight){
          firstRight = true;
          msg = 'left';
          this.socket.emit("toggleup" ,msg);
          }
          if(!firstDown){
            firstDown = true;
            msg = 'down';
            this.socket.emit("toggleup" ,msg);
            }
            if(!firstUp){
            firstUp = true;
            msg = 'up';
            this.socket.emit("toggleup" ,msg);
            }
        }
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
  btnUp=()=>{
    this.socket.emit("toggledown" ,'up');
  }
  btnDown=()=>{
    this.socket.emit("toggledown" ,'down');
  }
  btnLeft=()=>{ 
    this.socket.emit("toggledown" ,'left');
  }
  btnRight=()=>{
    this.socket.emit("toggledown" ,'right');
  }
  btnUpT=()=>{
    this.socket.emit("toggleup" ,'up');
  }
  btnDownT=()=>{
    this.socket.emit("toggleup" ,'down');
  }
  btnLeftT=()=>{ 
    this.socket.emit("toggleup" ,'left');
  }
  btnRightT=()=>{
    this.socket.emit("toggleup" ,'right');
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
            onPressIn={this.btnUp} onPressOut={this.btnUpT}>
              <Image source={require("./image/up.png")} style={styles.btnUPimage}></Image>
            </TouchableOpacity>
          </View>
          
          <View style={styles.arrowView}>
              <TouchableOpacity 
              style={styles.btnRtouch} 
              onPressIn={this.btnP} onPressOut={this.stopTimer}>
                <Image source={require("./image/p.png")} style={styles.btnRimage}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnLEFTtouch}
              onPressIn={this.btnLeft} onPressOut={this.btnLeftT}>
                <Image source={require("./image/left.png")} style={styles.btnLEFTimage}></Image>
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
              <TouchableOpacity style={styles.btnLEFTtouch} 
              onPressIn={this.btnRight} onPressOut={this.btnRightT}>
                <Image source={require("./image/right.png")} style={styles.btnLEFTimage}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnRtouch} onPress={this.btnL}>
                <Image source={require("./image/l.png")} style={styles.btnRimage}></Image>
              </TouchableOpacity>
          </View>

        <View style={styles.btnSHIFTview}>
          <View style={styles.btnRview}>
              <TouchableOpacity style={styles.btnLEFTtouch} 
              onPressIn={this.btnDown} onPressOut={this.btnDownT}>
                <Image source={require("./image/down.png")} style={styles.btnLEFTimage}></Image>
              </TouchableOpacity>
          </View>
          
        </View>
      </View>
      
      </View>
    );
  }
/**
 * <View style={styles.btnRview}>
              
              <TouchableOpacity style={styles.btnpacman}>
                    <Image source={require("./image/pacman.png")} style={styles.btnPacmanimage}></Image>
              </TouchableOpacity>
            </View>
 */
//</ImageBackground>
static navigationOptions = ({ navigation }) => {
  return {
      title: 'Pac-Man',
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