import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import User from '../../User'

export default class Login extends React.Component {
	static navigationOptions = {
		title: 'RN + Firebase Chat App'
	};

	state = {
		email: '',
		password: '',
  };
  
  handleChange = key => val => {
    this.setState({ [key]: val })
  }

	onPressLogin = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response)=>{
        AsyncStorage.setItem('userUid', response.user.uid);
        this.props.navigation.navigate('Chat')
      })
	};

	render() {
		return (
			<View>
				<Text style={styles.title}>Email:</Text>
				<TextInput
					style={styles.nameInput}
					placeHolder="test3@gmail.com"
					onChangeText={this.handleChange('email')}
					value={this.state.email}
				/>
				<Text style={styles.title}>Password:</Text>
				<TextInput
					style={styles.nameInput}
					onChangeText={this.handleChange('password')}
					value={this.state.password}
				/>
				<Button
					title="Login"
					style={styles.buttonText}
					onPress={this.onPressLogin}
				/>

				<Button
					title="Signup"
					style={styles.buttonText}
					onPress={() => this.props.navigation.navigate('Register')}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		marginTop: 16,
		marginLeft: 16,
		fontSize: 16
	},
	nameInput: {
		height: 16 * 2,
		margin: 16,
		paddingHorizontal: 16,
		borderColor: '#111111',
		borderWidth: 1,
		fontSize: 16
	},
	buttonText: {
		marginLeft: 16,
		fontSize: 42
	}
});