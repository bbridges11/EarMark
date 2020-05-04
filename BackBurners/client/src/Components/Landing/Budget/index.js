import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import BudgetSetup from './BudgetSetup';
import EditCategories from './CategoryEdit';
import Home from '../../Home';

class Budget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={styles.circle}>
          <Text style = {{fontSize: 25, }}>Edit: </Text>
          <View style={styles.budgetSetup}>
            <Button
              color='black'
              textStyle={{ textAlign: 'center' }}
              title={`Budget`}
              onPress={() => {
                this.props.navigation.navigate('BudgetSetup', {
                  title: 'BudgetSetup'
                });
              }}
            />
          </View>
          

          <View style={styles.categorySetup}>
            <Button
              color='black'
              textStyle={{ textAlign: 'center' }}
              title={`Categories`}
              onPress={() => {
                this.props.navigation.navigate('CategoryEdit', {
                  title: 'CategoryEdit'
                });
              }}
            />
          </View>
          </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  budgetSetup: {
    marginTop: 10,
    // marginLeft: 55,
    height: 50,
    color: 'white',
    width: '70%',
    fontSize: 30,
    backgroundColor: '#789F64',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
  },
  circle: {
    // backgroundColor: 'rgba(255,255,255,0.5)',
    backgroundColor: '#F1FFF1',
    marginTop:110,
    width: 375,
    height: 375,
    borderRadius: 375 / 2,
    justifyContent: 'center',
    alignItems: 'center',
},
  categorySetup: {
    marginTop: 35,
    // marginLeft: 55,
    height: 50,
    color: 'white',
    width: '70%',
    fontSize: 30,
    backgroundColor: '#C6E0C3',
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  }
})

const mapState = state => {
  return {
    user: state.user,
    budget: state.budget
  };
};

const BudgetConnect = connect(mapState)(Budget);

export default BudgetConnect;

export const BudgetStack = createStackNavigator({
  Budget: { screen: BudgetConnect },
  BudgetSetup: { screen: BudgetSetup },
  EditCategories: { screen: EditCategories },
  Home: { screen: Home }
});