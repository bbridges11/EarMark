
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Modal, TouchableOpacity, Picker, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { getAccTransData } from '../../store/accountTransactions';
import { getBudget } from '../../store/budget'
import { getLatestAccData } from '../../store/token'
import { bindActionCreators } from 'redux';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      loading: true,
      OGdataLoaded: false,
      nextBill: null,
      name: '',
      amount: '',
      category: '',
      dueDate: new Date()
    }
    this.getAccTran.bind(this)
    this.getNextBill.bind(this)
  }

  componentDidUpdate( prevProps, prevState) {
    console.log(JSON.stringify(prevState), this.state.nextBill)
    if(prevState.nextBill !== this.state.nextBill) {
      this.setState({
        nextBill: this.state.nextBill
      })
    }
  }

  getAccTran = () => {
    if(this.state.loading) {
      this.props.getAccTransData(this.props.user._id)
      setTimeout(() => {
        if(this.props.transactions !== undefined) {
          this.setState({
            loading: false,
            OGdataLoaded: true
          })
          this.getNextBill()
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
      }, 200)
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  getNextBill = () => {
    const { transactions } = this.props;
    for(var i = 0; i < transactions.length; i++) {
      console.log('inside', transactions[i])
      if(transactions[i].type === 'standing order') {
        console.log('inside2')

        this.setState({
          nextBill: transactions[i]
        })
        break;
      }
    }
  }

  componentDidMount() {
    this.getAccTran()
    this.props.getBudget(this.props.user._id);
    //this.getNextBill()
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
    const arr = []
    const { budget, transactions } = this.props;
    const { nextBill, modalVisible, dueDate, name, amount, category } = this.state;
    return(
      <View style={styles.background}>
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { alert("Modal has been closed."); }}>
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
        <View style={styles.container}>
          <View style={styles.circle}>
            <Text style={styles.welcome}>Welcome back!</Text>
            <Text style={styles.balance}>${budget.spendingBudget}</Text>
            <Text style={styles.budget}>You have ${budget.spendingBudget} in your budget</Text>
            { nextBill === null ?   <Text style={styles.reminder}>Congratulations! You have no outstanding bills</Text>
              :<Text style={styles.reminder}>Your {nextBill.name} bill is coming up on soon</Text>
            }
            <View style={styles.button}>
              <Text onPress={() => {this.setModalVisible(true); }} style={styles.buttonText}>Add Bill</Text>
            </View>
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

    circle: {
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
    }
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