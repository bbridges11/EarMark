
import React, { Component, useState } from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, Picker } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { bindActionCreators } from 'redux';
import { updateAccTrans } from '../../store/accountTransactions'
import Billing from './billing'

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: '',
      amount: '',
      category: '',
      dueDate: new Date()
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  handleSubmit = () => {
    const { name, amount, category } = this.state;
    if(name !== '' && category !== '' && amount !== '') {
      const newTrans = {
        name: this.state.name,
        amount: this.state.amount,
        category: this.state.category,
        date: this.state.dueDate,
        type: 'standing order',
        userId: this.props.user._id
      }
      this.props.updateAccTrans(newTrans)
    }
  }

  render() {
    const { modalVisible, dueDate, name, amount, category } = this.state;
    return(
      <View >
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalView}>
            <Text style={{textAlign: "center", marginTop: 5, color: '#54C134', fontWeight: 'bold', fontSize: 22}}>ADD BILL</Text>
            <View style={styles.inputField}>
              <TextInput style={styles.text}  placeholder="Name" 
              onChangeText={currtext => this.setState({ name: currtext })} value={this.state.name}/>
            </View>
            <View style={styles.inputField}>
              <TextInput style={styles.text} placeholder="Amount"
              onChangeText={currtext => this.setState({ amount: currtext })} value={this.state.amount}/>
            </View>
            <View style={styles.inputField}>
                <TextInput style={styles.text}  placeholder="Category" 
                onChangeText={currtext => this.setState({ category: currtext })} value={this.state.category}/>
              </View>
            
            {name !== '' && amount !== 0 && category !== ''?<DateTimePicker date={ dueDate } value={ dueDate } mode={'date'} is24Hour={true} display="default" onChange={ (newDate) => { const updated = new Date(newDate.nativeEvent.timestamp); this.setState({ dueDate: updated }) }} /> : null}
            <View style={styles.buttonview}>
              <TouchableOpacity activeOpacity={0.6} style={styles.button} title={`Add Your Bill`} onPress={() => { this.setModalVisible(!modalVisible); this.handleSubmit() }}>
                 <Text style={styles.buttontext}>Add Your Bill</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View>
          <Text style={styles.priceLabel}>$ 423.00</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.billInfo}>
              <View>
                <Text>Electric</Text>
                <Text style = {{color: '#789F64', fontWeight: 'bold', paddingTop: 5}}>Pending --</Text>
              </View>  
              <View style={styles.paidButton}>
                <Text>PAID</Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'center'}}>
            <TouchableOpacity activeOpacity={0.6} style={styles.billButton} title={"Add Bill"} onPress={() => { this.setModalVisible(true); }}>
              <Text style={styles.billText}>
                Add Bill
              </Text> 
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.rechargeLabel}>Recharge & Bills</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.myButton}>
              <Text onPress={() => {this.props.navigation.navigate('Billing', { title: 'Billing' });}}>Munchies</Text>
            </View>
            
            <View style = {styles.myButton}>
              <Text onPress={() => {this.props.navigation.navigate('Billing', { title: 'Billing' });}}>Travelling</Text>
            </View>

            <View style = {styles.myButton}>
              <Text onPress={() => {this.props.navigation.navigate('Billing', { title: 'Billing' });}}>Healtcare</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginLeft: 75}}>
            <View style = {styles.myButton}>
              <Text onPress={() => {this.props.navigation.navigate('Billing', { title: 'Billing' });}}>Service</Text>
            </View>

            <View style = {styles.myButton}>
              <Text onPress={() => {this.props.navigation.navigate('Billing', { title: 'Billing' });}}>Shopping</Text>
            </View>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  myButton:{
    margin: 35,
    height: 70,
    width: 70,  //The Width must be the same as the height
    borderRadius:140, //Then Make the Border Radius twice the size of width or Height
    fontSize: 12,
    backgroundColor:'#C6E0C3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPhoto:{
    marginLeft: 35,
    marginTop: 35,
    height: 70,
    width: 70,  //The Width must be the same as the height
    borderRadius: 140, //Then Make the Border Radius twice the size of width or Height
    fontSize: 12,
    backgroundColor:'#C6E0C3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paidButton:{
    marginLeft: 40,
    marginBottom: 40,
    fontSize: 30,
    height: 50,
    width: '70%',
    padding: 10,
    color: '#FFFFFF', 
    backgroundColor:'#789F64',
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceLabel:{
    fontSize: 40,
    color: '#248841',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingRight: 10,
    paddingTop: 30
  },
  rechargeLabel:{
    color: '#54C134',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: 30,
    paddingBottom: 15
  },
  billInfo:{
    padding:50,
    flexDirection: 'row'
  },
  billButton: {
    width: '90%',
    backgroundColor: '#54C134',
    height: 40
  },
  billText: {
    fontSize: 28,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#fff'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  inputField: {
    flexDirection: 'row',
    justifyContent: 'center',
    //alignItems: 'center',
    borderBottomWidth: 2, 
    borderBottomColor: '#248841',
    height: 40,
    margin: 10,
    marginBottom: 60,
    paddingBottom: 10
  },
  text: {
    flex: 1,
  },
  button: {
    width: 310,
    height: 50,
    backgroundColor: '#54C134',
    justifyContent: "center",
    alignSelf: "stretch",
    textAlignVertical: "center",
    borderRadius: 12
  },
  buttontext: {
    fontSize: 28,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#fff'
  }
})

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return bindActionCreators({
    updateAccTrans
  }, dispatch);
};

const ActivityConnect = connect(mapState,  mapDispatch)(Activity);

export default ActivityConnect;

export const ActivityScreen = createStackNavigator({
  Activity: { screen: ActivityConnect },
  Billing: { screen: Billing }
});
