import React from 'react';
import { StyleSheet, Text, View, Dimensions ,TouchableOpacity,BackHandler} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Akira } from 'react-native-textinput-effects';
import Icon from "react-native-vector-icons/Ionicons";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

const {width: WIDTH} = Dimensions.get("window");
var empty = true;
export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
          data_in: "",
        };
      }
      
    /**
     * <TextInput style={styles.txtinput}
            style={styles.input} 
            placeholder="data_in" 
            autoCorrect={false} 
            onChangeText={(data_in)=>this.setState({data_in})} 
            onSubmitEditing={() => AsyncStorage.setItem('@storage_Key', this.state.data_in)}
            value={this.state.data_in}
        />
     */
    componentDidMount(){
      console.disableYellowBox = true;
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backtoPrevScreen); 
    }
    componentWillUnmount() {
      this.backHandler.remove();
      //this.socket.emit("chat message" ,"close");
      AsyncStorage.setItem('@storage_Key', " ");
    }

    _menu = null;

    setMenuRef = ref => {
      this._menu = ref;
    };
    backtoPrevScreen=()=>{
      //alert("back");
      //this.socket.emit("chat message" ,"close");
      AsyncStorage.setItem('@storage_Key', " ");
      this.props.navigation.navigate('Home');
      return true;
    }
    isEmpty=()=>{
      if(this.state.data_in != ''){
        empty = false;
      }
      else{
        empty = true;
      }
    }
    submit=()=>{
      this.isEmpty();
      if(!empty){
        AsyncStorage.setItem('@storage_Key', this.state.data_in);
      }
      else{
        alert("Please Enter IP Address.")
      }
    }
    controller=()=>{
      if(!empty){
        this.props.navigation.navigate('games');
      }
      else{
        alert("Please Enter IP Address.")
      }
    }
    mouse=()=>{
      if(!empty){
        this.props.navigation.navigate('mouse');
      }
      else{
        alert("Please Enter IP Address.")
      }
    }
  render() {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:'#0b132b'}}>
        <View style={{flex:1,flexDirection:"column",justifyContent:"center",width:300}}>
          <Akira
            label={'IP ADDRESS'}
            iconColor = 'white'
            borderColor={'#6fffe9'}
            inputPadding={16}
            inputStyle = {{color:'#6fffe9'}}
            labelHeight={24}  
            labelStyle={{ color: '#6fffe9' }}
            onChangeText={(data_in)=>this.setState({data_in})} 
            onSubmitEditing={this.submit}
            value={this.state.data_in}
          />
          <TouchableOpacity style={styles.btn} onPress={this.controller}>
            <Text>Controller</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.mouse}>
            <Text>Mouse</Text>
          </TouchableOpacity>
        </View>
      </View>
    );  
  }
  static navigationOptions = ({ navigation }) => {
    return {
        title: 'startPage',
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
                  }} textStyle={{fontSize: 16}} disabled>startPage</MenuItem>
                
                <MenuItem  onPress={() =>{
                  this._menu.hide()
                  navigation.navigate('mouse')
                  }} textStyle={{color: '#000',fontSize: 16}}>Mouse</MenuItem>
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
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      width:300,

      //alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      textAlign: "center",
      lineHeight: 30,
      marginTop: 8,
      fontSize: 32,
      fontWeight: '400',
      color: '#333333'
      },
    txtinput: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
    },
    btn :{
      backgroundColor: '#5bc0be',//'#F7F9F9',
      color: '#7F8C8D',
      height : 45,
      width:WIDTH*(0.4),
      borderRadius: 8,
      marginTop:10,
      alignItems:"center",
      justifyContent: "center",
    },
      
  });




// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   Dimensions
// } from 'react-native';

// import {createResponder} from 'react-native-gesture-responder';

// const {width, height} = Dimensions.get('window');

// export default class App extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       gestureState: {},
//       thumbSize: 100,
//       left: width / 2,
//       top: height / 2
//     }
//   }

//   componentWillMount() {
//     console.log('componentWillMount...');
//     this.gestureResponder = createResponder({
//       onStartShouldSetResponder: (evt, gestureState) => true,
//       onStartShouldSetResponderCapture: (evt, gestureState) => true,
//       onMoveShouldSetResponder: (evt, gestureState) => true,
//       onMoveShouldSetResponderCapture: (evt, gestureState) => true,

