import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, Dimensions, Animated, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";
/*import * as shape from 'd3-shape'
import { ScrollView } from 'react-native-gesture-handler';*/

const screenWidth = Dimensions.get("window").width;

const dataLineMar = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
        {
            data: [120, 143, 235, 80],
            color: "", // optional
            strokeWidth: 2 // optional
        }
    ]
};

const dataLineFeb = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
        {
            data: [150, 263, 128, 100],
            strokeWidth: 2 
        }
    ]
};

class LineGraph extends Component {
    render() {
        return (
            <View>
                <Button style={styles.backButton}  onPress={() => this.props.navigation.navigate('Analytics/index')}>
                    <Image source={require('../../Images/Analytics/BBack Symbol.png')} />
                </Button> 

                <Text style={styles.FrontHead}>March</Text>

                <View>
                    <LineChart
                        data={dataLineMar}
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

                <Text style={styles.FrontHead}>February</Text>

                <View>
                    <LineChart
                        data={dataLineFeb} // second line graph for 
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
        justifyContent: 'left'
    },

    FrontHead: {
        justifyContent: "center",
        alignItems: 'center',
        padding: 10,
        fontSize: 3,
        color: "#248841"
    },
})

