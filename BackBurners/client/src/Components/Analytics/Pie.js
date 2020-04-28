import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, Dimensions, Animated, StyleSheet, Image, Button } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import { createStackNavigator } from 'react-navigation-stack';

// This is for the Budget screen after the pie chart
const screenWidth = Dimensions.get("window").width;

const totalBudget = 0; //suppose to add data from dataPie or Budget Set up

//data can be grabbed from the budget setup screen
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
    totalBudget += dataPie.amount;
}*/ //add datapie amount for total Budget

const fadeAnim = useRef(new Animated.Value(0)).current;

const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000
    }).start();
};

class Pie extends Component {
    render() {
        return (
            /*Back Button*/
            <View>        
                <Button style={styles.backButton} onPress={() => this.props.navigation.navigate('Analytics/index')}>   
                    <Image source={require('../../Images/Analytics/BBack Symbol.png')} />
                </Button> 

                <Text style={styles.FrontHead}>Current Budget</Text>
                <Text style={styles.FrontHeadNum}>1000$</Text>
                <Animated.View style={[
                    styles.fadingContainer,
                    {
                        opacity: fadeAnim // Bind opacity to animated value
                    }
                ]}>
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

                </Animated.View>

                <Button style={styles.budgetButton}>
                    <Text>Edit Budget</Text> 
                </Button>
            </View>
                //link button above to budget set up screen
        );
    }
}

const styles = StyleSheet.create({
    backButton: {
        padding: 5,
        justifyContent: 'left'
    },

    FrontHead: {
        justifyContent: "center",
        alignItems: 'center',
        padding: 10,
        fontSize: 3,
        color: "#248841"
    },

    FrontHeadNum: {
        justifyContent: "center",
        alignItems: 'center',
        padding: 10,
        fontSize: 40,
        color: "#4acf6f"
    },

    budgetButton: {
        marginLeft: 40,
        marginBottom: 40,
        fontSize: 30,
        height: 50,
        width: '80%',
        padding: 10,
        color: '#FFFFFF',
        backgroundColor: '#789F64',
        justifyContent: 'center',
        alignItems: 'center'
    }
})