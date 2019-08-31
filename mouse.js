import React, { Component } from 'react';
 
import { StyleSheet, View, BackHandler,TouchableOpacity, Image,Dimensions, TextInput} from 'react-native';
import {createResponder} from 'react-native-gesture-responder'
import io from 'socket.io-client/dist/socket.io';//'socket.io-client';
import Icon from "react-native-vector-icons/Ionicons";
import EntypoIcon from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from "@react-native-community/async-storage";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Akira } from 'react-native-textinput-effects';

//import { TextInput } from 'react-native-gesture-handler';

const {height,width}=Dimensions.get('window');

//const height = Dimensions.get(window).height;
//const width =  Dimensions.get(window).width;
export default class mouse extends Component
{
    constructor()
    {
        super();
 
        this.panResponder;
 
        this.state = { 
          locationArray : [],
            locationX: 0, 
            release: false,
            locationY: 0 ,
            prevdx: 0,
            prevdy: 0,
            counter: 0,
            data_in: "",
            inputtxt:"",
        }
        this.timer = null;
        this.scrollUp = this.scrollUp.bind(this);
        this.scrollDown = this.scrollDown.bind(this);
        this.btnLeft = this.btnLeft.bind(this);
        this.btnRight = this.btnRight.bind(this);
        this.volumx = this.volumx.bind(this);
        this.volumUp = this.volumUp.bind(this);
        this.volumDown = this.volumDown.bind(this);
        this.brightnessUp = this.brightnessUp.bind(this);
        this.brightnessDown = this.brightnessDown.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }
    async componentDidMount(){
      const ip = String(await AsyncStorage.getItem('@storage_Key'));
      var ipaddr = 'http://'+ ip + ':8000';
      this.setState({data_in : ipaddr});
      this.socket = io(this.state.data_in);
      //this.socket = io("http://192.168.43.136:8000");
      msg = height +  ' ' + width;
      this.socket.emit("width and hight" , msg);
      // this.socket.on("send",msg=>{
      //   this.setState({rec:[...this.state.rec , msg]});
      // });
      
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backtoPrevScreen);  
    }

    UNSAFE_componentWillMount()
    {
      var tap2 = false;
      this.gestureResponder = createResponder(
      {
        onStartShouldSetResponder: (event, gestureState) => {
            this.socket.emit("text" , "start" );
            return true;
        },
      
        onStartShouldSetResponderCapture: (event, gestureState) => {
            this.socket.emit("text" , "startCapture" );
            return true;
        },
      
        onMoveShouldSetResponder: (event, gestureState) => {
            this.socket.emit("text" , "movepan" );
            return true;
        },
 
        onMoveShouldSetResponderCapture: (event, gestureState) => {
            this.socket.emit("text" , "capture" );
            return false;
        },
 
        onResponderGrant: (event, gestureState) => {
          if(tap2){
            this.socket.emit("grant" , "grant" );
          }
            this.setState({initx : this.state.locationX});
            this.setState({inity : this.state.locationY});
            this.socket.emit("text" , "grant" );
            this.setState({counter: 0});
            if(gestureState.singleTapUp){
                this.socket.emit("text" , "click" );
            }
            return false;
        },
       // onPanResponderMove: (event, gestureState) => true,
        onResponderMove: (event, gestureState) => {
            this.socket.emit("text" , "move" );
            this.setState({
                 
              locationX: event.nativeEvent.locationX.toFixed(2), 
              
              locationY: event.nativeEvent.locationY.toFixed(2) ,
              
          });
            // if(this.state.release == true){
            //     this.setState({initx : this.state.locationX});
            //     this.setState({inity : this.state.locationY});
            //     this.setState({release : false});
            // }
            // this.setState({
                 
            //     locationX: event.nativeEvent.locationX.toFixed(2), 
                
            //     locationY: event.nativeEvent.locationY.toFixed(2) ,
            // });
            
            var distx = gestureState.dx;
            var disty = gestureState.dy;
            if(this.state.release == true){
                //this.socket.emit("text" , "true" );
                if(distx != 0 || disty != 0){
                    msg = String(distx) + ' ' +String(disty);
                    this.socket.emit("mouse location" , msg );
                    this.setState({prevdx : distx});
                    this.setState({prevdy : disty});
                    this.setState({release: false});
                }
                3
                if(distx > -5 && distx < 5 && disty < 5 && disty > -5){
                    this.setState({counter: this.state.counter + 1});
                    //this.socket.emit("text" , "counter1" );
                }
                if(gestureState.singleTapUp){
                    this.socket.emit("text" , "click" );
                    
                }
                //alert(JSON.stringify( gestureState));
            }    
            else{
                if(distx-this.state.prevdx != 0 || disty-this.state.prevdy != 0){
                    msg = String(distx - this.state.prevdx) + ' ' + String(disty - this.state.prevdy);
                    this.socket.emit("mouse location" , msg );
                    this.setState({prevdx : distx});// - this.state.prevdx});
                    this.setState({prevdy : disty});// - this.state.prevdy});
                }
                 if(distx - this.state.prevdx > -5 && distx - this.state.prevdx <5 && disty - this.state.prevdy <5 && disty - this.state.prevdy > -5){
                    this.setState({counter: this.state.counter + 1});
                   // this.socket.emit("text" , "counter2" );
                }
            }

            // var distx = gestureState.dx;//this.state.locationX - this.state.initx;
            // var disty = gestureState.dy;//this.state.locationY - this.state.inity;
            // this.setState({initx: this.state.locationX , inity : this.state.locationY});
            // if(distx != 0 || disty != 0){
            //     msg = String(distx) + ' ' +String(disty);
            //     this.socket.emit("mouse location" , msg );
            // }
            //msg = event.nativeEvent.locationX.toFixed(2) + " " + event.nativeEvent.locationY.toFixed(2);
            //this.socket.emit("mouse location" , msg );
            return true;
          },
          onResponderSingleTapConfirmed: (evt, gestureState) => {
            this.socket.emit("click" , "singleTap" );
            this.socket.emit("text" , "singleTap" );
            
          },
        
          onResponderRelease: (event, gestureState) =>
          {
            if(tap2){
              this.socket.emit("release" , "release" );
              tap2 = false;
            }
            // alert(gestureState.numberActiveTouches);
            this.socket.emit("text" , "release" );
            this.setState({
                 
                locationX: event.nativeEvent.locationX.toFixed(2), 
                
                locationY: event.nativeEvent.locationY.toFixed(2) ,
                release: true,
            });
            
            if(gestureState.doubleTapUp){
                tap2 = true;
                this.socket.emit("click" , "doubleTap" );
                this.socket.emit("text" , "doubleTap" );
            }
                //this.socket.emit("click" , "click" );
            
            
        }
      });
    }
    
  componentWillUnmount() {
    this.backHandler.remove();
    this.socket.emit("chat message" ,"close");
  }
  
  backtoPrevScreen=()=>{
    //alert("back");
    this.socket.emit("chat message" ,"close");
    this.props.navigation.navigate('Home');
    return true;
  }
    stopTimer=()=>{
      clearTimeout(this.timer);
    }
    btnRightClick=()=>{
      //alert("press");
      this.socket.emit("click" , "rightClick" );
    }
    btnLeft=()=>{
      this.socket.emit("click" , "left" );
      this.timer = setTimeout(this.btnLeft, 100);
    }
    btnRight=()=>{
      this.socket.emit("click" , "right" );
      this.timer = setTimeout(this.btnRight, 100);
    }
    btnRestart=()=>{
      this.socket.emit("click" , "restart" );
    }
    btnShutdown=()=>{
      this.socket.emit("click" , "shutdown" );
    }
    txtinput=()=>{
      this.socket.emit("input" ,  );
    }
    scrollUp=()=>{
      this.socket.emit("scroll" ,'up');
      this.timer = setTimeout(this.scrollUp, 100);
    }
    scrollDown=()=>{
      this.socket.emit("scroll" ,'down');
      this.timer = setTimeout(this.scrollDown, 100);
    }
    volumx=()=>{
      this.socket.emit("volum" ,'x');
      this.timer = setTimeout(this.volumx, 100);
    }
    volumUp=()=>{
      this.socket.emit("volum" ,'up');
      this.timer = setTimeout(this.volumUp, 100);
    }
    volumDown=()=>{
      this.socket.emit("volum" ,'down');
      this.timer = setTimeout(this.volumDown, 100);
    }
    brightnessUp=()=>{
      this.socket.emit("brightness" ,'up');
      this.timer = setTimeout(this.brightnessUp, 100);
    }
    brightnessDown=()=>{
      this.socket.emit("brightness" ,'down');
      this.timer = setTimeout(this.brightnessDown, 100);
    }
    _menu = null;

    setMenuRef = ref => {
      this._menu = ref;
    };

      /**
       * <View style = { styles.MainContainer }>    
              
              <View style = { styles.childView }>             
                <View style = {[ styles.point, { top: parseFloat( this.state.locationY), left: parseFloat( this.state.locationX)}]} />
                <View style = {{ flex: 1, backgroundColor: 'transparent' }}  { ...this.gestureResponder} /> 
              </View>
              <View style={{flex: 1, flexDirection:"row",backgroundColor:"#0b132b"}}>  
                <TouchableOpacity onPress={this.btnShutdown} style={{flexDirection:"row",marginRight:20,alignItems:'stretch'}}>
                  <Icon name="power-settings-new" size={50} color={'#6fffe9'} 
                        style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.btnRestart} style={{flexDirection:"row",marginRight:20,alignItems:'stretch'}}>
                  <Icon name="restart" size={50} color={'#6fffe9'} 
                        style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.btnLeft} style={{flexDirection:"row",marginRight:20,alignItems:'stretch'}}>
                  <Icon name="angle-left" size={50} color={'#6fffe9'} 
                        style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.btnRight} style={{flexDirection:"row",marginRight:20,alignItems:'stretch'}}>
                  <Icon name="angle-right" size={50} color={'#6fffe9'} 
                        style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.btnRightClick} style={{flexDirection:"row",marginRight:20,alignItems:'stretch'}}>
                  <Icon name="cursor-pointer" size={50} color={'#6fffe9'} 
                        style={{alignSelf:'center'}} />
                </TouchableOpacity>
               
                <TextInput style={{flexDirection:"row",marginRight:20,alignItems:'stretch',height: 40,backgroundColor: 'azure', fontSize: 20}}  
                    placeholder="Type here!"  
                    onChangeText={(inputtxt)=>this.setState({inputtxt})}  
                    onSubmitEditing={() => this.socket.emit("input" ,this.state.inputtxt)}
                    value={this.state.inputtxt}/>
              </View>

          </View>
          
        
       */
      
     //resizeMode='contain'
    render()
    {
        return(
          <View style={{flex:1,flexDirection:"row",}}>
            <View style={styles.MainContainer}>
              <View style = { styles.childView }>             
                <View style = {[ styles.point, { top: parseFloat( this.state.locationY), left: parseFloat( this.state.locationX)}]} />
                <View style = {{ flex: 1, backgroundColor: 'transparent' }}  { ...this.gestureResponder} /> 
              </View>
              <View style={{flex: 1, flexDirection:"row",backgroundColor:"#0b132b"}}>  
                <TouchableOpacity onPress={this.btnShutdown} style={{flexDirection:"row",marginRight:20,alignItems:'stretch'}}>
                  <Icon name="ios-power" size={35} color={'#6fffe9'} style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.btnRestart} style={{flexDirection:"row",marginRight:20,alignItems:'stretch'}}>
                  <Icon name="ios-refresh" size={35} color={'#6fffe9'} 
                        style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity onPressIn={this.btnLeft} onPressOut={this.stopTimer} style={{flexDirection:"row",marginRight:20,alignItems:'stretch'}}>
                  <EntypoIcon name="angle-left" size={35} color={'#6fffe9'} 
                        style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity onPressIn={this.btnRight} onPressOut={this.stopTimer} style={{flexDirection:"row",marginRight:20,alignItems:'stretch'}}>
                  <EntypoIcon name="angle-right" size={35} color={'#6fffe9'} 
                        style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.btnRightClick} style={{flexDirection:"row",marginRight:20,alignItems:'stretch'}}>
                  <MaterialCommunityIcons name="cursor-default-outline" size={35} color={'#6fffe9'} 
                        style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.volumx} style={{flexDirection:"row",marginRight:20,alignItems:'stretch'}}>
                  <Feather name="volume-x" size={35} color={'#6fffe9'} 
                        style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.volumUp} style={{flexDirection:"row",marginRight:20,alignItems:'stretch'}}>
                  <Feather name="volume-1" size={35} color={'#6fffe9'} 
                        style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.volumDown} style={{flexDirection:"row",marginRight:20,alignItems:'stretch'}}>
                  <Feather name="volume-2" size={35} color={'#6fffe9'} 
                        style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.brightnessUp} style={{flexDirection:"row",marginRight:20,alignItems:'stretch'}}>
                  <MaterialCommunityIcons name="brightness-5" size={35} color={'#6fffe9'} 
                        style={{alignSelf:'center'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.brightnessDown} style={{flexDirection:"row",marginRight:20,alignItems:'stretch'}}>
                  <MaterialCommunityIcons name="brightness-7" size={35} color={'#6fffe9'} 
                        style={{alignSelf:'center'}} />
                </TouchableOpacity>

                <TextInput style={{flexDirection:"row",marginRight:20,alignItems:'stretch',height: 40,backgroundColor: 'azure', fontSize: 20}}  
                    placeholder="Type here!"  
                    onChangeText={(inputtxt)=>this.setState({inputtxt})}  
                    onSubmitEditing={() => this.socket.emit("input" ,this.state.inputtxt)}
                    value={this.state.inputtxt}/>
              </View>

          </View>
            <View style={{flex:1,backgroundColor:"#0b132b",justifyContent:"space-between"}}>
            <TouchableOpacity onPressIn={this.scrollUp} onPressOut={this.stopTimer} style={{flexDirection:"row",alignItems:'stretch'}}>
                <AntDesign name="up" size={50} color={'#6fffe9'} style={{alignSelf:'center'}} />
            </TouchableOpacity>
            <TouchableOpacity onPressIn={this.scrollDown} onPressOut={this.stopTimer} style={{flexDirection:"row",alignItems:'stretch'}}>
                <AntDesign name="down" size={50} color={'#6fffe9'} style={{alignSelf:'center'}} />
            </TouchableOpacity>
            </View>
            </View>
        );
    }
    /**
     * 
     */
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Mouse',
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
                      }} textStyle={{fontSize: 16}} disabled>Mouse</MenuItem>
                    <MenuItem onPress={() => {
                      this._menu.hide()
                      //this.socket.emit("chat message" ,"close");
                      navigation.navigate('Home')
                      }} textStyle={{color: '#000', fontSize: 16}}>startPage</MenuItem>
                    
                    <MenuItem onPress={() =>{
                      this._menu.hide()
                      //this.socket.emit("chat message" ,"close");
                      navigation.navigate('Friends')
                      }}  textStyle={{color: '#000', fontSize: 16}}>controller</MenuItem>
                </Menu>
              </View>
            ),
          }
        }
}
/**<View style={{flexDirection:"row"}}>
                <TouchableOpacity style={{height:100,width:150,backgroundColor: '#263238',justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}} 
                        onPressIn={this.btnRightShift} onPressOut={this.stopTimer}>
                        <Image source={require("./image/shift.png")} style={{height:100,width:150,resizeMode:"contain"}}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{height:100,width:150,backgroundColor: '#263238',justifyContent:"center",borderRadius:15,marginHorizontal:5,marginVertical:5}} 
                        onPressIn={this.btnRightShift} onPressOut={this.stopTimer}>
                        <Image source={require("./image/shift.png")} style={{height:100,width:150,resizeMode:"contain"}}></Image>
                </TouchableOpacity>    
                </View> */
 
const styles = StyleSheet.create(
{
    MainContainer:
    {
        flex: 15,
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
        backgroundColor: '#0b132b',
        //flexDirection:"column-reverse",
        //flexDirection: "row",
    },
 
    childView:
    {
        flex: 9,
        flexDirection:"row",
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },
    childView2:
    {
        flex: 9,
        flexDirection:"row",
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },

    btnView:
    {
        flex: 1,
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },
 
    text:
    {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        padding: 8,
        backgroundColor: '#607D8B',
    },
 
    point:
    {
        height: 20,
        width: 20,
        position: 'absolute',
        borderRadius: 15,
        backgroundColor: '#6fffe9'
    }
});

