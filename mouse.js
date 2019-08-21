import React, { Component } from 'react';
 
import { StyleSheet, View, TouchableOpacity, Text,Dimensions, PanResponder} from 'react-native';
import {createResponder} from 'react-native-gesture-responder'
import io from 'socket.io-client/dist/socket.io';//'socket.io-client';
import Icon from "react-native-vector-icons/Ionicons";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

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
        }
    }
    componentDidMount(){
        this.socket = io("http://192.168.43.136:8000");
        msg = height +  ' ' + width;
        this.socket.emit("width and hight" , msg);
    this.socket.on("send",msg=>{
      this.setState({rec:[...this.state.rec , msg]});
    });
    }
    componentWillMount()
    {
        
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
                this.socket.emit("text" , "true" );
                if(distx != 0 || disty != 0){
                    msg = String(distx) + ' ' +String(disty);
                    this.socket.emit("mouse location" , msg );
                    this.setState({prevdx : distx});
                    this.setState({prevdy : disty});
                    this.setState({release: false});
                }
                
                if(distx > -5 && distx < 5 && disty < 5 && disty > -5){
                    this.setState({counter: this.state.counter + 1});
                    this.socket.emit("text" , "counter1" );
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
                    this.socket.emit("text" , "counter2" );
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
            
          },
        
        onResponderRelease: (event, gestureState) =>
        {
            alert(gestureState.numberActiveTouches);
            this.socket.emit("text" , "release" );
            this.setState({
                 
                locationX: event.nativeEvent.locationX.toFixed(2), 
                
                locationY: event.nativeEvent.locationY.toFixed(2) ,
                release: true,
            });
            
            if(gestureState.doubleTapUp){
                this.socket.emit("click" , "doubleTap" );
            }
                //this.socket.emit("click" , "click" );
            
            
        }
      });
    }
    _menu = null;

    setMenuRef = ref => {
      this._menu = ref;
    };


    render()
    {
        return(
            <View style = { styles.MainContainer }>
 
                <View style = { styles.childView }>   
 
                    <View style = {[ styles.point, { top: parseFloat( this.state.locationY), left: parseFloat( this.state.locationX)}]} />
 
                    <View style = {{ flex: 1, backgroundColor: 'transparent' }}  { ...this.gestureResponder} />

                    
                </View>
                
            </View>
        );
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Mouse',
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
                      }} textStyle={{fontSize: 16}} disabled>Mouse</MenuItem>
                    <MenuItem onPress={() => {
                      this._menu.hide()
                      navigation.navigate('Home')
                      }} textStyle={{color: '#000', fontSize: 16}}>startPage</MenuItem>
                    
                    <MenuItem onPress={() =>{
                      this._menu.hide()
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
        flex: 1,
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
        backgroundColor: '#263238',
    },
 
    childView:
    {
        flex: 1,
        backgroundColor: '#263238',
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
        height: 5,
        width: 5,
        position: 'absolute',
        //borderRadius: 15,
        backgroundColor: '#FF3D00'
    }
});

