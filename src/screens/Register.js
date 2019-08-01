import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text, TouchableOpacity, View, Image, ScrollView, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Input } from 'react-native-elements';

import firebase from 'firebase';
import GetLocation from 'react-native-get-location'

export default class Login extends Component {

  static navigationOptions = {
    headerStyle:{ backgroundColor:'#F25E63' },
    headerTintColor: '#fff',
    title: 'Sign Up'
  }

  constructor(props) {
    super(props);
    this.state = {
      image: '' || 'PersonImage',
      name: '',
      email: '',
      password: '',
      phone: '',
      aboutMe: '' || "Hello... Let's chat with me",
      isLoading: false,
    }
    this.getLocation();
  }

  getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
        this.setState({
          latitude: location.latitude,
          longitude: location.longitude,
        })
    })
    .catch(error => {
        alert('Get location error')
    })
  }

  handleChange = key => val => {
    this.setState({ [key]: val })
  }

  onPressCreate = async () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
          firebase.database().ref('users/' + response.user.uid)
          .set({
            image: this.state.image,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            location: {
              latitude: this.state.latitude,
              longitude: this.state.longitude
            },
            aboutMe: this.state.aboutMe
          })
          this.props.navigation.navigate('Login')
      })
      .catch(function(error) {
        alert('Please complete your data')
      })
  // alert(this.state.email +'\n'+this.state.password +'\n'+this.state.name)
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1}}>
          <View style={{alignItems:'center'}}>

          { (this.state.isLoading == true) ?
            <View>
              <ActivityIndicator/>
            </View>
            : null
          }

            {/* <Image
              style={styles.logoImage}
              source={ require('../assets/logo_t.png') } 
            /> */}
            <View style={styles.card}>
              {/* { (this.state.isError == true) ?
                <Text style={{color:'red', textAlign:'center'}}>Wrong Username & Password</Text>
                : null
              } */}
              <Input
                containerStyle={{marginBottom:10}}
                inputContainerStyle={{borderBottomColor:'#424E61'}}
                inputStyle={{color:'#f7a0a4', textAlign:'center'}}
                onChangeText={this.handleChange('image')}
                placeholderTextColor='#5A6675'
                placeholder='Image URL'
                leftIcon={
                  <Icon
                    style={{marginLeft:-10}}
                    name='add-a-photo'
                    size={27}
                    color='#424E61'
                  />
                }
              />
              <Input
                containerStyle={{marginBottom:10}}
                inputContainerStyle={{borderBottomColor:'#424E61'}}
                inputStyle={{color:'#f7a0a4', textAlign:'center'}}
                onChangeText={this.handleChange('name')}
                placeholderTextColor='#5A6675'
                placeholder='Full Name'
                leftIcon={
                  <Icon
                    style={{marginLeft:-10}}
                    name='supervisor-account'
                    size={27}
                    color='#424E61'
                  />
                }
              />
              <Input
                containerStyle={{marginBottom:10}}
                inputContainerStyle={{borderBottomColor:'#424E61'}}
                inputStyle={{color:'#f7a0a4', textAlign:'center'}}
                onChangeText={this.handleChange('email')}
                placeholderTextColor='#5A6675'
                placeholder='Email'
                leftIcon={
                  <Icon
                    style={{marginLeft:-10}}
                    name='email'
                    size={27}
                    color='#424E61'
                  />
                }
              />
              <Input
                containerStyle={{marginBottom:35}}
                inputContainerStyle={{borderBottomColor:'#424E61'}}
                inputStyle={{color:'#f7a0a4', textAlign:'center'}}
                onChangeText={this.handleChange('password')}
                secureTextEntry={true}
                placeholderTextColor='#5A6675'
                placeholder='Password'
                leftIcon={
                  <Icon
                    style={{marginLeft:-10}}
                    name='lock'
                    size={27}
                    color='#424E61'
                  />
                }
              />
              <Input
                containerStyle={{marginBottom:20}}
                inputContainerStyle={{borderBottomColor:'#424E61'}}
                inputStyle={{color:'#f7a0a4', textAlign:'center'}}
                onChangeText={this.handleChange('phone')}
                placeholderTextColor='#5A6675'
                placeholder='Phone number'
                leftIcon={
                  <Icon
                    style={{marginLeft:-10}}
                    name='phone'
                    size={27}
                    color='#424E61'
                  />
                }
              />
            </View>
            

            <View style={{width:'81%'}}>
              <Button
                titleStyle={{fontSize:20}}
                buttonStyle={{height:65, backgroundColor:'#F25E63', borderRadius: 5}}
                onPress={this.onPressCreate}
                style={styles.button}
                title="SIGN UP"
              />
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
              style={{marginTop:50, marginBottom:30}}
              activeOpacity={0.6}
            >
              <Text style={styles.text}>Sign In</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    );
  }
}

Login.propTypes = {
  click: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#2e3745',
    justifyContent:'center',
  },

  logoImage: {
    height: 320,
    width: 320,
  },

  card:{
    width:'86%',
    alignItems:'center',
    justifyContent:'center',
    marginTop: 100
  },

  text: {
    color: '#5A6675',
    fontWeight: '200',
    fontSize: 18,
  }

});