import React,{ Component } from 'react';
import PlaidAuthenticator from 'react-native-plaid-link';
import { View, Button, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendTok } from '../../store/token';
class Link extends Component {
    state = {
        data: {},
        status: ''
    }

    render() {
        switch (this.state.status) {
            case 'CONNECTED':
              return this.renderDetails();
            default:
              return this.renderLogin();
        }
    }

    onMessage = data => {
        this.setState({
            data,
            status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase()
        });
    };
    
    renderLogin() {
        return(
            <PlaidAuthenticator publicKey="ae0d789b854b418325ba1e8994c2f7" clientName="Earmark" env="sandbox" product="auth,transactions" onMessage={this.onMessage}/>
        );
    }

    renderDetails() {
        this.props.sendTok(this.state.data.metadata.public_token, this.props.user._id);
        return(
            <View style={styles.background}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.login}>
                        <Button button
                        text color='black' title={'Setup Your Budget'} onPress={() => this.props.navigation.navigate('BudgetSetup', { title: 'BudgetSetup' })}>
                            Set Up!
                        </Button>
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

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatch = dispatch => {
    return bindActionCreators({
        sendTok
    }, dispatch)
};
  
export default connect(mapStateToProps, mapDispatch)(Link);