import React, { Component } from "react";
import {AppRegistry, BackHandler, View , StyleSheet, ScrollView,Image, Dimensions , Alert,TouchableOpacity, Text } from "react-native";
import CheckBox from 'react-native-check-box'
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
        element:[],
      data_in: "",
      rec:[],
      elem:"",
      data: {x: 0,
            y: 0,
            z: 0,
          },     
      number:0,
    };
 }
 

 componentDidMount() {
    Orientation.lockToLandscape();
   
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
    //this.socket.emit("chat message" ,"close");
    this.props.navigation.navigate('Home');
    return true;
  }
 

btnA=()=>{
    var a = this.state.element;
    a.push('a');
    this.setState({element: a});
}
btnB=()=>{
    var a = this.state.element;
    a.push('b');
    this.setState({element: a});
}
btnC=()=>{
    var a = this.state.element;
    a.push('c');
    this.setState({element: a});
}
btnD=()=>{
    var a = this.state.element;
    a.push('d');
    this.setState({element: a});
}
btnE=()=>{
    var a = this.state.element;
    a.push('e');
    this.setState({element: a});
}
btnF=()=>{
    var a = this.state.element;
    a.push('f');
    this.setState({element: a});
}
btnG=()=>{
    var a = this.state.element;
    a.push('g');
    this.setState({element: a});
}
btnH=()=>{
    var a = this.state.element;
    a.push('h');
    this.setState({element: a});
}
btnI=()=>{
    var a = this.state.element;
    a.push('i');
    this.setState({element: a});
}
btnJ=()=>{
    var a = this.state.element;
    a.push('j');
    this.setState({element: a});
}
btnK=()=>{
    var a = this.state.element;
    a.push('k');
    this.setState({element: a});
}
btnL=()=>{
    var a = this.state.element;
    a.push('l');
    this.setState({element: a});
}
btnM=()=>{
    var a = this.state.element;
    a.push('m');
    this.setState({element: a});
}
btnN=()=>{
    var a = this.state.element;
    a.push('n');
    this.setState({element: a});
}
btnO=()=>{
    var a = this.state.element;
    a.push('o');
    this.setState({element: a});
}
btnP=()=>{
    var a = this.state.element;
    a.push('p');
    this.setState({element: a});
}
btnQ=()=>{
    var a = this.state.element;
    a.push('q');
    this.setState({element: a});
}
btnR=()=>{
    var a = this.state.element;
    a.push('r');
    this.setState({element: a});
}
btnS=()=>{
    var a = this.state.element;
    a.push('s');
    this.setState({element: a});
}
btnT=()=>{
    var a = this.state.element;
    a.push('t');
    this.setState({element: a});
}
btnU=()=>{
    var a = this.state.element;
    a.push('u');
    this.setState({element: a});
}
btnV=()=>{
    var a = this.state.element;
    a.push('v');
    this.setState({element: a});
}
btnW=()=>{
    var a = this.state.element;
    a.push('w');
    this.setState({element: a});
}
btnX=()=>{
    var a = this.state.element;
    a.push('x');
    this.setState({element: a});
}
btnY=()=>{
    var a = this.state.element;
    a.push('y');
    this.setState({element: a});
}
btnZ=()=>{
    var a = this.state.element;
    a.push('z');
    this.setState({element: a});
}
btnUp=()=>{
    var a = this.state.element;
    a.push('up');
    this.setState({element: a});
}
btnDown=()=>{
    var a = this.state.element;
    a.push('down');
    this.setState({element: a});
}
btnLeft=()=>{
    var a = this.state.element;
    a.push('left');
    this.setState({element: a});
}
btnRight=()=>{
    var a = this.state.element;
    a.push('right');
    this.setState({element: a});
}
btnDelete=()=>{
    var a = this.state.element;
    a.push('delete');
    this.setState({element: a});
}
btnEsc=()=>{
    var a = this.state.element;
    a.push('escape');
    this.setState({element: a});
}
btnAlt=()=>{
    var a = this.state.element;
    a.push('alt');
    this.setState({element: a});
}
btnBackspace=()=>{
    var a = this.state.element;
    a.push('backspace');
    this.setState({element: a});
}
btnSpace=()=>{
    var a = this.state.element;
    a.push('space');
    this.setState({element: a});
}
btnEnter=()=>{
    var a = this.state.element;
    a.push('enter');
    this.setState({element: a});
}
btnLeftCtrl=()=>{
    var a = this.state.element;
    a.push('LCTRL');
    this.setState({element: a});
}
btnRightCtrl=()=>{
    var a = this.state.element;
    a.push('RCTRL');
    this.setState({element: a});
}
btnLeftShift=()=>{
    var a = this.state.element;
    a.push('LSHIFT');
    this.setState({element: a});
}
btnRightShift=()=>{
    var a = this.state.element;
    a.push('right_shift');
    this.setState({element: a});
}
btnPublish=()=>{
    //this.props.navigation.navigate('Map',{refresh : this.state.phone_no, addRemove: "add"});
    var a = [];
    a.push(this.state.element);
    AsyncStorage.setItem('elements', JSON.stringify(this.state.element));
    
    this.props.navigation.navigate('Friends');
    //this.props.navigation.navigate('Friends',{elements : a,addRemove:"add"});
}


  _menu = null;

  SsetMenuRef = ref => {
    this._menu = ref;
  };
  //        <ImageBackground source={require("./image/car4.jpeg")} style={{flex:1,width:null,height:null}}>