//       onResponderGrant: (evt, gestureState) => {
//         if(gestureState.doubleTapUp){
//           alert("grant press");
//         }
//       },
//       onResponderMove: (evt, gestureState) => {
//         if(gestureState.doubleTapUp){
//           alert("move press");
//         }
//         let thumbSize = this.state.thumbSize;
//         if (gestureState.pinch && gestureState.previousPinch) {
//           thumbSize *= (gestureState.pinch / gestureState.previousPinch)
//         }
//         let {left, top} = this.state;
//         left += (gestureState.moveX - gestureState.previousMoveX);
//         top += (gestureState.moveY - gestureState.previousMoveY);

//         this.setState({
//           gestureState: {
//             ...gestureState
//           },
//           left, top, thumbSize
//         })
//       },
//       onResponderTerminationRequest: (evt, gestureState) => true,
//       onResponderRelease: (evt, gestureState) => {
//         if(gestureState.doubleTapUp){
//           alert("release press");
//         }
//         this.setState({
//           gestureState: {
//             ...gestureState
//           }
//         })
//       },
//       onResponderTerminate: (evt, gestureState) => {
//         if(gestureState.doubleTapUp){
//           alert("terminate press");
//         }
//       },
//       onResponderSingleTapConfirmed: (evt, gestureState) => {
//         console.log('onResponderSingleTapConfirmed...' + JSON.stringify(gestureState));
        
//       },
//       debug: true
//     });
//   }

//   render() {
//     const thumbSize = this.state.thumbSize;
//     return (
//       <View
//         style={{flex: 1, backgroundColor: '#66ccff', padding: 20, alignItems: 'center', justifyContent: 'center'}}
//         {...this.gestureResponder}>

//         <LabelView
//           label='stateID'
//           value={this.state.gestureState.stateID}/>
//         <LabelView
//           label='moveX'
//           value={this.state.gestureState.moveX}/>
//         <LabelView
//           label='moveY'
//           value={this.state.gestureState.moveY}/>
//         <LabelView
//           label='previousMoveX'
//           value={this.state.gestureState.previousMoveX}/>
//         <LabelView
//           label='previousMoveY'
//           value={this.state.gestureState.previousMoveY}/>
//         <LabelView
//           label='x0'
//           value={this.state.gestureState.x0}/>
//         <LabelView
//           label='y0'
//           value={this.state.gestureState.y0}/>
//         <LabelView
//           label='dx'
//           value={this.state.gestureState.dx}/>
//         <LabelView
//           label='dy'
//           value={this.state.gestureState.dy}/>
//         <LabelView
//           label='vx'
//           value={this.state.gestureState.vx}/>
//         <LabelView
//           label='vy'
//           value={this.state.gestureState.vy}/>
//         <LabelView
//           label='singleTapUp'
//           value={this.state.gestureState.singleTapUp}/>
//         <LabelView
//           label='doubleTapUp'
//           value={this.state.gestureState.doubleTapUp}/>
//         <LabelView
//           label='pinch'
//           value={this.state.gestureState.pinch}/>
//         <LabelView
//           label='previousPinch'
//           value={this.state.gestureState.previousPinch}/>

//         <View
//           style={{
//           width: thumbSize,
//           height: thumbSize,
//           position: 'absolute',
//           left: this.state.left - thumbSize/2,
//           top: this.state.top - thumbSize/2,
//           backgroundColor: '#ffffff99',
//           alignItems: 'center',
//           justifyContent: 'center'
//           }}
//           pointerEvents='none'>
//           <Text >Move or Pinch</Text>
//         </View>

//       </View>
//     );
//   }
// }

// class LabelView extends Component {
//   render() {
//     return (
//       <View
//         style={{flexDirection: 'row', alignSelf: 'stretch'}}>
//         <Text style={{flex: 3, textAlign: 'right', marginRight: 10}}>{this.props.label}</Text>
//         <Text style={{flex: 7, textAlign: 'left', marginLeft: 10}}>{JSON.stringify(this.props.value)}</Text>
//       </View>
//     );
//   }
// }