import React, { Component } from "react";
import {AppRegistry, BackHandler, View , StyleSheet, ScrollView,Image, Dimensions , Alert,TouchableOpacity, Text } from "react-native";

import {accelerometer} from "react-native-sensors";
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import io from 'socket.io-client/dist/socket.io';//'socket.io-client';
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
    this.timer = null;
    this.btnA = this.btnA.bind(this);
    this.btnB = this.btnB.bind(this);
    this.btnC = this.btnC.bind(this);
    this.btnD = this.btnD.bind(this);
    this.btnE = this.btnE.bind(this);
    this.btnF = this.btnF.bind(this);
    this.btnG = this.btnG.bind(this);
    this.btnH = this.btnH.bind(this);
    this.btnI = this.btnI.bind(this);
    this.btnJ = this.btnJ.bind(this);
    this.btnK = this.btnK.bind(this);
    this.btnL = this.btnL.bind(this);
    this.btnM = this.btnM.bind(this);
    this.btnN = this.btnN.bind(this);
    this.btnO = this.btnO.bind(this);
    this.btnP = this.btnP.bind(this);
    this.btnQ = this.btnQ.bind(this);
    this.btnR = this.btnR.bind(this);
    this.btnS = this.btnS.bind(this);
    this.btnT = this.btnT.bind(this);
    this.btnU = this.btnU.bind(this);
    this.btnV = this.btnV.bind(this);
    this.btnW = this.btnW.bind(this);
    this.btnX = this.btnX.bind(this);
    this.btnY = this.btnY.bind(this);
    this.btnZ = this.btnZ.bind(this);
    this.btnUp = this.btnUp.bind(this);
    this.btnLeft = this.btnLeft.bind(this);
    this.btnRight = this.btnRight.bind(this);
    this.btnDown = this.btnDown.bind(this);
    this.btnLeftShift = this.btnLeftShift.bind(this);
    this.btnRightShift = this.btnRightShift.bind(this);
    this.btnEnter = this.btnEnter.bind(this);
    this.btnBackspace = this.btnBackspace.bind(this);
    this.btnDelete = this.btnDelete.bind(this);
    this.btnAlt = this.btnAlt.bind(this);
    this.btnEsc = this.btnEsc.bind(this);
    this.btnSpace = this.btnSpace.bind(this);
    this.btnLeftCtrl = this.btnLeftCtrl.bind(this);
    this.btnRightCtrl = this.btnRightCtrl.bind(this);
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
      var vertical = '';
      var horizontal = '';
      var msg = [];


      this.socket.emit("rec",flag);
      if(flag){
        var pos = "";
        pos = item.x.toFixed(2) + " " + item.y.toFixed(2);
        this.socket.emit("position" ,pos);
      if(item.y < -2 && item.x > 2 ){
        if(firstDown){
          firstDown = false;
          msg = 'down';//87;up
          this.socket.emit("toggledown" ,msg);
        }
        if(firstRight){
          firstRight = false;
          msg = 'left';//87;up
          this.socket.emit("toggledown" ,msg);
        }
      }
      if(item.y > 2 && item.x < -2 ){
        msg = 'right';//87;up
        this.socket.emit("direction" ,msg);
        msg = 'up';//87;up
        this.socket.emit("direction" ,msg);
        if(firstUp){
          firstUp = false;
          msg = 'up';//87;up
          this.socket.emit("toggledown" ,msg);
        }
        if(firstLeft){
          firstLeft = false;
          msg = 'right';//87;up
          this.socket.emit("toggledown" ,msg);
        }
      }
      if(item.y > 2 && item.x > 2 ){
        msg = 'right';//87;up
        this.socket.emit("direction" ,msg);
        msg = 'down';//87;up
        this.socket.emit("direction" ,msg);
        if(firstDown){
          firstDown = false;
          msg = 'down';//87;up
          this.socket.emit("toggledown" ,msg);
        }
        if(firstLeft){
          firstLeft = false;
          msg = 'right';//87;up
          this.socket.emit("toggledown" ,msg);
        }
      }
      if(item.y < -2 && item.x < -2 ){
        msg = 'left';//87;up
        this.socket.emit("direction" ,msg);
        msg = 'up';//87;up
        this.socket.emit("direction" ,msg);
        if(firstUp){
          firstUp = false;
          msg = 'up';//87;up
          this.socket.emit("t  o  ggledown" ,msg);
        }
        if(firstRight){
          firstRight = false;
          msg = 'left';//87;up
          this.socket.emit("toggledown" ,msg);
        }
      }
      if(item.y < -2 ){
        msg = 'left';//87;up
        this.socket.emit("direction" ,msg);
        if(firstRight){
          firstRight = false;
          msg = 'left';//87;up
          this.socket.emit("toggledown" ,msg);
        }
      }
      if(item.y > 2 ){
        msg = 'right';//87;up
        this.socket.emit("direction" ,msg);

        if(firstLeft){
          firstLeft = false;
          msg = 'right';//87;up
          this.socket.emit("input" ,"set firstLeft"+ firstLeft);
          this.socket.emit("toggledown" ,msg);
        }
      }
      if(item.x < -2 ){
        msg = 'up';//87;up
        this.socket.emit("direction" ,msg);
        if(firstUp){
          firstUp = false;
          msg = 'up';//87;up
          this.socket.emit("toggledown" ,msg);
        }
      }
      if(item.x > 2){
        msg = 'down';//87;up
        this.socket.emit("direction" ,msg);

        if(firstDown){
          firstDown = false;
          msg = 'down';//87;up
          this.socket.emit("toggledown" ,msg);
        }
      }
      if(item.y > -2 && item.y < 2 && item.x > -2 && item.x < 2){
        this.socket.emit("input" ,firstLeft);
        if(!firstLeft){
          this.socket.emit("input" ,"omad left" + firstLeft);
          firstLeft = true;
          msg = 'right';
          this.socket.emit("toggleup" ,msg);
        }
        if(!firstRight){
        firstRight = true;
        msg = 'left';//87;up
        this.socket.emit("toggleup" ,msg);
        }
        if(!firstDown){
          firstDown = true;
          msg = 'down';//87;up
          this.socket.emit("toggleup" ,msg);
          }
          if(!firstUp){
          firstUp = true;
          msg = 'up';//87;up
          this.socket.emit("toggleup" ,msg);
          }
      }
    }
  });
 
 a = this.state.renderview;

    if(this.state.element.indexOf('a')){
      this.setState({count:this.state.count + 1});
//      var a = this.state.renderview;
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnA} >
            <Image source={require("./image/a.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>);
      this.setState({renderview: a});
    }
    if(this.state.element.indexOf('b')){
      this.setState({count:this.state.count + 1});
  //    var a = this.state.renderview;
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnB} >
            <Image source={require("./image/b.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>);
      this.setState({renderview: a});
    }
    if(this.state.element.indexOf('c')){
      this.setState({count:this.state.count + 1});
 //     var a = this.state.renderview;
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnC} >
            <Image source={require("./image/c.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>);
        this.setState({renderview: a});
    }
    if(this.state.element.indexOf('d')){
      this.setState({count:this.state.count + 1});
//      var a = this.state.renderview;
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnD} >
            <Image source={require("./image/d.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>);
        this.setState({renderview: a});
    }
    if(this.state.element.indexOf('e')){
      this.setState({count:this.state.count + 1});
      // var a = this.state.renderview;
      a.push(
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnE} >
                <Image source={require("./image/e.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            );
      this.setState({renderview: a});
    }
    if(this.state.element.indexOf('f')){
      this.setState({count:this.state.count + 1});
      // var a = this.state.renderview;
      a.push( <View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnF} >
            <Image source={require("./image/f.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>
      );
      this.setState({renderview: a});
    }
    if(this.state.element.indexOf('g')){
      this.setState({count:this.state.count + 1});
      // var a = this.state.renderview;
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnG} >
            <Image source={require("./image/g.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>
        
      );
      this.setState({renderview: a});
    }
    if(this.state.element.indexOf('h')){
      this.setState({count:this.state.count + 1});
      // var a = this.state.renderview;
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnH} >
            <Image source={require("./image/h.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>         
      );
      this.setState({renderview: a});
    }
    if(this.state.element.indexOf('i')){
      this.setState({count:this.state.count + 1});
      // var a = this.state.renderview;
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnI} >
            <Image source={require("./image/i.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>
      );
      this.setState({renderview: a});
    }
    if(this.state.element.indexOf('j')){
      this.setState({count:this.state.count + 1});
      // var a = this.state.renderview;
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnJ} >
            <Image source={require("./image/j.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>
               
      );
      this.setState({renderview: a});
    }
    if(this.state.element.indexOf('k')){
      this.setState({count:this.state.count + 1});
      // var a = this.state.renderview;
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnK} >
            <Image source={require("./image/k.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>
        
      );
      this.setState({renderview: a});
    }
    if(this.state.element.indexOf('l')){
      // var a = this.state.renderview;
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnL} >
            <Image source={require("./image/l.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>        
      );
      this.setState({renderview: a});
    }
    if(this.state.element.indexOf('m')){
      // var a = this.state.renderview;
      a.push(
        <View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnM} >
            <Image source={require("./image/m.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>        
      );
      this.setState({renderview: a});
    }
    if(this.state.element.indexOf('n')){
      // var a = this.state.renderview;
      a.push(
        <View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnN} >
            <Image source={require("./image/n.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>        
      );
      this.setState({renderview: a});
    }
    if(this.state.element.indexOf('o')){
      // var a = this.state.renderview;
      a.push(
        <View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnO} >
            <Image source={require("./image/o.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>        
      );
      this.setState({renderview: a});
    }
    if(this.state.element.indexOf('p')){
      // var a = this.state.renderview;
      a.push(
        <View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnP} >
            <Image source={require("./image/p.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>        
      );
      this.setState({renderview: a});

    }
    if(this.state.element.indexOf('q')){
      // var a = this.state.renderview;
      a.push(
        <View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnQ} >
            <Image source={require("./image/q.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>        
      );      
      this.setState({renderview: a});
    }
    if(this.state.element.indexOf('r')){
      // var a = this.state.renderview;
      a.push(
        <View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnR} >
            <Image source={require("./image/r.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>                 
      );
    }
    if(this.state.element.indexOf('s')){
      // var a = this.state.renderview;
      a.push(<View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnS} >
            <Image source={require("./image/s.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>        
      );
      this.setState({renderview: a});

    }
    if(this.state.element.indexOf('t')){
      // var a = this.state.renderview;
      a.push(
        <View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnT} >
            <Image source={require("./image/t.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>        
      );
      this.setState({renderview: a});

    }
    if(this.state.element.indexOf('u')){
      // var a = this.state.renderview;
      a.push(
        <View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnU} >
            <Image source={require("./image/u.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>        
      );
      this.setState({renderview: a});

    }
    if(this.state.element.indexOf('v')){
      // var a = this.state.renderview;
      a.push(
        <View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnV} >
            <Image source={require("./image/v.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>        
      );
      this.setState({renderview: a});

    }
    if(this.state.element.indexOf('w')){
      // var a = this.state.renderview;
      a.push(
        <View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnW} >
            <Image source={require("./image/w.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>        
      );
      this.setState({renderview: a});

    }
    if(this.state.element.indexOf('x')){
      // var a = this.state.renderview;
      a.push(
        <View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnX} >
            <Image source={require("./image/x.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>
        
      );
      this.setState({renderview: a});
    }
    if(this.state.element.indexOf('y')){
      // var a = this.state.renderview;
      a.push(
        <View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnY} >
            <Image source={require("./image/y.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>        
      );
      this.setState({renderview: a});

    }
    if(this.state.element.indexOf('z')){
      // var a = this.state.renderview;
      a.push(
        <View style={styles.btnXview}>
        <TouchableOpacity style={styles.btnRtouch} onPress={this.btnZ} >
            <Image source={require("./image/z.png")} style={styles.btnRimage}></Image>
        </TouchableOpacity>
        </View>      
      );
      this.setState({renderview: a});
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
    for(i=0;i< a.length;++i){
      a.pop();
    }
    this.socket.emit("chat message" ,"close");
    //AsyncStorage.setItem('@storage_Key', " ")
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
    
    for(i=0;i< a.length;++i){
      a.pop();
    }
    this.socket.emit("chat message" ,"close");
    //AsyncStorage.setItem('@storage_Key'," ");
    this.props.navigation.navigate('Home');
    return true;
  }
  stopTimer() {
    clearTimeout(this.timer);
  }


btnA=()=>{
  this.socket.emit("chat message" ,'a');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnB=()=>{
  this.socket.emit("chat message" ,'b');//88
  this.timer = setTimeout(this.btnB, 100);
}
btnC=()=>{
  this.socket.emit("chat message" ,'c');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnD=()=>{
  this.socket.emit("chat message" ,'d');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnE=()=>{
  this.socket.emit("chat message" ,'e');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnF=()=>{
  this.socket.emit("chat message" ,'f');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnG=()=>{
  this.socket.emit("chat message" ,'g');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnH=()=>{
  this.socket.emit("chat message" ,'h');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnI=()=>{
  this.socket.emit("chat message" ,'i');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnJ=()=>{
  this.socket.emit("chat message" ,'j');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnK=()=>{
  this.socket.emit("chat message" ,'k');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnL=()=>{
  this.socket.emit("chat message" ,'l');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnM=()=>{
  this.socket.emit("chat message" ,'m');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnN=()=>{
  this.socket.emit("chat message" ,'n');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnO=()=>{
  this.socket.emit("chat message" ,'o');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnP=()=>{
  this.socket.emit("chat message" ,'p');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnQ=()=>{
  this.socket.emit("chat message" ,'q');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnR=()=>{
  this.socket.emit("chat message" ,'r');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnS=()=>{
  this.socket.emit("chat message" ,'s');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnT=()=>{
  this.socket.emit("chat message" ,'t');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnU=()=>{
  this.socket.emit("chat message" ,'u');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnV=()=>{
  this.socket.emit("chat message" ,'v');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnW=()=>{
  this.socket.emit("chat message" ,'w');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnX=()=>{
  this.socket.emit("chat message" ,'x');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnY=()=>{
  this.socket.emit("chat message" ,'y');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnZ=()=>{
  this.socket.emit("chat message" ,'z');//88
  this.timer = setTimeout(this.btnA, 100);
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
  btnSpace=()=>{
    this.socket.emit("chat message" ,'space');//32
    this.timer = setTimeout(this.btnSpace, 100);
  }
  btnLeftShift=()=>{
    this.socket.emit("chat message" ,'LSHIFT');//160
    this.timer = setTimeout(this.btnLeftShift, 100);
  }
  btnRightShift=()=>{
    this.socket.emit("chat message" ,'right_shift');//161
    this.timer = setTimeout(this.btnRightShift, 100);
  }
  btnLeftCtrl=()=>{
    this.socket.emit("chat message" ,'LCTRL');//162
    this.timer = setTimeout(this.btnLeftCtrl, 100);
  }
  btnRightCtrl=()=>{
    this.socket.emit("chat message" ,'RCTRL');//163
    this.timer = setTimeout(this.btnRightCtrl, 100);
  }
btnEnter=()=>{
  this.socket.emit("chat message" ,'enter');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnDelete=()=>{
  this.socket.emit("chat message" ,'delete');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnEsc=()=>{
  this.socket.emit("chat message" ,'escape');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnAlt=()=>{
  this.socket.emit("chat message" ,'alt');//88
  this.timer = setTimeout(this.btnA, 100);
}
btnBackspace=()=>{
  this.socket.emit("chat message" ,'backspace');//88
  this.timer = setTimeout(this.btnA, 100);
}
  _menu = null;

  SsetMenuRef = ref => {
    this._menu = ref;
  };
  //        <ImageBackground source={require("./image/car4.jpeg")} style={{flex:1,width:null,height:null}}>
  
  render() { 
    
    // this.setState({element:[...this.props.navigation.state.params.elements]});
    // //let Render_View = this.state.element.=>{
    //   // this.socket.emit('input',this.state.element);
    //   let Render_A = this.state.element.map((item,key)=>{
    //     if(( key ) == 'a')
    //     {
    //         return(
    //           <View style={styles.btnXview}>
    //           <TouchableOpacity style={styles.btnRtouch} onPress={this.btnA} >
    //               <Image source={require("./image/a.png")} style={styles.btnRimage}></Image>
    //           </TouchableOpacity>
    //           </View> 
    //       );
    //     }
    //   });
    //   let Render_B = this.state.element.map((item,key)=>{
    //     if(( key ) == 'b')
    //     {
    //         return(
    //           <View style={styles.btnXview}>
    //           <TouchableOpacity style={styles.btnRtouch} onPress={this.btnA} >
    //               <Image source={require("./image/b.png")} style={styles.btnRimage}></Image>
    //           </TouchableOpacity>
    //           </View> 
    //       );
    //     }
    //   });
    
    /**
     * 
            <Text style={{color:'white'}}>{this.state.data_in}</Text>
            <View style={styles.btnXview}>
              <TouchableOpacity style={styles.btnXtouch} 
              onPressIn={this.btnX} onPressOut={this.stopTimer}>
                <Image source={require("./image/x.png")} style={styles.btnXimage}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.btnRview}>
            <TouchableOpacity 
              style={styles.btnRtouch} 
              onPressIn={this.btnR} onPressOut={this.stopTimer}>
                <Image source={require("./image/r.png")} style={styles.btnRimage}></Image>
              </TouchableOpacity>
            </View>
          </View>
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
              <TouchableOpacity style={styles.btnLEFTtouch} 
              onPressIn={this.btnDown} onPressOut={this.stopTimer}>
                <Image source={require("./image/down.png")} style={styles.btnLEFTimage}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnLEFTtouch} 
              onPressIn={this.btnRight} onPressOut={this.stopTimer}>
                <Image source={require("./image/right.png")} style={styles.btnLEFTimage}></Image>
              </TouchableOpacity>
          </View>

          <View style={styles.btnSHIFTview}>
            <View style={styles.btnLeftShiftview}>
              <TouchableOpacity style={styles.btnSHIFTtouch} 
              onPressIn={this.btnLeftShift} onPressOut={this.stopTimer}>
                <Image source={require("./image/shift.png")} style={styles.btnSHIFTimage}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.btnRightShiftview}>
            <TouchableOpacity style={styles.btnSHIFTtouch} 
            onPressIn={this.btnRightShift} onPressOut={this.stopTimer}>
                <Image source={require("./image/shift.png")} style={styles.btnSHIFTimage}></Image>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.lastView}>
            <View style={styles.btnCTRLview}>
              <TouchableOpacity style={styles.btnCTRLtouch} 
              onPressIn={this.btnLeftCtrl} onPressOut={this.stopTimer}>
                <Image source={require("./image/ctrl.png")} style={styles.btnCTRLimage}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.btnSPACEview}>
              <TouchableOpacity style={styles.btnSPACEtouch} 
              onPressIn={this.btnSpace} onPressOut={this.stopTimer}>
                <Image source={require("./image/space.png")} style={styles.btnSPACEimage}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.btnCTRLview}>
              <TouchableOpacity style={styles.btnCTRLtouch} 
              onPressIn={this.btnRightCtrl} onPressOut={this.stopTimer}>
                <Image source={require("./image/ctrl.png")} style={styles.btnCTRLimage}></Image>
              </TouchableOpacity>
            </View>
     */
    
    return (    
      <View style = {styles.mainContainer} >
        <View style={styles.cont2}>
        <View style={styles.firstFlex}>
          {this.state.renderview}
          </View>
        
        </View>
        <Text style={{color:"white"}}>{this.state.element}</Text>    
        <Text style={{color:"white"}}>{this.state.count}</Text>    
      </View>
    );
  }

  Render_View(){ 
    if(this.state.element.indexOf('a')){
      this.socket.emit("input","renderview");
      return(<View style={styles.btnXview}>
          <TouchableOpacity style={styles.btnRtouch} onPress={this.btnA} >
              <Image source={require("./image/a.png")} style={styles.btnRimage}></Image>
          </TouchableOpacity>
          </View>);
    }
  }
    //   if(this.state.element.indexOf('b')){
    //     newRender.push(<View style={styles.btnXview}>
    //       <TouchableOpacity style={styles.btnRtouch} onPress={this.btnB} >
    //           <Image source={require("./image/b.png")} style={styles.btnRimage}></Image>
    //       </TouchableOpacity>
    //       </View>);
    //   }
    //   if(this.state.element.indexOf('c')){
    //     newRender.push(<View style={styles.btnXview}>
    //       <TouchableOpacity style={styles.btnRtouch} onPress={this.btnC} >
    //           <Image source={require("./image/c.png")} style={styles.btnRimage}></Image>
    //       </TouchableOpacity>
    //       </View>);
    //   }
    // }
    // final_view(){
    //   //for(i=0 ; i<newRender.length(); ++i){
    //     return(
    //       {newRender}
    //     )
    //   //}
   // }
  

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
    height:80,
    width:420,
    resizeMode:"contain"
  },
  cont2:{
    flex: 2,
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



/**
 * <View style={styles.firstFlex}>
            <Text style={{color:'white'}}>{this.state.data_in}</Text>
            <View style={styles.btnXview}>
              <TouchableOpacity style={styles.btnXtouch} 
              onPressIn={this.btnX} onPressOut={this.stopTimer}>
                <Image source={require("./image/x.png")} style={styles.btnXimage}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.btnRview}>
            <TouchableOpacity 
              style={styles.btnRtouch} 
              onPressIn={this.btnR} onPressOut={this.stopTimer}>
                <Image source={require("./image/r.png")} style={styles.btnRimage}></Image>
              </TouchableOpacity>
            </View>
          </View>
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
              <TouchableOpacity style={styles.btnLEFTtouch} 
              onPressIn={this.btnDown} onPressOut={this.stopTimer}>
                <Image source={require("./image/down.png")} style={styles.btnLEFTimage}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnLEFTtouch} 
              onPressIn={this.btnRight} onPressOut={this.stopTimer}>
                <Image source={require("./image/right.png")} style={styles.btnLEFTimage}></Image>
              </TouchableOpacity>
          </View>

          <View style={styles.btnSHIFTview}>
            <View style={styles.btnLeftShiftview}>
              <TouchableOpacity style={styles.btnSHIFTtouch} 
              onPressIn={this.btnLeftShift} onPressOut={this.stopTimer}>
                <Image source={require("./image/shift.png")} style={styles.btnSHIFTimage}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.btnRightShiftview}>
            <TouchableOpacity style={styles.btnSHIFTtouch} 
            onPressIn={this.btnRightShift} onPressOut={this.stopTimer}>
                <Image source={require("./image/shift.png")} style={styles.btnSHIFTimage}></Image>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.lastView}>
            <View style={styles.btnCTRLview}>
              <TouchableOpacity style={styles.btnCTRLtouch} 
              onPressIn={this.btnLeftCtrl} onPressOut={this.stopTimer}>
                <Image source={require("./image/ctrl.png")} style={styles.btnCTRLimage}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.btnSPACEview}>
              <TouchableOpacity style={styles.btnSPACEtouch} 
              onPressIn={this.btnSpace} onPressOut={this.stopTimer}>
                <Image source={require("./image/space.png")} style={styles.btnSPACEimage}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.btnCTRLview}>
              <TouchableOpacity style={styles.btnCTRLtouch} 
              onPressIn={this.btnRightCtrl} onPressOut={this.stopTimer}>
                <Image source={require("./image/ctrl.png")} style={styles.btnCTRLimage}></Image>
              </TouchableOpacity>
            </View>
          </View>
 */