import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, KeyboardAvoidingView, Button, TextInput, StyleSheet, TouchableOpacity ,Dimensions, Keyboard, Animated } from 'react-native';
import { updateBudget } from '../../../store/budget'
import { bindActionCreators } from 'redux';
const height = Dimensions.get('screen').height

class BudgetSetup extends Component {
  constructor(props) {
    super(props )
    this.state = {
      income: 0,
      staticCosts: 0,
      savings: 0,
      spendingBudget: 0
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
    const { user } = this.props
    const spendingBudget = 
    this.state.income - this.state.staticCosts - this.state.savings;
    this.props.updateBudget({ ...this.state, spendingBudget }, user._id);
    this.props.navigation.navigate('CategoryEdit', {
      title: 'CategoryEdit'
    });
  }

  render() {
    const question1 = (
      <View style={{marginLeft: 10}}>
        <Text>What is your monthly income?</Text>
        <View style={styles.inputField}>
          <TextInput onChangeText={income => this.setState({ income: +income })} 
            placeholder="Income"
            style={styles.text}
          />
        </View>
      </View>
    );
  
    const question2 = (
      <View>
        <Text style={{marginLeft: 10}}>
          What are your monthly static costs?
        </Text>

        <View style={styles.inputField}>
          <TextInput style={styles.text}
            onChangeText={staticCosts => this.setState({ staticCosts: +staticCosts }) }
            placeholder="Static Costs"
          />
        </View>
      </View>
    );

    const question3 = (
      <View>
        <Text style={{marginLeft: 10}}>
          How much would you like to save each month?
        </Text>
        <View style={styles.inputField}>
          <TextInput
            style={styles.text}
            onChangeText={savings => this.setState({ savings: +savings })}
            placeholder="Savings"
          />
        </View>
      </View>
    );

    return(
      <KeyboardAvoidingView style={styles.budgetSection}>
        {question1}
        {question2}
        {question3}
        <View style={styles.buttonview}>
          <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={() => { this.handleSubmit() }}>
            <Text style={styles.buttontext}>→</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateTooProps = state => {
  return {
    budget: state.budget,
    user: state.user
  };
};
  
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    updateBudget
  }, dispatch)
};

const styles = StyleSheet.create({
  budgetSection: {
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
  
export default connect(mapStateTooProps, mapDispatchToProps)(BudgetSetup);