import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, Dimensions, Animated, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {
    LineChart, BarChart, PieChart,
    ContributionGraph, StackedBarChart
} from "react-native-chart-kit";
//import { LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { ScrollView } from 'react-native-gesture-handler';

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

const dataPie = [
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
];

/*for (const i = 0; i <= dataPie.length; i++) {
    totalAmt += dataPie.amount;
}*/

const dataLine = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
        {
            data: [20, 43, 35, 80],
            color: "", // optional
            strokeWidth: 2 // optional
        }
    ]
};

/*Animated.timing(this.state.xPosition, {
    toValue: 100,
    easing: Easing.back(),
    duration: 2000,
}).start();*/

//<Text style={styles.Total}> console.log(totalAmt) </Text>

class Analytics extends Component {
  render() {
      return (
      <ScrollView>
        <View>
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
         
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    FrontHead: {
        justifyContent: "center",
        alignItems: 'center',
        padding: 10,
        fontSize: 35,
        color: "#248841"
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