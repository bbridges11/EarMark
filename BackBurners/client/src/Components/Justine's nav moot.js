/*
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
const height = Dimensions.get('screen').height
import { LineGraph, Pie } from './Analytics'
//const leftPadding = 

class Analytics extends Component {
  render() {
    return(
      <ScrollView>
        <View style={styles.center}>
          <View style={styles.secondRow}>
            <InlineImage source={require('../../Images/Analytics/Current.png')} style={styles.image}/>
                    <Text style={{
                        fontSize: 24, color: '#248841'
                        , fontFamily: 'Arial', fontWeight: 'bold'
                    }}>Current Month</Text>
  
          </View> 
          <View style= {styles.thirdRow}>
                    <Image source={require('../../Images/Analytics/Spending.png')} style={styles.image}/>
                    <Text style={{
                        fontSize: 24, color: '#248841'
                        , fontFamily: 'Arial', fontWeight: 'bold'
                    }}>Spending Breakdown</Text>
            </View>
            <View style= {styles.fourthRow}>
              <Image source={require('../../Images/Analytics/PrevMonths.png')} style={styles.image}/>
                    <Text style={{
                        fontSize: 24, color: '#248841'
                        , fontFamily: 'Arial', fontWeight: 'bold'
                    }}>Previous Months</Text>
            </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
 //   alignItems: 'center',
    width: 70,
    height: 70,
    marginLeft: -110,
    marginBottom: -47
  },
  center: {
    alignItems: 'center',
    height: height - 300,
    paddingTop: 150,
  },
  text: {
    color: '#248841',
    fontSize: 26,
    fontFamily: 'Arial',
    fontWeight: 'bold'
  },
  secondRow: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    height: height - 500,
    marginBottom: 20,
    paddingTop: 20,
    paddingLeft: 140,
 //   alignItems: 'center',
    width: '90%'
  },
  thirdRow: {
    backgroundColor: '#F1FFF1',
    flex: 1,
    marginBottom: 20,
    paddingTop: 40,
    paddingLeft: 140,
//    alignItems: 'center',
    width: '90%'
  },
  fourthRow: {
    backgroundColor: '#BCFDC1',
    flex: 1,
    marginBottom: 20,
    paddingTop: 40,
    paddingLeft: 140,
 //   alignItems: 'center',
    width: '90%'

  },
  SettingsView: {
    backgroundColor: '#F1FFF1',
    height: 85,
    marginBottom: 30,
    justifyContent: 'center',
    width: '90%'
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

const AnalyticsConnect = connect(mapState,mapDispatch)(Analytics);

export default AnalyticsConnect;

export const AnalyticsScreen = createStackNavigator({ Home: { screen: AnalyticsConnect }});*/