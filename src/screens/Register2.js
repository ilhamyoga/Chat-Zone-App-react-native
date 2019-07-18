import React from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
    Button,
    AsyncStorage
} from 'react-native';

import firebase from 'firebase';

export default class Signup extends React.Component {
	state = {
		name: '',
		email: '',
        password: '',
        phone: '',
		avatar: ''
    };
    
    handleChange = key => val => {
        this.setState({ [key]: val })
    }

	// onPressCreate = async () => {
	// 	try {
	// 		const user = {
	// 			name: this.state.name,
	// 			email: this.state.email,
	// 			password: this.state.password
	// 		};
	// 		await firebaseSDK.createAccount(user);
	// 	} catch ({ message }) {
	// 		console.log('create account failed. catch error:' + message);
	// 	}
    // };
    
    onPressCreate = async () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((response) => {
                firebase.database().ref('users/' + response.user.uid).set({name: this.state.name, email: this.state.email})
            })
		// alert(this.state.email +'\n'+this.state.password +'\n'+this.state.name)
    };

    componentWillMount(){
        AsyncStorage.getItem('userPhone').then(val=>{
            if(val){
                this.setState({ phone:val })
            }
        })
    }

	// onChangeTextEmail = email => this.setState({ email });
	// onChangeTextPassword = password => this.setState({ password });
	// onChangeTextName = name => this.setState({ name });

	render() {
		return (
			<View>
				<Text style={styles.title}>Email:</Text>
				<TextInput
					style={styles.nameInput}
					placeHolder="test@live.com"
					onChangeText={this.handleChange('email')}
					value={this.state.email}
				/>
				<Text style={styles.title}>Password:</Text>
				<TextInput
					style={styles.nameInput}
					onChangeText={this.handleChange('password')}
					value={this.state.password}
				/>
				<Text style={styles.title}>Name:</Text>
				<TextInput
					style={styles.nameInput}
					onChangeText={this.handleChange('name')}
					value={this.state.name}
				/>
				<Button
					title="Signup"
					style={styles.buttonText}
					onPress={this.onPressCreate}
				/>
			</View>
		);
	}
}

const offset = 16;
const styles = StyleSheet.create({
	title: {
		marginTop: offset,
		marginLeft: offset,
		fontSize: offset
	},
	nameInput: {
		height: offset * 2,
		margin: offset,
		paddingHorizontal: offset,
		borderColor: '#111111',
		borderWidth: 1,
		fontSize: offset
	},
	buttonText: {
		marginLeft: offset,
		fontSize: 42
	}
});