import React, { Component } from "react";
import {AppRegistry, BackHandler, View , StyleSheet, ScrollView,Image, Animated,Dimensions , Alert,TouchableOpacity, Text } from "react-native";

import {accelerometer} from "react-native-sensors";
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import io from 'socket.io-client/dist/socket.io';
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Orientation from 'react-native-orientation';

const responsiveWidth = Dimensions.get('screen').width;
const responsiveHeight = Dimensions.get('screen').height;

var newRender = [];
var a = [];

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
      element:[],
      count:0,
      renderview: [],
      data: {x: 0,
            y: 0,
            z: 0,
          },     
      number:0,
    };
  
  }
 

   async componentDidMount() {
    console.disableYellowBox = true;
    Orientation.lockToLandscape();
    const ip = String(await AsyncStorage.getItem('@storage_Key'));
    var ipaddr = 'http://'+ ip + ':8000';
    this.setState({data_in : ipaddr});
    //this.socket = io("http://192.168.43.136:8000");
    this.socket = io(this.state.data_in);

    this.setState({element:String(await AsyncStorage.getItem('elements'))});
    if(this.state.element.length){
      this.socket.emit("input",this.state.element);
    }
    var flag ;
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
        if(firstRight){
          firstRight = false;
          msg = 'left';   
          this.socket.emit("toggledown" ,msg);
        }
      }
      if(item.y > 2 ){
        if(firstLeft){
          firstLeft = false;
          msg = 'right';   
          this.socket.emit("toggledown" ,msg);
        }
      }
      if(item.x < -2 ){
        if(firstUp){
          firstUp = false;
          msg = 'up';   
          this.socket.emit("toggledown" ,msg);
        }
      }
      if(item.x > 2){
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
 
  if(this.state.element.indexOf('"a"')>0){
    a.push(<View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch} onPressIn={this.btnA} onPressOut={this.btnAT} >
          <Image source={require("./image/a.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>);
  }
  if(this.state.element.indexOf('"b"')>0){
    a.push(<View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnB}  onPressOut={this.btnBT}>
          <Image source={require("./image/b.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>);
  }
  if(this.state.element.indexOf('"c"')>0){
    a.push(<View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnC}  onPressOut={this.btnCT}>
          <Image source={require("./image/c.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>);
  }
  if(this.state.element.indexOf('"d"')>0){
    a.push(<View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnD}  onPressOut={this.btnDT}>
          <Image source={require("./image/d.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>);
  }
  if(this.state.element.indexOf('"e"')>0){
    a.push(
          <View style={styles.btnXview}>
          <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnE}  onPressOut={this.btnET}>
              <Image source={require("./image/e.png")} style={styles.btnRimage}></Image>
          </TouchableOpacity>
          </View>
          );
  }
  if(this.state.element.indexOf('"f"')>0){
    a.push( <View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnF}  onPressOut={this.btnFT}>
          <Image source={require("./image/f.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>
    );
  }
  if(this.state.element.indexOf('"g"')>0){
    a.push(<View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnG}  onPressOut={this.btnGT}>
          <Image source={require("./image/g.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>
    );
  }
  if(this.state.element.indexOf('"h"')>0){
    a.push(<View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnH}  onPressOut={this.btnHT}>
          <Image source={require("./image/h.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>         
    );
  }
  if(this.state.element.indexOf('"i"')>0){
    a.push(<View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnI}  onPressOut={this.btnIT}>
          <Image source={require("./image/i.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>
    );
  }
  if(this.state.element.indexOf('"j"')>0){
    a.push(<View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnJ}  onPressOut={this.btnJT}>
          <Image source={require("./image/j.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>
    );
  }
  if(this.state.element.indexOf('"k"')>0){
    a.push(<View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnK}  onPressOut={this.btnKT}>
          <Image source={require("./image/k.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>
    );
  }
  if(this.state.element.indexOf('"l"')>0){
    a.push(<View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnL}  onPressOut={this.btnLT}>
          <Image source={require("./image/l.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>        
    );
  }
  if(this.state.element.indexOf('"m"')>0){
    a.push(
      <View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnM}  onPressOut={this.btnMT}>
          <Image source={require("./image/m.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>        
    );
  }
  if(this.state.element.indexOf('"n"')>0){
    a.push(
      <View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnN}  onPressOut={this.btnNT}>
          <Image source={require("./image/n.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>        
    );
  }
  if(this.state.element.indexOf('"o"')>0){
    a.push(
      <View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnO}  onPressOut={this.btnOT}>
          <Image source={require("./image/o.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>        
    );
  }
  if(this.state.element.indexOf('"p"')>0){
    a.push(
      <View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnP}  onPressOut={this.btnPT}>
          <Image source={require("./image/p.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>        
    );
  }
  if(this.state.element.indexOf('"q"')>0){
    a.push(
      <View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnQ}  onPressOut={this.btnQT}>
          <Image source={require("./image/q.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>        
    );      
  }
  if(this.state.element.indexOf('"r"')>0){
    a.push(
      <View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnR}  onPressOut={this.btnRT}>
          <Image source={require("./image/r.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>                 
    );
  }
  if(this.state.element.indexOf('"s"')>0){
    a.push(<View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnS}  onPressOut={this.btnST}>
          <Image source={require("./image/s.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>        
    );
  }
  if(this.state.element.indexOf('"t"')>0){
    a.push(
      <View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnT}  onPressOut={this.btnTT}>
          <Image source={require("./image/t.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>        
    );
  }
  if(this.state.element.indexOf('"u"')>0){
    a.push(
      <View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnU}  onPressOut={this.btnUT}>
          <Image source={require("./image/u.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>        
    );
  }
  if(this.state.element.indexOf('"v"')>0){
    a.push(
      <View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnV}  onPressOut={this.btnVT}>
          <Image source={require("./image/v.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>        
    );
  }
  if(this.state.element.indexOf('"w"')>0){
    a.push(
      <View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnW}  onPressOut={this.btnWT}>
          <Image source={require("./image/w.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>        
    );
  }
  if(this.state.element.indexOf('"x"')>0){
    a.push(
      <View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnX}  onPressOut={this.btnXT}>
          <Image source={require("./image/x.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>
    );
  }
  if(this.state.element.indexOf('"y"')>0){
    a.push(
      <View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnY}  onPressOut={this.btnYT}>
          <Image source={require("./image/y.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>        
    );
  }
  if(this.state.element.indexOf('"z"')>0){
    a.push(
      <View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnZ}  onPressOut={this.btnZT}>
          <Image source={require("./image/z.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>      
    );
  }
  if(this.state.element.indexOf('RCTRL')>0){
    a.push(<View style={styles.btnXview}>
      <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnRightCtrl}  onPressOut={this.btnRightCtrlT}>
          <Image source={require("./image/ctrl.png")} style={styles.btnRimage}></Image>
      </TouchableOpacity>
      </View>);
    }
    if(this.state.element.indexOf('up')>0){
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnUp}  onPressOut={this.btnUpT} >
            <Image source={require("./image/up.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>);
    }
    if(this.state.element.indexOf('down')>0){
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnDown} onPressOut={this.btnDownT} >
            <Image source={require("./image/down.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>);
    }
    if(this.state.element.indexOf('left')>0){
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPressIn={this.btnLeft} onPressOut={this.btnLeftT} >
            <Image source={require("./image/left.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>);
    }
    if(this.state.element.indexOf('right')>0){
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPressIn={this.btnRight} onPressOut={this.btnRightT} >
            <Image source={require("./image/right.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>);
    }
    if(this.state.element.indexOf('delete')>0){
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPressIn={this.btnDelete} onPressOut={this.btnDeleteT} >
            <Image source={require("./image/delete.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>);
    }
    if(this.state.element.indexOf('LCTRL')>0){
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnLeftCtrl}  onPressOut={this.btnLeftCtrlT}>
            <Image source={require("./image/ctrl.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>);
    }
    if(this.state.element.indexOf('LSHIFT')>0){
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnLeftShift}  onPressOut={this.btnLeftShiftT}>
            <Image source={require("./image/shift.png")} style={styles.btnSHIFTimage}></Image>
        </TouchableOpacity>
        </View>);
    }
    if(this.state.element.indexOf('"space"')>0){
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPressIn={this.btnSpace} onPressOut={this.btnSpaceT}>
            <Image source={require("./image/space.png")} style={styles.btnSPACEimage}></Image>
        </TouchableOpacity>
        </View>);
    }
    if(this.state.element.indexOf('right_shift')>0){
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnRightShift}  onPressOut={this.btnRightShiftT}>
            <Image source={require("./image/shift.png")} style={styles.btnSHIFTimage}></Image>
        </TouchableOpacity>
        </View>);
    }
    if(this.state.element.indexOf('escape')>0){
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnEsc}  onPressOut={this.btnEscT}>
            <Image source={require("./image/esc.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>);
    }
    if(this.state.element.includes('backspace')){
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPressIn={this.btnBackspace} onPressOut={this.btnBackspaceT}>
            <Image source={require("./image/backspace.png")} style={styles.btnSHIFTimage}></Image>
        </TouchableOpacity>
        </View>);
    }
    if(this.state.element.indexOf('enter')>0){
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnEnter}  onPressOut={this.btnEnterT}>
            <Image source={require("./image/enter.png")} style={styles.btnSHIFTimage}></Image>
        </TouchableOpacity>
        </View>);
    }
    if(this.state.element.indexOf('alt')>0){
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch}  onPressIn={this.btnAlt}  onPressOut={this.btnAltT}>
            <Image source={require("./image/alt.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>);
    }
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
    //AsyncStorage.setItem('@storage_Key', " ")
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
  
    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

backtoPrevScreen=()=>{
  this.socket.emit("chat message" ,"close");
  //AsyncStorage.setItem('@storage_Key'," ");
  this.props.navigation.navigate('Home');
  return true;
}
stopTimer() {
  clearTimeout(this.timer);
}


btnA=()=>{
  this.socket.emit("toggledown" ,'a'); 
}
btnB=()=>{
  this.socket.emit("toggledown" ,'b'); 
}
btnC=()=>{
  this.socket.emit("toggledown" ,'c'); 
}
btnD=()=>{
  this.socket.emit("toggledown" ,'d'); 
}
btnE=()=>{
  this.socket.emit("toggledown" ,'e'); 
}
btnF=()=>{
  this.socket.emit("toggledown" ,'f'); 
}
btnG=()=>{
  this.socket.emit("toggledown" ,'g'); 
}
btnH=()=>{
  this.socket.emit("toggledown" ,'h'); 
}
btnI=()=>{
  this.socket.emit("toggledown" ,'i'); 
}
btnJ=()=>{
  this.socket.emit("toggledown" ,'j'); 
}
btnK=()=>{
  this.socket.emit("toggledown" ,'k'); 
}
btnL=()=>{
  this.socket.emit("toggledown" ,'l'); 
}
btnM=()=>{
  this.socket.emit("toggledown" ,'m'); 
}
btnN=()=>{
  this.socket.emit("toggledown" ,'n'); 
}
btnO=()=>{
  this.socket.emit("toggledown" ,'o'); 
}
btnP=()=>{
  this.socket.emit("toggledown" ,'p'); 
}
btnQ=()=>{
  this.socket.emit("toggledown" ,'q'); 
}
btnR=()=>{
  this.socket.emit("toggledown" ,'r'); 
}
btnS=()=>{
  this.socket.emit("toggledown" ,'s'); 
}
btnT=()=>{
  this.socket.emit("toggledown" ,'t'); 
}
btnU=()=>{
  this.socket.emit("toggledown" ,'u'); 
}
btnV=()=>{
  this.socket.emit("toggledown" ,'v'); 
}
btnW=()=>{
  this.socket.emit("toggledown" ,'w'); 
}
btnX=()=>{
  this.socket.emit("toggledown" ,'x'); 
}
btnY=()=>{
  this.socket.emit("toggledown" ,'y'); 
}
btnZ=()=>{
  this.socket.emit("toggledown" ,'z'); 
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
btnSpace=()=>{
  this.socket.emit("toggledown" ,'space');
}
btnLeftShift=()=>{
  this.socket.emit("toggledown" ,'LSHIFT');
}
btnRightShift=()=>{
  this.socket.emit("toggledown" ,'right_shift');
}
btnLeftCtrl=()=>{
  this.socket.emit("toggledown" ,'LCTRL');
}
btnRightCtrl=()=>{
  this.socket.emit("toggledown" ,'RCTRL');
}
btnEnter=()=>{
  this.socket.emit("toggledown" ,'enter'); 
}
btnDelete=()=>{
  this.socket.emit("toggledown" ,'delete'); 
}
btnEsc=()=>{
  this.socket.emit("toggledown" ,'escape'); 
}
btnAlt=()=>{
  this.socket.emit("toggledown" ,'alt'); 
}
btnBackspace=()=>{
  this.socket.emit("toggledown" ,'backspace'); 
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
btnSpaceT=()=>{
  this.socket.emit("toggleup" ,'space');
}
btnDeleteT=()=>{
  this.socket.emit("toggleup" ,'delete'); 
}
btnBackspaceT=()=>{
  this.socket.emit("toggleup" ,'backspace'); 
}
btnAT=()=>{
  this.socket.emit("toggleup" ,'a'); 
}
btnBT=()=>{
  this.socket.emit("toggleup" ,'b'); 
}
btnCT=()=>{
  this.socket.emit("toggleup" ,'c'); 
}
btnDT=()=>{
  this.socket.emit("toggleup" ,'d'); 
}
btnET=()=>{
  this.socket.emit("toggleup" ,'e'); 
}
btnFT=()=>{
  this.socket.emit("toggleup" ,'f'); 
}
btnGT=()=>{
  this.socket.emit("toggleup" ,'g'); 
}
btnHT=()=>{
  this.socket.emit("toggleup" ,'h'); 
}
btnIT=()=>{
  this.socket.emit("toggleup" ,'i'); 
}
btnJT=()=>{
  this.socket.emit("toggleup" ,'j'); 
}
btnKT=()=>{
  this.socket.emit("toggleup" ,'k'); 
}
btnLT=()=>{
  this.socket.emit("toggleup" ,'l'); 
}
btnMT=()=>{
  this.socket.emit("toggleup" ,'m'); 
}
btnNT=()=>{
  this.socket.emit("toggleup" ,'n'); 
}
btnOT=()=>{
  this.socket.emit("toggleup" ,'o'); 
}
btnPT=()=>{
  this.socket.emit("toggleup" ,'p'); 
}
btnQT=()=>{
  this.socket.emit("toggleup" ,'q'); 
}
btnRT=()=>{
  this.socket.emit("toggleup" ,'r'); 
}
btnST=()=>{
  this.socket.emit("toggleup" ,'s'); 
}
btnTT=()=>{
  this.socket.emit("toggleup" ,'t'); 
}
btnUT=()=>{
  this.socket.emit("toggleup" ,'u'); 
}
btnVT=()=>{
  this.socket.emit("toggleup" ,'v'); 
}
btnWT=()=>{
  this.socket.emit("toggleup" ,'w'); 
}
btnXT=()=>{
  this.socket.emit("toggleup" ,'x'); 
}
btnYT=()=>{
  this.socket.emit("toggleup" ,'y'); 
}
btnZT=()=>{
  this.socket.emit("toggleup" ,'z'); 
}
btnLeftShiftT=()=>{
  this.socket.emit("toggleup" ,'LSHIFT');
}
btnRightShiftT=()=>{
  this.socket.emit("toggleup" ,'right_shift');
}
btnLeftCtrlT=()=>{
  this.socket.emit("toggleup" ,'LCTRL');
}
btnRightCtrlT=()=>{
  this.socket.emit("toggleup" ,'RCTRL');
}
btnEnterT=()=>{
  this.socket.emit("toggleup" ,'enter'); 
}
btnEscT=()=>{
  this.socket.emit("toggleup" ,'escape'); 
}
btnAltT=()=>{
  this.socket.emit("toggleup" ,'alt'); 
}

_menu = null;

setMenuRef = ref => {
  this._menu = ref;
};
  
  render() { 
    var one=[],two=[],tree=[],four=[];
    for(let i=0; i<a.length; ++i){
      if(i<a.length/4)
        one.push(a[i])
      else if(i<2*a.length/4)
        two.push(a[i]);
      else if(i<3*a.length/4)
        tree.push(a[i]);
      else if(i<4*a.length/4)
        four.push(a[i]);        
    }
    return (    
      <View style = { styles.mainContainer }>
        <View style={styles.cont2}>
        <View style={styles.firstFlex}>
          {one}
        </View>
        <View style={styles.firstFlex}>
          {two}
        </View>
        <View style={styles.firstFlex}>
          {tree}
        </View>
        <View style={styles.firstFlex}>
          {four}
        </View>
        </View>
      </View>

    );
  }

static navigationOptions = ({ navigation }) => {
  return {
      title: 'cotroller',
      headerStyle: {
        
        backgroundColor: '#6fffe9',
        barStyle: "light-content",
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
                navigation.navigate('Home')
                }} textStyle={{color: '#000', fontSize: 16}}>Home</MenuItem>
              <MenuItem onPress={() => {
                this._menu.hide()
                }} textStyle={{fontSize: 16}} disabled>Game Controller</MenuItem>
              <MenuItem  onPress={() =>{
                this._menu.hide()
                navigation.navigate('mouse')
                }} textStyle={{color: '#000',fontSize: 16}}>Desktop Controller</MenuItem>
              
          </Menu>
        </View>
      ),
    }
  }
}
const styles=StyleSheet.create({
  cont1:{
    flex: 1,
  },
  mainContainer:{
    flex : 1,
    flexDirection:"row",
    backgroundColor:"#1c2541"
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
    justifyContent:"center",
    alignItems:"flex-end"
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
    justifyContent:"flex-end"
  },
  btnUPtouch:{
    justifyContent:"center",
    borderRadius:15,
    marginHorizontal:5,
    marginVertical:5
  },
  btnUPimage:{
    height:70,
    width:70,
    resizeMode:"contain"
  },
  arrowView:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center"
  },
  btnLEFTtouch:{
    justifyContent:"center",
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
    height:50,
    width:350,
    resizeMode:"contain"
  },
  cont2:{
    flex: 2,
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
