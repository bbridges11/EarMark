import React, { Component } from 'react';
import { Text, View, Image, Button, StyleSheet} from 'react-native';


class Landing extends Component {
    render() {
        return(
            <View style={styles.background}>
                <Image style={styles.imgTab} source={require('../../Images/Landing/LogoW.png')} />
                <View >
                    <View style={styles.login}>
                        <Button
                        button
                        text
                        title={`Login`}
                        color='black'
                        onPress={() =>
                            this.props.navigation.navigate('Login', { title: 'Login' })
                        }
                    >
                    </Button>
                    </View>
                    <View style={styles.signUp}>
                    <Button
                    button
                    text
                    color='black'
                    title={`SignUp`}
                    onPress={() => 
                        this.props.navigation.navigate('SignUp', { title: 'SignUp' })
                    }
                />
                </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    login: {
        marginTop: 10,
        marginLeft: 55,
        height: 50,
        color: 'white',
        width: '70%',  
        fontSize: 30,
        backgroundColor: '#C6E0C3',
        borderRadius: 10,
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
    },
    background:{
        backgroundColor:'#248841',
        flex: 1,
    },
    signUp: {
        marginTop: 20,
        marginLeft: 55,
        height: 50,
        color: 'white',
        width: '70%',
        fontSize: 30,
        backgroundColor: '#C6E0C3',
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    imgTab: {
        //   alignItems: 'center',
        width: 300,
        height: 300,
        marginLeft:10,
    }
})
export default Landing;
