import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { Card } from 'react-native-elements';
import Slider from 'react-native-slider';
import { connect } from 'react-redux';
import { updateBudget } from '../../../store/budget';
import { bindActionCreators } from 'redux';


class CategoryEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            remaining: 0
        }
    }   

    componentDidMount() {
        this.mounting()
    }

    mounting = () => {
        if (this.props.budget && this.props.budget.munchies !== this.state.categories.name) {
            this.setState({
                categories: [
                {
                    name: 'Munchies',
                    percentage: this.props.budget.munchies,
                },
                {
                    name: 'travelling',
                    percentage: this.props.budget.travelling,
                },
                {
                    name: 'healthcare',
                    percentage: this.props.budget.healthcare,
                },
                {
                    name: 'service',
                    percentage: this.props.budget.service,
                },
                {
                    name: 'shopping',
                    percentage: this.props.budget.shopping,
                }],
                remaining: 100 - this.props.budget.munchies - this.props.budget.travelling - this.props.budget.healthcare - this.props.budget.service - this.props.budget.shopping
            })
        } else {
          return null;
        }
    }

    handleSubmit = () => {
        this.props.updateBudget({
            ...this.props.budget,
            munchies: this.state.categories[0].percentage,
            travelling: this.state.categories[1].percentage,
            healthcare: this.state.categories[2].percentage,
            service: this.state.categories[3].percentage,
            shops: this.state.categories[4].percentage
        }, this.props.user._id);
        this.props.navigation.navigate('Home', { title: 'Home' });
    }

    render() {
        return(
            <ScrollView>
                <View>
                    {this.props.budget.userId && (
                        <View>
                        <View>
                            <Text>Edit Your Budget</Text>
                            <View>
                                <Text>{this.state.remaining}% ${(this.props.budget.spendingBudget * this.state.remaining) / 100}</Text>
                            </View>

                            <View>
                                <Text>remaining</Text>
                                <Text>of ${this.props.budget.spendingBudget}</Text>
                            </View>
                        </View>
                        <View style={{ paddingLeft: 5, paddingRight: 5 }} />
                            {this.state.categories &&
                                this.state.categories.map(category => {
                                return (
                                    <Card key={category.name} containerStyle={{ margin: 30 }}>
                                        <View key={category.name}>
                                        <View style={{ padding: 5, width: '100%' }} />
                                        <View style={{ paddingLeft: 20, paddingEnd: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text >
                                            {category.name}
                                        </Text>

                                        <Text >
                                            {category.percentage}%
                                        </Text>
                                        </View>

                                        <Slider
                                        
                                        value={category.percentage}
                                        onSlidingComplete={value => {
                                            this.setState(prevState => {
                                            const remaining =
                                                prevState.remaining +
                                                (category.percentage - value);
                                            return {
                                                categories: [...prevState.categories].map(
                                                elem => {
                                                    
                                                    if (elem.name === category.name) {
                                                        console.log(elem.name,value)
                                                    elem.percentage = value;
                                                    return elem;
                                                    } else {
                                                    return elem;
                                                    }
                                                }
                                                ),
                                                remaining: remaining
                                            };
                                            });
                                        }}
                                        step={5}
                                        minimumValue={0}
                                        maximumValue={100}
                                    />
                                    </View>
                                    </Card>
                                );
                            })}

                            <Button textStyle={{ textAlign: 'center' }} title={`Continue to Home`} onPress={() => { this.handleSubmit() }}>
                                Continue to Home
                            </Button>
                        </View>
                    )}
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        budget: state.budget,
        user: state.user,
        plaid: state.plaid
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        updateBudget
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit);