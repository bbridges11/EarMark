import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, Dimensions, StyleSheet, Button, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {
    LineChart, BarChart, PieChart
} from "react-native-chart-kit";
//import { LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { ScrollView } from 'react-native-gesture-handler';
import { LineGraph, Pie } from './Analytics'


const screenWidth = Dimensions.get("window").width;

//const totalAmt = 0; 

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5
};

/*const dataPie = [
  {
    name: "Shopping",
    amount: 50,
    color: "#80ffaa",
    legendFontColor: "#7F7F7F",
    legendFontSize: 14
  },
  {
    name: "Groceries",
    amount: 100,
    color: "#26FB64",
    legendFontColor: "#7F7F7F",
    legendFontSize: 14
  },
  {
    name: "Entertainment",
    amount: 74,
    color: "#00cc44",
    legendFontColor: "#7F7F7F",
    legendFontSize: 14
  },
  {
    name: "Work Expense",
    amount: 40,
    color: "#99ffbb",
    legendFontColor: "#7F7F7F",
    legendFontSize: 14
  },
  {
    name: "Travel",
    amount: 200,
    color: "#00cc66",
    legendFontColor: "#7F7F7F",
    legendFontSize: 14
  },
  {
    name: "Other",
    amount: 120,
    color: "#248841",
    legendFontColor: "#7F7F7F",
    legendFontSize: 14
  }
];*/


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
  render() {
      return (
        //testing for 1 tab to be a button to see if it works.
      <View>
        <View style={styles.center}>
          <View style={styles.secondRow}>
            <View>
              <Image style={styles.imgTab} source={require('../../Images/Analytics/Current.png')}/>
              
              <Button style={styles.BigButton} title="Go to Pie Chart for Budget" onPress={() => this.props.navigation.navigate('LineGraph')} />
            </View>
          </View>
          <View style={styles.thirdRow}>
              <Image style={styles.imgTab} source={require('../../Images/Analytics/Spending.png')} />
              <Text style={{ fontSize: 24, color: '#248841', fontFamily: 'Arial', fontWeight: 'bold' }}>Spending Breakdown</Text>

          </View>
          <View style={styles.fourthRow}>
                <Image style={styles.imgTab} source={require('../../Images/Analytics/PrevMonths.png')} />
                <Text style={{ fontSize: 24, color: '#248841', fontFamily: 'Arial', fontWeight: 'bold' }}>Previous Months</Text>
        </View>
            </View>

      </View>
    );
  }
}

/*<ScrollView>
    <Text style={styles.FrontHead}>Current Budget</Text>

    <PieChart
        data={dataPie}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
    />

    <Text style={styles.DetailHead}> Details </Text>
    <Text style={styles.DetailHead}> Last months </Text>
    <LineChart
        data={dataLine}
        width={screenWidth}
        height={256}
        yAxisLabel={'$'}
        verticalLabelRotation={30}
        chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#808080',
            color: (opacity = 1) => `rgba(0, 230, 0, ${opacity})`
        }}
        bezier
    />
</ScrollView>*/

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
    
  };
};

const mapDispatch = dispatch => {
  return {
    
  };
};

const AnalyticsConnect = connect(mapState,mapDispatch)(Analytics);

export default AnalyticsConnect;

export const AnalyticsScreen = createStackNavigator({ Analytics: { screen: AnalyticsConnect }});