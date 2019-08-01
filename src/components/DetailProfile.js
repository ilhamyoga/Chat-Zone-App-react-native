import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text, TouchableOpacity, View, Image, ScrollView, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { IconButton, Button } from 'react-native-paper';
import User from '../../User';

import firebase from 'firebase';

export default class DetailProfile extends Component {

  static navigationOptions = ({navigation}) => ({
    headerRight: 
        navigation.state.params.uid == User.uid ?
        (<IconButton
                style={{marginRight:10}}
                icon="border-color"
                color='#fff'
                size={20}
                onPress={() => navigation.goBack()}
        /> ) : null,
    headerTintColor: '#fff',
    headerTransparent: true,
  })

  constructor(props){
    super(props);
    this.state = {
        data:[],
        uid : '',
        image : '',
        name : '',
        email : '',
        password : '',
        phone : '',
        aboutMe : '',
    }
  }

  componentDidMount = () => {
    let data = this.props.navigation.state.params
    this.setState({ 'data': data})
  }

  logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login')
  }


  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1, marginTop:55}}>
            <View style={{borderBottomWidth:1.8, justifyContent:'flex-start', alignItems:'center', height: 200, borderColor:'#3b366c', marginTop:20}}>
                <View style={{flexDirection:'row', width:'90%'}}>
                    <View style={{marginLeft:13, marginRight:27}}>
                        <Image
                            style={{width: 120, height: 140, borderTopRightRadius:12, borderBottomLeftRadius:12, backgroundColor:'rgb(242,105,149)'}}
                            source={{uri: this.state.data.image}}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <View style={{borderBottomWidth:1.8, borderColor:'#3b366c'}}>
                            <Text numberOfLines={1} style={{color:'#fff', fontFamily:'Roboto-Thin', fontWeight:'bold', fontSize:20, marginBottom:8}}>
                                {this.state.data.name}   
                            </Text>
                            <Text numberOfLines={1} style={{color:'#807cb2', fontSize:15, marginBottom:18}}>
                                Hi...
                            </Text>
                        </View>
                        <View>
                            <Text numberOfLines={1} style={{color:'#807cb2', fontSize:15, marginTop:16, marginBottom:7}}>
                                {this.state.data.phone} 
                            </Text>
                            <Text numberOfLines={1} style={{color:'#807cb2', fontSize:15}}>
                                {this.state.data.email} 
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{justifyContent:'center', flex:1, flexDirection:'row', marginTop:-33, marginBottom:20}}>
                <TouchableOpacity style={{justifyContent:'center', alignItems:'center', width:65, height:65, marginRight:30, backgroundColor:'rgb(137,188,102)', borderRadius:50}}>
                    <Icon
                        name='phone'
                        size={32}
                        color='#fff'
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent:'center', alignItems:'center', width:65, height:65, backgroundColor:'rgb(242,105,149)', borderRadius:50}}>
                    <Icon
                        name='envelope'
                        size={32}
                        color='#fff'
                    />
                </TouchableOpacity>
            </View>
            <View style={{alignItems:'center', marginBottom:20}}>
                <View style={{width:'90%', backgroundColor:'rgb(59,54,112)', padding:30, elevation:4, borderRadius:2}}>
                    <Text numberOfLines={1} style={{color:'rgb(213,123,144)', fontSize:21, marginBottom:15}}>
                        About Me
                    </Text>
                    <Text style={{color:'rgb(112,109,165)', fontSize:15, lineHeight:26}}>                   
                        {this.state.data.aboutMe} 
                    </Text>
                </View>
            </View>
        </ScrollView>
        {( User.uid._55 == this.state.data.userUid || this.state.data.uid) ?
            <View style={{bottom:20, alignItems:'center', height:33}}>
                <Button mode="contained" contentStyle={{width:'100%'}} onPress={this.logOut}>
                    LOG OUT
                </Button>
            </View> 
            : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(47,43,96)',
    },
});