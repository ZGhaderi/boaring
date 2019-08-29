import React, { Component } from "react";
import {AppRegistry, PanResponder, View , StyleSheet, Animated, Dimensions,Button , Image,TouchableOpacity, Text } from "react-native";

//const CIRCLE_RADIUS = 36;
const Window = Dimensions.get('window');
export default class Viewport extends Component{
    constructor(props){
        super(props);
    
        this.state = {
            showDraggable   : true,     //Step 1
            dropZoneValues  : null,
            pan             : new Animated.ValueXY()
        };
    
        this.panResponder = PanResponder.create({    //Step 2
            onStartShouldSetPanResponder : () => true,
            onPanResponderMove : Animated.event([null,{ //Step 3
                dx : this.state.pan.x,
                dy : this.state.pan.y
            }]),
            onPanResponderRelease : (e, gesture) => {
                if(this.isDropZone(gesture)){ //Step 1
                    this.setState({
                        showDraggable : true //Step 3
                    });
                }else{
                    Animated.spring(
                        this.state.pan,
                        {toValue:{x:0,y:0}}
                    ).start();
                }
            }
        });
    }
    isDropZone(gesture){     //Step 2
        var dz = this.state.dropZoneValues;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }
    setDropZoneValues(event){      //Step 1
        this.setState({
            dropZoneValues : event.nativeEvent.layout
        });
    }
    render(){
        return (
            <View style={styles.mainContainer}>
                <View 
                    onLayout={this.setDropZoneValues.bind(this)}   
                    style={styles.dropZone}>
                    <Text style={styles.text}>Drop me here!</Text>
                </View>
    
                {this.renderDraggable()}
            </View>
        );
    }
    renderDraggable(){
        if(this.state.showDraggable){     
            return (
                <View style={styles.draggableContainer}>                
                <Animated.View 
                    {...this.panResponder.panHandlers}                       
                    style={[this.state.pan.getLayout(), styles.btnRview]}>    
                    
                    
                </Animated.View>
            </View>
        );
    }
}
}

const styles = StyleSheet.create({
    mainContainer: {
        flex    : 1
    },
    dropZone    : {
        height         : 200,
        backgroundColor:'#2c3e50'
    },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height/2 - 36,
        left        : Window.width/2 - 36,
    },
    circle      : {
        backgroundColor     : '#1abc9c',
        width               : 36*2,
        height              : 36*2,
        borderRadius        : 36
    },
    btnRview:{
        flex:1,
        marginHorizontal:30,
        marginTop:50,
        // justifyContent:"center",
        // alignItems:"flex-end"
      },
    btnRtouch:{
        // justifyContent:"center",
        borderRadius:15,
        marginHorizontal:5,
        marginVertical:5
      },
      btnRimage:{
        height:70,
        width:70,
        resizeMode:"contain"
      },
});