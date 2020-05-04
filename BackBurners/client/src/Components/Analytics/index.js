import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, Dimensions, StyleSheet, Button, Image, TouchableOpacity, ScrollView} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { bindActionCreators } from 'redux'
import { getBudget } from '../../store/budget'
import Pie from './Pie'
import LineGraph from './LineGraph'
import Budget from '../Landing/Budget'
import Billing from '../Activity/billing'
const height = Dimensions.get('screen').height

class Analytics extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.getBudget(this.props.user._id)
  }
  render() {
      return (
      <View>
        <View style={styles.center}>
          <View style={styles.secondRow}>
            <Image style={styles.imgTab} source={require('../../Images/Analytics/Current.png')}/>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Pie', { title: 'Current Budget ' }) }}>
              <Text style={styles.ButtonText}>Current Budget</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.thirdRow}>
            <Image style={styles.imgTab} source={require('../../Images/Analytics/spending.png')} />
            <TouchableOpacity 
                onPress={() => { this.props.navigation.navigate('Billing', { title: 'Billing' }) }}>
                <Text style={styles.ButtonTextSpending}>Spending Breakdown</Text>
            </TouchableOpacity>
                      
          </View>

          <View style={styles.fourthRow}>
            <Image style={styles.imgTab} source={require('../../Images/Analytics/PrevMonths.png')} />         
            <TouchableOpacity 
                onPress={() => { this.props.navigation.navigate('LineGraph', { title: 'Line' }) }}>
                <Text style={styles.ButtonText}>Previous Months</Text>
            </TouchableOpacity>
                      
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    imgTab: {
        //   alignItems: 'center',
        width: 70,
        height: 70,
        paddingTop: 10,
        marginLeft: -110,
        marginBottom: -47
    },
    center: {
        alignItems: 'center',
        height: height - 300,
        paddingTop: 55,
    },
    MonthButton: {
        alignItems: "center",
        height: 4000, 
        //backgroundColor: "#DDDDDD",
        padding: 10
    },
    ButtonText: {
        color: '#248841',
        fontSize: 22,
        fontFamily: 'Arial',
        fontWeight: 'bold'
    },
    ButtonTextSpending: {
        color: '#248841',
        fontSize: 20,
        fontFamily: 'Arial',
        fontWeight: 'bold'
    },
    secondRow: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        //height: 300,
        marginBottom: 20,
        //paddingTop: 20,
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
        //height: 2000,
        //    alignItems: 'center',
        width: '90%'
    },
    fourthRow: {
        backgroundColor: '#BCFDC1',
        flex: 1,
        marginBottom: 20,
        //paddingTop: 40,
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
    },
    DetailHead: {
        justifyContent: "center",
        alignItems: 'center',
        padding: 10,
        fontSize: 30,
        color: "#30b556"
    }
})

const mapState = state => {
  return {
    budget: state.budget,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return bindActionCreators({
    getBudget
  }, dispatch)
};

const AnalyticsConnect = connect(mapState,mapDispatch)(Analytics);

export default AnalyticsConnect;

export const AnalyticsScreen = createStackNavigator({ 
  Analytics: { screen: AnalyticsConnect },
  Pie: { screen: Pie },
  LineGraph: { screen: LineGraph },
  Budget: { screen: Budget },
  Billing: { screen: Billing }
});