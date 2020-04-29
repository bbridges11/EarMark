import React, { Component, useRef } from 'react';
import { connect } from 'react-redux'
import { Text, View, Dimensions, Animated, StyleSheet, Image, Button } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import { createStackNavigator } from 'react-navigation-stack';
import Budget from '../Landing/Budget'
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
};

/*const fadeAnim = useRef(new Animated.Value(0)).current;

const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000
    }).start();
};*/

class Pie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pieChartData: []
        }
    }

    initializeChart = () => {
        this.setState({
            pieChartData: [{
                name: "Munchies",
                amount: (this.props.budget.munchies * this.props.budget.spendingBudget) / 100,
                color: "#80ffaa",
                legendFontColor: "#7F7F7F",
                legendFontSize: 14
            },
            {
                name: "Travelling",
                amount: (this.props.budget.travelling * this.props.budget.spendingBudget) / 100,
                color: "#26FB64",
                legendFontColor: "#7F7F7F",
                legendFontSize: 14
            },
            {
                name: "Healthcare",
                amount: (this.props.budget.healthcare * this.props.budget.spendingBudget) / 100,
                color: "#00cc44",
                legendFontColor: "#7F7F7F",
                legendFontSize: 14
            },
            {
                name: "Service",
                amount: (this.props.budget.service * this.props.budget.spendingBudget) / 100,
                color: "#99ffbb",
                legendFontColor: "#7F7F7F",
                legendFontSize: 14
            },
            {
                name: "Shopping",
                amount: (this.props.budget.shopping * this.props.budget.spendingBudget) / 100,
                color: "#00cc66",
                legendFontColor: "#7F7F7F",
                legendFontSize: 14
            }]
        })
    }

    componentDidMount() {
        this.initializeChart()
    }
    render() {
        const { budget } = this.props;
        return (
            <View>        
                <Text style={styles.FrontHead}>Current Budget</Text>
                <Text style={styles.FrontHeadNum}>{budget.spendingBudget}</Text>
                <Animated.View style={[
                    styles.fadingContainer,
                    {
                        //opacity: fadeAnim // Bind opacity to animated value
                    }
                ]}>
                    <PieChart
                        data={this.state.pieChartData}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="amount"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />

                </Animated.View>

                <Button title={'Edit Budget'} style={styles.budgetButton} onPress={() => {this.props.navigation.navigate('Budget', { title: 'Budget' })}}>
                    <Text>Edit Budget</Text> 
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backButton: {
        padding: 5,
        //justifyContent: 'left'
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

const mapState = state => {
    return {
        budget: state.budget,
        user: state.user
    };
};

const mapDispatch = dispatch => {
    return {
        
    };
};

const PieConnect = connect(mapState,mapDispatch)(Pie);

export default PieConnect;

export const AnalyticsScreen = createStackNavigator({ 
  Pie: { screen: PieConnect },
  Budget: { screen: Budget }
});