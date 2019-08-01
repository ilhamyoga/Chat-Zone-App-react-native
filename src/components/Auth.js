import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    View
} from 'react-native';
import firebase from 'firebase';
import User from '../../User';

export default class Auth extends Component {
    constructor(props){
        super(props);
        this.bootstrapAsync()
    }

    static navigationOptions = {
        header: null
    }

    componentWillMount(){
        if (!firebase.apps.length) {
            var firebaseConfig = {
                apiKey: "AIzaSyAaQpl6ZzkcrYtPEM_zVImO4FW4wbjzwHk",
                authDomain: "chatzone-b6423.firebaseapp.com",
                databaseURL: "https://chatzone-b6423.firebaseio.com",
                projectId: "chatzone-b6423",
                storageBucket: "chatzone-b6423.appspot.com",
                messagingSenderId: "396480333710",
                appId: "1:396480333710:web:3ae921845cf0712f"
            };
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
        }
    }

    bootstrapAsync = async () => {
        User.uid = await AsyncStorage.getItem('userUid');
        this.props.navigation.navigate(User.uid ? 'Home' : 'Login')
    }

    render(){
        return(
            <View>
                <ActivityIndicator />
            </View>
        )
    }
}