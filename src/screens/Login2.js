import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text, TouchableOpacity, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { w, h, totalSize } from '../components/Dimensions';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import { Input } from 'react-native-elements';

export default class Login2 extends Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{position:'absolute', top:40, left:50}}>
            <Icon2
                name='arrow-left'
                size={25}
                color='#FEFEFF'
            />
            <Text style={{marginTop:50, color: '#FEFEFF', fontWeight: '700', fontSize:45}}>Log In</Text>
        </View>
        <View style={styles.card}>
          <View style={{ width:'85%'}}>
            <Input
              inputContainerStyle={{borderColor:'#F4AE1A'}}
              containerStyle={{marginBottom:30}}
              placeholder='Username'
              leftIcon={
                <Icon
                  style={{paddingRight:10}}
                  name='user'
                  size={20}
                  color='#BCC2CB'
                />
              }
            />
            <Input
              containerStyle={{marginBottom:30}}
              placeholder='Password'
              leftIcon={
                <Icon
                  style={{paddingRight:10}}
                  name='lock'
                  size={20}
                  color='#BCC2CB'
                />
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}
            style={styles.button}
            activeOpacity={0.6}
          >
            {this.props.isLogin
              ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
              : <Text style={styles.text}>Log in</Text>}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Login2.propTypes = {
  click: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#3A404E',
    justifyContent: "center",
    alignItems: "center",
  },

  logoImage: {
    height: 150,
    width: '100%',
    position:'absolute',
    top: 0,
    marginTop:-73
  },

  card:{
    position:'absolute',
    paddingLeft:17,
    bottom:0,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: '87%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: w(2),
    backgroundColor: '#888',
    borderRadius: w(10),
  },
  text: {
    color: 'white',
    fontWeight: '700',
    paddingVertical: h(1),
    fontSize: totalSize(2.1),
  },
});