import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
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
      <View >
        <View style={{ padding: 7 }}>
            <Button
              textStyle={{ textAlign: 'center' }}
              title={`Edit Budget`}
              onPress={() => {
                this.props.navigation.navigate('BudgetSetup', {
                  title: 'BudgetSetup'
                });
              }}
            />
          </View>

          <View style={{ padding: 7 }}>
            <Button
              textStyle={{ textAlign: 'center' }}
              title={`Edit Categories`}
              onPress={() => {
                this.props.navigation.navigate('CategoryEdit', {
                  title: 'CategoryEdit'
                });
              }}
            />
          </View>
      </View>
    );
  }
}

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