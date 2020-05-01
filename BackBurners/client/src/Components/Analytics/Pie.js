import React, { Component, useRef } from 'react';
import { connect } from 'react-redux'
import { Text, View, Dimensions, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
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
                <View style={{
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>        
                    <Text style={styles.FrontHead}>Current Budget</Text>
                    <Text style={styles.FrontHeadNum}>{budget.spendingBudget}</Text>
                </View>

                <View>
                    <PieChart style={styles.PieC}
                            data={this.state.pieChartData}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                            accessor="amount"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            absolute
                    />
                </View>

                <View style={{
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>  
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this.props.navigation.navigate('Budget', { title: 'Budget' }) }}>
                        <Text style={{
                            color: "white",
                            fontSize: 20,
                        }}>Edit Budget</Text> 
                        </TouchableOpacity>
                </View>
                
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
        alignContent: "center",
        margin: 10,
        marginTop: 20,
        marginBottom: 20,
        fontSize: 30,
        color: "#248841"
    },

    FrontHeadNum: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        fontSize: 40,
        color: "#4acf6f"
    },

    PieC: {
        marginTop: 30,
        marginBottom: 30,
    },

    button: {
        width: "50%",
        padding: 10,
        marginTop: 30,
        marginBottom: 30,
        display: "flex",
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'center',
        color: '#1aff1a',
        backgroundColor: '#789F64',
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