/**
 * 
            <Text style={{color:'white'}}>{this.state.data_in}</Text>
            <View style={styles.btnXview}>

            
            
            
            
 */
  render() {  
    return (    
      <View style = {styles.mainContainer} >
        <View style={styles.cont2}>
        <ScrollView>

          <View style={styles.firstFlex}>
          <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnA} >
                <Image source={require("./image/a.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnB} >
                <Image source={require("./image/b.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnC} >
                <Image source={require("./image/c.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnD} >
                <Image source={require("./image/d.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnE} >
                <Image source={require("./image/e.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnF} >
                <Image source={require("./image/f.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnG} >
                <Image source={require("./image/g.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnH} >
                <Image source={require("./image/h.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnI} >
                <Image source={require("./image/i.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            </View>
            <View style={styles.firstFlex}>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnJ} >
                <Image source={require("./image/j.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnK} >
                <Image source={require("./image/k.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnL} >
                <Image source={require("./image/l.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnM} >
                <Image source={require("./image/m.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnN} >
                <Image source={require("./image/n.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnO} >
                <Image source={require("./image/o.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnP} >
                <Image source={require("./image/p.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnQ} >
                <Image source={require("./image/q.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnR} >
                <Image source={require("./image/r.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            </View>
            <View style={styles.firstFlex}>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnS} >
                <Image source={require("./image/s.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnT} >
                <Image source={require("./image/t.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnU} >
                <Image source={require("./image/u.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnV} >
                <Image source={require("./image/v.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnW} >
                <Image source={require("./image/w.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnX} >
                <Image source={require("./image/x.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnY} >
                <Image source={require("./image/y.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnZ} >
                <Image source={require("./image/z.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            </View>


            <View style={styles.firstFlex}>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnLeftCtrl} >
                <Image source={require("./image/ctrl.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnUp} >
                <Image source={require("./image/up.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnDown} >
                <Image source={require("./image/down.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnLeft} >
                <Image source={require("./image/left.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnRight} >
                <Image source={require("./image/right.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnDelete} >
                <Image source={require("./image/delete.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnLeftCtrl} >
                <Image source={require("./image/ctrl.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            </View>


            <View style={styles.firstFlex}>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnLeftShift} >
                <Image source={require("./image/shift.png")} style={styles.btnSHIFTimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnSpace} >
                <Image source={require("./image/space.png")} style={styles.btnSPACEimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnLeftShift} >
                <Image source={require("./image/shift.png")} style={styles.btnSHIFTimage}></Image>
            </TouchableOpacity>
            </View>
            </View>

            <View style={styles.firstFlex}>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnEsc} >
                <Image source={require("./image/esc.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnBackspace} >
                <Image source={require("./image/backspace.png")} style={styles.btnSHIFTimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnEnter} >
                <Image source={require("./image/enter.png")} style={styles.btnSHIFTimage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.btnXview}>
            <TouchableOpacity style={styles.btnRtouch} onPress={this.btnAlt} >
                <Image source={require("./image/alt.png")} style={styles.btnRimage}></Image>
            </TouchableOpacity>
            </View>
            </View>
            <View style={styles.firstFlex}>
                <View style={styles.btnPublishview}>
                <Text>{JSON.stringify(this.state.element)}</Text>
                </View>
            <View style={styles.btnPublishview}>
            <TouchableOpacity style={styles.btnPublish} onPress={this.btnPublish} >
                <Text>Publish</Text>
            </TouchableOpacity>
            </View>
            </View>
            </ScrollView>
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
    // flexDirection:"row",
    // justifyContent:"space-between"
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
    marginHorizontal:5,
    marginTop:5,
    justifyContent:"center",
    alignItems:"flex-start"
  },
  btnPublishview:{
    flex:1,
    marginHorizontal:5,
    marginTop:5,
    backgroundColor:"#6fffe9",
    justifyContent:"center",
    alignItems:"center"
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
    alignSelf:"center",
    marginHorizontal:5,
    marginVertical:5
  },
  btnPublish:{
    justifyContent:"center",
    borderRadius:15,
    backgroundColor:"#6fffe9",
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
    width:120,
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
    width:250,
    resizeMode:"contain",
    marginRight: 30,
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