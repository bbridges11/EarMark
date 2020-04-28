import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Dimensions, View, Image, TextInput, KeyboardAvoidingView, Animated, Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import { login } from '../../store/user'
import { bindActionCreators } from 'redux';
import { Notifications } from 'expo'
const height = Dimensions.get('screen').height
const MailIcon = require('../../Images/MailIcon.png')
const LockIcon = require('../../Images/LockIcon.png')

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
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
    }).start();
    };

    hideKB = event => {
    Animated.timing(this.imageHeight, {
        duration: event.duration,
    }).start();
    };

    handleSubmit = async () => {
        let pushTok = await Notifications.getExpoPushTokenAsync();
        this.props.login(this.state.email, this.state.password, this.props.navigation, pushTok);
    }

    render() {
        return(
            <KeyboardAvoidingView style={styles.signupSection}>
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
                <View style={styles.buttonview}>
                    <TouchableOpacity activeOpacity={0.6} style={styles.button} title={`Link Bank Account →`} onPress={() => { this.handleSubmit() }}>
                        <Text style={styles.buttontext}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        ); 
    }
}

const styles = StyleSheet.create({
    signupSection: {
        flex:1,
        //backgroundColor: '#ffffff',
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
        //backgroundColor: '#fff',
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
        flex: 1
    },
    buttontext: {
        fontSize: 28,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: '#fff'
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
    }
})

const mapDispatch = dispatch => {
    return bindActionCreators({
        login
    }, dispatch);
};
  
export default connect(null, mapDispatch)(Login);