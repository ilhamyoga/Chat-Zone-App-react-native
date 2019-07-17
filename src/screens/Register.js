import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { w, h, totalSize } from '../components/Dimensions';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Input } from 'react-native-elements';

export default class Login extends Component {

  static navigationOptions = {
    title:'Register'
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll} >
            <View style={styles.card}>
                <View style={{ width:'85%'}}>
                    {/* <Text style={{color:'red', textAlign:'center'}}>Wrong Username & Password</Text> */}
                    <Input
                        containerStyle={{marginBottom:5}}
                        placeholder='Profile Image'
                        leftIcon={
                            <Icon
                            style={{paddingRight:10}}
                            name='emotsmile'
                            size={24}
                            color='#4a5778'
                            />
                        }
                    />
                    <Input
                        placeholder='Full Name'
                        leftIcon={
                            <Icon
                            style={{paddingRight:10}}
                            name='credit-card'
                            size={24}
                            color='#4a5778'
                            />
                        }
                    />
                    <Input
                        containerStyle={{marginBottom:5, marginTop:5}}
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
                    <Input
                        containerStyle={{marginBottom:5, marginTop:5}}
                        placeholder='Phone Number'
                        leftIcon={
                            <Icon
                            style={{paddingRight:10}}
                            name='phone'
                            size={24}
                            color='#4a5778'
                            />
                        }
                    />
                    <Input
                        placeholder='School'
                        leftIcon={
                            <Icon
                            style={{paddingRight:10}}
                            name='book-open'
                            size={24}
                            color='#4a5778'
                            />
                        }
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Register')}
                    style={styles.button2}
                    activeOpacity={0.6}
                >
                    <Text style={styles.text}>REGISTER</Text>
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
    backgroundColor:'#3A404E',
    justifyContent: "center",
    alignItems: "center"
  },

  logoImage: {
    height: 150,
    width: 150,
    position:'absolute',
    top: 0,
    marginTop:-73
  },

  card:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: "rgba(255, 255, 255, 0.57)",
    marginTop: 30,
    marginBottom: 70,
    paddingTop: 30,
    paddingBottom: 70,
    borderRadius: 5,
  },

  scroll:{
    flex:1,
    width: '90%',
    borderRadius: 5,
  },

  button: {
    position: 'absolute',
    bottom:0,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: w(2),
    backgroundColor: '#888',
    borderRadius: w(10),
    marginBottom: -25
  },

  button2: {
    position: 'absolute',
    bottom:0,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: w(2),
    backgroundColor: '#888',
    borderRadius: w(10),
    marginBottom: -25
  },

  text: {
    color: 'white',
    fontWeight: '500',
    paddingVertical: h(1),
    fontSize: totalSize(2.1),
  },
});