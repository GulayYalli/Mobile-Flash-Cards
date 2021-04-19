import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { addCardToDeck } from '../actions/decks'
import { addCardToStorage } from '../utils/api'

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }
    handleAnswerChange = answer => {
        this.setState({
            answer
        })
    }
    handleQuestionChange = question => {
        this.setState({
            question
        })
    }
    handleSubmit = () => {
        const {dispatch, title, navigation} = this.props
        const card = {
            question: this.state.question,
            answer: this.state.answer
        }
        addCardToStorage(title, card)
        dispatch(addCardToDeck(title, card))
        this.setState({
            question: '',
            answer: ''
        })
        navigation.goBack()
    }
    render() { 
        return ( 
            <View style={{padding:10}}>
                <View>
                    <Text style={styles.title}>Add a Card</Text>
                    <View style={styles.inputWrap}>
                        <TextInput style={styles.input} type="text" placeholder="Question1" onChangeText={this.handleQuestionChange} value={this.state.question} />
                    </View>
                    <View style={styles.inputWrap}>
                        <TextInput style={styles.input} type="text" placeholder="Answer" onChangeText={this.handleAnswerChange} value={this.state.answer}  />
                    </View>
                </View>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmit} disabled={this.state.question=='' || this.state.answer==''}><Text style={{color:'#fff'}}>Submit</Text></TouchableOpacity>
                </View>
            </View>
         );
    }
}

const styles = StyleSheet.create({
    submitBtn : {
        backgroundColor: 'black',
        padding:10,
        paddingRight: 40,
        paddingLeft: 40
    },
    inputWrap: {
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        marginTop:20,
        fontSize: 18
    }
})
const mapToStateProp = ({}, {route, navigation}) => {
    const { title } = route.params
    return {
        title,
        navigation
    }
}
export default connect(mapToStateProp)(AddCard)