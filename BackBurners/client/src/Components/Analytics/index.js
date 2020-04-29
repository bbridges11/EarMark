import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, Dimensions, StyleSheet, Button, Image , ScrollView} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { bindActionCreators } from 'redux'
import { getBudget } from '../../store/budget'
import Pie from './Pie'
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
              
              <Button style={styles.BigButton} title="Go to Pie Chart for Budget" onPress={() => {this.props.navigation.navigate('Pie', { title: 'Pie' } )}} />
            </View>
          </View>
          <View style={styles.thirdRow}>
            <Image style={styles.imgTab} source={require('../../Images/Analytics/spending.png')} />
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
  Budget: { screen: Budget }
});