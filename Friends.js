import React, { Component } from "react";
import {AppRegistry, BackHandler, View , StyleSheet, ScrollView,Image, Dimensions , Alert,TouchableOpacity, Text } from "react-native";

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

//const { navigation } = this.props;
export default class App extends Component {
  constructor(){
    super();
    this.state = { 
      data_in: "",
      rec:[],
      element:[],

      data: {x: 0,
            y: 0,
            z: 0,
          },     
      number:0,
    };
    this.timer = null;
    this.btnA = this.btnA.bind(this);
    this.btnB = this.btnB.bind(this);
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
    console.disableYellowBox = true;
    Orientation.lockToLandscape();
    const ip = String(await AsyncStorage.getItem('@storage_Key'));
    var ipaddr = 'http://'+ ip + ':8000';
    this.setState({data_in : ipaddr});
    this.socket = io("http://192.168.43.136:8000");
    //this.socket = io(this.state.data_in);

    // this.setState({element:String(await AsyncStorage.getItem('elements'))});
    // if(this.state.element.length){
    //   this.socket.emit("input",this.state.element);
    // }
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
    const { navigation } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener('didFocus', () => {
      if(this.props.navigation.state.params != null){
        const str = JSON.stringify(this.props.navigation.state.params);
        this.socket.emit("input",str);
        var phone_no;
        JSON.parse(str, (key,value) => {
          var s = str.split("\"");
          if(s.split("\"") == 'elements'){
            var a = s.split("[");
            //var a=JSON.stringify(this.state.element);
            //a.push(value);
            this.setState({element:a});
            this.socket.emit("input",element);//JSON.stringify(this.state.element));
          } 
          else if(key == 'addRemove'){
            this.socket.emit("input",value);
          }
          else{
            //this.socket.emit("input",value);
          }
        })  
        //this.afterNavigation()
      }
    });
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
    this.setState({elem : 'c'});
    this.setState({element:[...this.state.elem]})
 //   this.props.navigation('Friends', this.state.element)
}
btnD=()=>{
    this.setState({elem : 'd'});
    this.setState({element:[...this.state.elem]})
   // this.props.navigation('Friends', this.state.element)
}
btnE=()=>{
    this.setState({elem : 'e'});
    this.setState({element:[...this.state.elem]})
    //this.props.navigation('Friends', this.state.element)
}
btnF=()=>{
    this.setState({elem : 'f'});
    this.setState({element:[...this.state.elem]})
    //this.props.navigation('Friends', this.state.element)
}
btnG=()=>{
    this.setState({elem : 'g'});
    this.setState({element:[...this.state.elem]})
   // this.props.navigation('Friends', this.state.element)
}
btnH=()=>{
    this.setState({elem : 'h'});
    this.setState({element:[...this.state.elem]})
    //this.props.navigation('Friends', this.state.element)
}
btnI=()=>{
    this.setState({elem : 'i'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnJ=()=>{
    this.setState({elem : 'j'});
    this.setState({element:[...this.state.elem]})
    ///navigate('Friends', {element})
}
btnK=()=>{
    this.setState({elem : 'k'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnL=()=>{
    this.setState({elem : 'l'});
    this.setState({element:[...this.state.elem]})
   // navigate('Friends', {element})
}
btnM=()=>{
    this.setState({elem : 'm'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnN=()=>{
    this.setState({elem : 'n'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnO=()=>{
    this.setState({elem : 'o'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnP=()=>{
    this.setState({elem : 'p'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnQ=()=>{
    this.setState({elem : 'q'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnR=()=>{
    this.setState({elem : 'r'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnS=()=>{
    this.setState({elem : 's'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnT=()=>{
    this.setState({elem : 't'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnU=()=>{
    this.setState({elem : 'u'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnV=()=>{
    this.setState({elem : 'v'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnW=()=>{
    this.setState({elem : 'w'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnX=()=>{
    this.setState({elem : 'x'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnY=()=>{
    this.setState({elem : 'y'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnZ=()=>{
    this.setState({elem : 'z'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
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
    this.setState({elem : 'enter'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnDelete=()=>{
    this.setState({elem : 'delete'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnEsc=()=>{
    this.setState({elem : 'escape'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
}
btnAlt=()=>{
    this.setState({elem : 'alt'});
    this.setState({element:[...this.state.elem]})
   // navigate('Friends', {element})
}
btnBackspace=()=>{
    this.setState({elem : 'backspace'});
    this.setState({element:[...this.state.elem]})
    //navigate('Friends', {element})
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
    

    return (    
      <View style = {styles.mainContainer} >
        <View style={styles.cont2}>
        <View style={styles.firstFlex}>
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