
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { bindActionCreators } from 'redux';
import Billing from './billing'

class Activity extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <View style={{flex: 1}}>
        <View>
           <Text style={styles.priceLabel}>$ 423.00</Text>
           <View style={{flexDirection: 'row'}}>
           <View style = {styles.userPhoto}>
            </View>
            <View style={styles.billInfo}>
             <Text>Electric</Text>
             <Text style = {{color: '#789F64', fontWeight: 'bold', paddingTop: 5}}>Pending --</Text>
             </View>
           </View>
          <View style={styles.paidButton}>
            <Text>PAID</Text>
          </View>
        </View>

        <View>
          <Text style={styles.rechargeLabel}>Recharge & Bills</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.myButton}>
              <Text onPress={() => {this.props.navigation.navigate('Billing', { title: 'Billing' }); alert('yooo')}}>Mobile</Text>
            </View>
            
            <View style = {styles.myButton}>
              <Text>TV</Text>
            </View>

            <View style = {styles.myButton}>
              <Text>Music</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style = {styles.myButton}>
              <Text>Electric</Text>
            </View>

            <View style = {styles.myButton}>
              <Text>Gas</Text>
            </View>

            <View style = {styles.myButton}>
              <Text>Water</Text>
            </View>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  myButton:{
    margin: 35,
    height: 70,
    width: 70,  //The Width must be the same as the height
    borderRadius:140, //Then Make the Border Radius twice the size of width or Height
    fontSize: 12,
    backgroundColor:'#C6E0C3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPhoto:{
    marginLeft: 35,
    marginTop: 35,
    height: 70,
    width: 70,  //The Width must be the same as the height
    borderRadius: 140, //Then Make the Border Radius twice the size of width or Height
    fontSize: 12,
    backgroundColor:'#C6E0C3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paidButton:{
    marginLeft: 40,
    marginBottom: 40,
    fontSize: 30,
    height: 50,
    width: '80%',
    padding: 10,
    color: '#FFFFFF', 
    backgroundColor:'#789F64',
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceLabel:{
    fontSize: 40,
    color: '#248841',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingRight: 10,
    paddingTop: 30
  },
  rechargeLabel:{
    color: '#54C134',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: 30,
    paddingBottom: 15
  },
  billInfo:{
    padding:50,
  }
})

const mapState = state => {
    return {

    };
  };

  const mapDispatch = dispatch => {
    return {

    };
  };

  const ActivityConnect = connect(
    mapState,
    mapDispatch
  )(Activity);

  export default ActivityConnect;

export const ActivityScreen = createStackNavigator({
    Activity: { screen: ActivityConnect },
    Billing: { screen: Billing }
});
