import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Chats from '../screens/Chats';

const MyStackNavigator = createStackNavigator({
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    Home: {
        screen: Home
    },
    Chats: {
        screen: Chats
    },
    initialRouteName: 'Home'
})
const HomeContainer = createAppContainer(MyStackNavigator)
export default HomeContainer