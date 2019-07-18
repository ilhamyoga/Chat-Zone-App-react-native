import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text, TouchableOpacity, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { w, h, totalSize } from '../components/Dimensions';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Input } from 'react-native-elements';

import LinearGradient from 'react-native-linear-gradient';

export default class Login extends Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            style={styles.logoImage}
            source={{ uri: 'https://www.onecallnow.com/wp-content/uploads/2019/03/OCN_Icon_Circle_Unlimited.png'}}
          />
          <View style={{ width:'85%'}}>
            {/* <Text style={{color:'red', textAlign:'center'}}>Wrong Username & Password</Text> */}
            <Input
              containerStyle={{marginBottom:20, marginTop:10}}
              placeholder='Username'
              leftIcon={
                <Icon
                  style={{paddingRight:10}}
                  name='user'
                  size={24}
                  color='#4a5778'
                />
              }
            />
            <Input
              placeholder='Password'
              leftIcon={
                <Icon
                  style={{paddingRight:10}}
                  name='lock'
                  size={24}
                  color='#4a5778'
                />
              }
            />
          </View>
          <LinearGradient start={{x: 0, y: 0}} locations={[0,0.5,0.6]} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={styles.button}
            >
              {this.props.isLogin
                ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
                : <Text style={styles.text}>GET STARTED</Text>}
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Register')}
          style={styles.button2}
          activeOpacity={0.6}
        >
          <Text style={styles.text2}>REGISTER</Text>
        </TouchableOpacity>
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
    backgroundColor:'#5b8fbd',
    justifyContent: "center",
    alignItems: "center"
  },

  logoImage: {
    height: 150,
    width: 150,
    position:'absolute',
    top: 0,
    marginTop:-73,
    elevation: 2
  },

  card:{
    elevation:2,
    position:'relative',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: "rgba(255, 255, 255, 0.57)",
    width: '90%',
    paddingTop: 75,
    paddingBottom: 70,
    borderRadius: 5,
  },

  button: {
    elevation:5,
    position: 'absolute',
    bottom:0,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: w(2),
    borderRadius: w(10),
    marginBottom: -25
  },

  button2: {
    position: 'absolute',
    bottom:15,
    marginTop:100,
  },

  text: {
    color: 'white',
    fontWeight: '700',
    paddingVertical: h(1),
    fontSize: totalSize(2.1),
  },

  text2: {
    color: 'white',
    fontWeight: '500',
    paddingVertical: h(1),
    fontSize: totalSize(2.1),
  },
});