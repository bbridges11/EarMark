
import React, { Component } from 'react';
import { connect, ReactReduxContext } from 'react-redux'
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { Table,  Row,  Rows} from 'react-native-table-component';
import { bindActionCreators } from 'redux';

class Billing extends Component {
  constructor(props){
    super(props);
    this.state = {
      tableHead: ['TransID', 'Desc.', 'Date', 'Amount'],
      widthArr: [47, 90, 70, 80],
      tableData: []
    }
  }

  componentDidMount() {
    const { transactions } = this.props;
    this.setState({
      tableData: transactions.map((trans, ind) => {
        return [trans.id, trans.name, trans.createdAt, trans.amount]
      })
    })
  }

  render() {
    const state = this.state;
    return (
      <ScrollView style={styles.container}>
        <Table borderStyle={{borderWidth: 1.5, borderColor: '#248841'}}>
          <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text}/>
          <Rows data={(state.tableData)} widthArr={state.widthArr} textStyle={styles.text}/>
        </Table>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 6, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#248841' },
  text: { margin: 8 }
});
const mapState = state => {
  return {
    user: state.user,
    accounts: state.accTrans.accounts,
    transactions: state.accTrans.trans
  };
};

const mapDispatch = dispatch => {
  return bindActionCreators({
      
  }, dispatch);
};

const BillingConnect = connect(mapState, mapDispatch)(Billing);

export default BillingConnect;

export const ActivityScreen = createStackNavigator({
    Billing: { screen: BillingConnect },
});