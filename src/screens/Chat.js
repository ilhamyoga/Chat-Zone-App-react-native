import React, { Component } from "react"
import { View, Text, AsyncStorage } from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';
import User from '../../User';

export default class Chat extends Component {

    static navigationOptions = {
        title: 'CHAT'
    }

    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login')
    }

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentWillMount() {
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) =>{
            let person = val.val();
            console.warn('key',val.key)
                person.userUid = val.key;
            if (person.userUid === User.uid){
                User.name = person.name
            }
            else{
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        })
    }

    render() {
        return (
            <View style={{flex:1}}>
                <TouchableOpacity onPress={this._logOut}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.users}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Chatting', item)}>
                            <View style={{flexDirection:'row', margin:10}}>
                                <Avatar
                                    rounded
                                    size="medium"
                                    source={{
                                        uri:
                                        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                                    }}
                                />
                                <View style={{marginLeft:10, borderBottomWidth:0.5, flex:1}}>
                                    <Text style={{fontWeight:'bold', fontSize:15}}>
                                        {item.name}
                                    </Text>
                                    <Text style={{color:'#8a8d91'}}>
                                        {item.messeage}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item,index)=>index.toString()}
                />
            </View>
        )
    }
}