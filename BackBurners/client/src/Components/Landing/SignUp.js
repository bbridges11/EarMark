import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text, TouchableOpacity, View, Dimensions,
    TextInput, KeyboardAvoidingView, Animated, Keyboard, StyleSheet, Image, Platform, Button
} from 'react-native';
import { signup } from '../../store/user';
import { bindActionCreators } from 'redux';
const personIcon = require('../../Images/personIcon.png')
const MailIcon = require('../../Images/MailIcon.png')
const LockIcon = require('../../Images/LockIcon.png')
const height = Dimensions.get('screen').height

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '', 
            password: '',
            name: '',
            phoneNumber: ''
        };
    }

    componentDidMount() {
        this.showKBSub = Keyboard.addListener('showKB', this.showKB);
        this.hideKBSub = Keyboard.addListener('hideKB', this.hideKB);
    }
    
    componentWillUnmount() {
        this.showKBSub.remove();
        this.hideKBSub.remove();
    }

    showKB = event => {
        Animated.timing(this.imageHeight, {
            duration: event.duration,
            toValue: IMAGE_HEIGHT_SMALL
        }).start();
    };

    hideKB = event => {
        Animated.timing(this.imageHeight, {
            duration: event.duration,
            toValue: IMAGE_HEIGHT
        }).start();
    };

    handleSubmit = () => {
        const newUser = {
            email: this.state.email,
            passWord: this.state.password,
            name: this.state.name,
            _id: Math.random().toString(36).substring(2, 9)
        }
        if(this.state.email !== '' || this.state.name !== '' || this.state.password !== '') {
            this.props.signup(newUser)
            this.props.navigation.navigate('Link', { title: 'Link' })
        }
        
    }
    render() {
        return(
            <KeyboardAvoidingView style={styles.signupSection} keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
                <View style={styles.inputField}>
                    <Image style={styles.image} source={personIcon}/>
                    <TextInput style={styles.text}  placeholder="Full Name"
                    onChangeText={currtext => this.setState({ name: currtext })} value={this.state.name}/>
                </View>
                <View style={styles.inputField}>
                    <Image style={styles.image} source={MailIcon}/>
                    <TextInput style={styles.text}  placeholder="Email" 
                    onChangeText={currtext => this.setState({ email: currtext })} value={this.state.email}/>
                </View>
                <View style={styles.inputField}>
                    <Image style={styles.image} source={LockIcon}/>
                    <TextInput style={styles.text} secureTextEntry={true} placeholder="Password"
                    onChangeText={currtext => this.setState({ password: currtext })} value={this.state.password}/>
                </View>
                {<View style={styles.buttonview}>
                    <TouchableOpacity activeOpacity={0.6} style={styles.button} title={`Link Bank Account →`} onPress={() => { this.handleSubmit() }}>
                        <Text style={styles.buttontext}>Continue</Text>
                    </TouchableOpacity>
                </View>}
                <View style={styles.loginbuttonview}>
                    <TouchableOpacity activeOpacity={0.6} style={styles.loginbutton}title={"Login"} onPress={() => this.props.navigation.navigate('Login', { title: 'Login' })}>
                       <Text style={styles.buttontextLogin}>Login</Text> 
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        ); 
    }
}

const styles = StyleSheet.create({
    signupSection: {
        flex:1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height,
        marginTop: 60
    },
    inputField: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#248841',
        height: 40,
        margin: 10,
        marginBottom: 60,
        paddingBottom: 10
    },
    image: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 20,
        resizeMode : 'stretch',
        alignItems: 'center'
    },
    text: {
        flex: 1,
    },
    buttonview: {
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        width: 325,
        height: 57,
        backgroundColor: '#54C134',
        justifyContent: "center",
        alignSelf: "stretch",
        textAlignVertical: "center",
        borderRadius: 12
    },
    loginbutton: {
        width: '100%',
        backgroundColor: '#54C134',
        height: 100
    },
    loginbuttonview: {
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 230,
        position: 'relative',
        bottom: 0,
    },
    buttontext: {
        fontSize: 28,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: '#fff'
    },
    buttontextLogin: {
        fontSize: 28,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: '#fff',
        paddingTop: 10
    }
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        signup
    }, dispatch)
};
  
export default connect(null, mapDispatchToProps)(SignUp);