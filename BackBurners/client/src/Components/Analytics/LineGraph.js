import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, Dimensions, Animated, StyleSheet } from 'react-native';
import {
    LineChart, 
} from "react-native-chart-kit";
//import { LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { ScrollView } from 'react-native-gesture-handler';

class LineGraph extends Component {
    render() {
        return (
            <View>
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
        );
    }
}
