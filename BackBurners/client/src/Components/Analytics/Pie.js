import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, Dimensions, Animated, StyleSheet } from 'react-native';
import { PieChart} from "react-native-chart-kit";


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

class Pie extends Component {
    render() {
        return (
            <View>
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

            </View>
        );
    }
}