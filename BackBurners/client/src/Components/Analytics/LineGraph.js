import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, Dimensions, Animated, StyleSheet, Button, Image } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { createStackNavigator } from 'react-navigation-stack';
import { ScrollView } from 'react-native-gesture-handler';
const moment = require('moment')
const screenWidth = Dimensions.get("window").width;

const dataLineApr = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
        {
            data: [465, 523, 700, 1000],
            color: "", // optional
            strokeWidth: 2 // optional
        }
    ]
};


class LineGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        dataLineApr.datasets
    }

    setAprilAmounts = () => {
        //dataLineApr.datasets
    }

    render() {
        return (
            <View>
                <View style={{
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: 'center',
                    /* alignItems: 'stretch',*/
                }}> 
                    <Text style={styles.FrontHead}>April</Text>
                </View>

                <View>
                    <LineChart
                        data={dataLineApr}
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
        fontSize: 23,
        color: "#248841"
    },
})

const mapState = state => {
    return {
        budget: state.budget,
        user: state.user,
        transactions: state.acc
    };
};

const mapDispatch = dispatch => {
    return {
        
    };
};

const LineConnect = connect(mapState,mapDispatch)(LineGraph);

export default LineConnect;

export const LineScreen = createStackNavigator({ 
    LineGraph: { screen: LineConnect },
});