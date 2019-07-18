import { createStackNavigator, createAppContainer } from 'react-navigation';
import Auth from '../components/Auth'
import Login from '../screens/Login2';
import Register from '../screens/Register2';
import Home from '../screens/Home';
import Chat from '../screens/Chat';
import Chatting from '../components/Chatting';

const MyStackNavigator = createStackNavigator({
    Auth: {
        screen: Auth
    },
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    Home: {
        screen: Home
    },
    Chat: {
        screen: Chat
    },
    Chatting: {
        screen: Chatting
    },
},
    {
        initialRouteName: 'Auth'
    }
)
const HomeContainer = createAppContainer(MyStackNavigator)
export default HomeContainer