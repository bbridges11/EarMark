import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, Dimensions, StyleSheet, Button, Image, TouchableOpacity, ScrollView} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { bindActionCreators } from 'redux'
import { getBudget } from '../../store/budget'
import Pie from './Pie'
//import LineGraph from './LineGraph' // I copied what u did to pie in this file to graph but doesn't work lol
import Budget from '../Landing/Budget'
const height = Dimensions.get('screen').height

/*const dataLine = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
        {
            data: [20, 43, 35, 80],
            color: "", // optional
            strokeWidth: 2 // optional
        }
    ]
};*/

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
            <View>
              <Image style={styles.imgTab} source={require('../../Images/Analytics/Current.png')}/>
                <TouchableOpacity //same thing as a button but easier to customize and better
                    onPress={() => { this.props.navigation.navigate('Pie', { title: 'Current Budget ' }) }}>
                              <Text style={styles.ButtonText}>Current Budget</Text>
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.thirdRow}>
            <Image style={styles.imgTab} source={require('../../Images/Analytics/spending.png')} />
            <TouchableOpacity /*style={styles.MonthButton}*/
                onPress={() => { this.props.navigation.navigate('LineGraph', { title: 'LineGraph' }) }}>
                <Text style={styles.ButtonTextSpending}>Spending Breakdown</Text>
            </TouchableOpacity>
                      
          </View>

          <View style={styles.fourthRow}>
            <Image style={styles.imgTab} source={require('../../Images/Analytics/PrevMonths.png')} />         
            <TouchableOpacity /*style={styles.MonthButton}*/
                onPress={() => { this.props.navigation.navigate('LineGraph', { title: 'LineGraph' }) }}>
                <Text style={styles.ButtonText}>Previous Months</Text>
            </TouchableOpacity>
                      
          </View>
        </View>
      </View>
    );
  }
}



/*<Button style={styles.BigButton} title="Spending Breakdown" onPress={() => { this.props.navigation.navigate('spending', { title: 'spending' }) }} />*/

/*<Button style={styles.BigButton} title="Previous Months" onPress={() => { this.props.navigation.navigate('LineGraph', { title: 'LineGraph' }) }} />
*//*<Text style={{ fontSize: 24, color: '#248841', fontFamily: 'Arial', fontWeight: 'bold' }}>Spending Breakdown</Text>*/
/*<Text style={{ fontSize: 24, color: '#248841', fontFamily: 'Arial', fontWeight: 'bold' }}>Previous Months</Text>*/


const styles = StyleSheet.create({
    imgTab: {
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
    /*monthButton: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },*/
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
  //LineGraph: { screen: LineGraph },
  Budget: { screen: Budget }
});