
import React, { Component } from 'react';
import { connect, ReactReduxContext } from 'react-redux'
import { Text, View, StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { Table,  Row,  Rows} from 'react-native-table-component';

class Billing extends Component {
  constructor(props){
    super(props);
    this.state = {
    tableHead: ['TransID', 'Desc.', 'Date', 'Amount', 'Balance'],
    widthArr: [47, 90, 70, 80, 76],
    tableData: [
      ['104', 'ATM Cash Withdraw', '2/25/20', '$-60.00','$640.00'],
      ['103', 'Check Deposit', '1/29/20', '$500.00','$700.00'],
      ['102', 'Electricity Bill', '1/10/20', '$-250.00', '$200.00'],
      ['101', 'Utilities Bill', '1/03/20', '$-300.00', '$450.00']
    ]
  }
}

render() {
  const state = this.state;
  return (
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 2, borderColor: '#248841'}}>
        <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text}/>
        <Rows data={state.tableData} widthArr={state.widthArr} textStyle={styles.text}/>
      </Table>
    </View>
  )}
}//class end

const styles = StyleSheet.create({
  container: { flex: 1, padding: 6, paddingTop: 200, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#248841' },
  text: { margin: 8 }
});
const mapState = state => {
    return {
        
    };
};

const mapDispatch = dispatch => {
    return {
        
    };
};

const BillingConnect = connect(mapState, mapDispatch)(Billing);

export default BillingConnect;

export const ActivityScreen = createStackNavigator({
    Billing: { screen: BillingConnect },
});