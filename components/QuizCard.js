import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

class QuizCard extends Component {
    state = { 
        showAnswer: false,
        isAnswered: false
    }
    handleShowAnswer = () => {
        this.setState(prevState=>({
            showAnswer: !prevState.showAnswer
        }))
    }
    handleAnswer = (answer,index) => {
        this.props.handleScore(answer,index)
        this.setState({
            isAnswered: true
        })
    }
    render() { 
        const {ques, index} = this.props
        const {showAnswer, isAnswered} = this.state
        return ( 
            <View>
                {
                    showAnswer === true ? 
                    <Text style={styles.title}>{ques.answer}</Text>:
                    <Text style={styles.title}>{ques.question}</Text>
                }
                <TouchableOpacity onPress={()=> this.handleShowAnswer()}><Text style={styles.answerBtn}>{showAnswer === true ? 'Show Question':'Show Answer'}</Text></TouchableOpacity>           
                <View style={styles.btns}>
                    <TouchableOpacity disabled={isAnswered} onPress={()=> this.handleAnswer('correct',index)}><Text style={[styles.btn, styles.correct, isAnswered ? styles.disableBtn:'']}>Correct</Text></TouchableOpacity>
                    <TouchableOpacity disabled={isAnswered} onPress={()=> this.handleAnswer('incorrect',index)}><Text style={[styles.btn, styles.incorrect, isAnswered ? styles.disableBtn:'']}>Incorrect</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginBottom: 20,
        marginTop:20,
        fontSize: 16
    },
    answerBtn : {
        color: 'red',
        textAlign: 'center'
    }, 
    btns: {
        alignItems: 'center'
    },  
    btn: {
        padding: 8,
        marginTop: 10,
        marginBottom: 10,
        width: 150,
        textAlign: 'center'
    },
    disableBtn: {
        borderWidth:1,
        borderColor: '#ccc',
        color: '#ccc',
        backgroundColor: 'transparent'
    },
    correct: {
        borderColor: 'green',
        borderWidth:1,
        color: 'green'
    },
    incorrect: {
        backgroundColor: 'grey',
        color: 'white'
    }
    
})

export default QuizCard;