
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { getAccTransData } from '../../store/accountTransactions';
import { getBudget } from '../../store/budget'
import { getLatestAccData } from '../../store/token'
import { bindActionCreators } from 'redux';
const moment = require('moment');

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      OGdataLoaded: false
    }
    this.getAccTran.bind(this)
  }

  getAccTran = () => {
    console.log(this.state)
    if(this.state.loading) {
      this.props.getAccTransData(this.props.user._id)
      setTimeout(() => {
        if(this.props.transactions !== undefined) {
          this.setState({
            loading: false,
            OGdataLoaded: true
          })
          /*if(this.state.OGdataLoaded) {
            console.log('HEREEEE')
            var date_time = this.props.transactions[0].createdAt;
            console.log(date_time)
            var isBefore = moment(date_time).isBefore(moment().toISOString())
            console.log(isBefore)
            if(isBefore) {
              this.props.getLatestAccData(this.props.user._id)
              setTimeout(() => {
                date_time = this.props.transactions[0].createdAt;
                console.log(date_time)
                isBefore = moment(date_time).isBefore(moment().toISOString())
                if(!isBefore) {
                  this.setState({
                    OGdataLoaded: false
                  })
                }
              }, 3000)
            }
          }*/
        }
      }, 3000)
    }
  }

  componentDidMount() {
    this.getAccTran()
    this.props.getBudget(this.props.user._id)
  }

  render() {
    const arr = [];
    const { budget } = this.props;
        return(
            <View style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.circle}>
                        {/*<View style={styles.circle_two}>*/}
                            <Text style={styles.welcome}>Welcome back!</Text>
                            <Text style={styles.balance}>${budget.spendingBudget}</Text>
                            <Text style={styles.budget}>You have ${budget.spendingBudget} in your budget</Text>
                            { arr.length > 0 ?   <Text style={styles.reminder}>Congratulations! You have no outstanding bills</Text>
                                :<Text style={styles.reminder}>Your Netflix bill is coming up tomorrow</Text>
                            }
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Add Bill</Text>
                            </View>
                        {/*</View>*/}
                    </View>
                </View>
            </View>
        );
  }
}

const styles = StyleSheet.create({

    background:{
        // backgroundColor: '#BCFDC1',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // container: {
    //
    //     backgroundColor: '#BCFDC1',
    //     width:374,
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: 400,
    // },

    circle: {
        // backgroundColor: 'rgba(255,255,255,0.5)',
        backgroundColor: '#F1FFF1',
        width: 375,
        height: 375,
        borderRadius: 375 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    circle_two: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 250,
        height: 300,
        borderRadius: 300 / 2,
        // justifyContent: 'center',
        alignItems: 'center',
    },

    welcome:{
        fontSize:22,
        color: '#248841',
    },

    balance:{
        fontSize: 60,
        color: '#248841',
        paddingBottom: 30,
        paddingTop: 40,
        justifyContent: 'center',
    },

    budget:{
        fontSize: 22,
        color: '#248841',
        paddingBottom: 15,
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    reminder:{
        color: '#248841',
        paddingBottom: 10,
        justifyContent: 'center',
    },
    buttonText:{
        color: '#F1FFF1',
    //     width: 80,
    //     height: 25,
    //     backgroundColor: '#BCFDC1',
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: "center",
    //     borderRadius: 12,
    //     marginTop:15,
        fontSize: 22,
    },
    button:{
        backgroundColor: '#789F64',
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },


})

const mapState = state => {
  return {
    user: state.user,
    budget: state.budget,
    transactions: state.accTrans.trans
  };
};

const mapDispatch = dispatch => {
  return bindActionCreators({
    getAccTransData,
    getLatestAccData,
    getBudget
  }, dispatch)
};

const HomeConnect = connect(mapState,mapDispatch)(Home);

export default HomeConnect;

export const HomeScreen = createStackNavigator({ Home: { screen: HomeConnect }});