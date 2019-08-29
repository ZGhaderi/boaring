import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
  import {Icon} from 'react-native-vector-icons'
  import Home from './Home';
  import Friends from './Friends';
  import mouse from './mouse';
  import elements from './elements';
  import drag from './drag';
  const rootstack = createStackNavigator({
    
    Home: { 
        screen: Home ,
        },
    Friends: { 
        screen: Friends
        },
        mouse: { 
          screen: mouse
          },
    elements: {
        screen: elements
          }, 
          drag: {
            screen: drag
              },
      },
    
      // {
      //   navigationOptions: {
      //     headerVisible: false,
      //   }
      //  }
  )
  
const AppNavigator = createAppContainer(rootstack);
  export default AppNavigator;