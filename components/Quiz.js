import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import QuizCard from './QuizCard'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

const windowWidth = Dimensions.get('window').width;

class Quiz extends Component {
    state = {
        score: 0,
        resultPage: false
    }
    handleScore = (answer,index) => {
        if(answer === 'correct') {
            this.setState(prevState =>({
                score: prevState.score + 1
            }))
        }
        this.scrollView.scrollTo({ x: windowWidth * (index+1) })
        if(this.props.totalCard === (index+1)) {
            this.setState({
                resultPage: true
            })
        }
        clearLocalNotification().then(setLocalNotification)
    }
    handleReset = () => {
        this.setState({
            score: 0,
            resultPage: false
        })
    }
    render() {    
        const {deck, navigation, totalCard} = this.props
        const {score, resultPage} = this.state
        if(totalCard === 0){
            return(
                <View style={{flex:1, justifyContent:'space-around'}}>
                    <Text style={styles.title}>Sorry, you cannot take a quiz because there no cards in the deck.</Text>
                </View>
            )
        }
        return (        
            <View style={{paddingTop: 10, paddinBottom:10, flex:1}}>
                {resultPage ? <View>
                        <Text style={styles.title}>Your Score: {score} / {totalCard}</Text>
                        <View style={styles.btns}>
                            <TouchableOpacity onPress={this.handleReset}><Text style={[styles.btn, styles.restartBtn]}>Restart Quiz</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('DeckDetail', {title: deck.title})}><Text style={[styles.btn, styles.backBtn]}>Back To Deck</Text></TouchableOpacity>
                        </View>
                    </View>
                    : <View>
                        <Text style={styles.title}>{deck.title} Quiz</Text>
                        <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} scrollEnabled={false} ref={scrollView => {this.scrollView = scrollView}}>
                            {
                                deck.questions.map((ques,index) => {
                                    return(
                                        <View style={styles.scrollView} key={index+1}>
                                            <View style={{flex:1}}>
                                                <Text style={styles.status}>{index+1} / {totalCard}</Text>
                                                <QuizCard ques={ques} index={index} navigation={navigation} handleScore={this.handleScore} />
                                            </View>
                                        </View>
                                    )
                                })
                            }     
                        </ScrollView>
                    </View> 
                } 
            </View>
         );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        flexDirection: 'row',
        width: windowWidth

    },
    status: {
        color: 'grey',
        textAlign: 'center'
    },
    title: {
        textAlign: 'center',
        marginTop:20,
        fontSize: 18,
        fontWeight: 'bold'
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
    restartBtn: {
        borderColor: 'green',
        borderWidth:1,
        color: 'green'
    },
    backBtn: {
        backgroundColor: 'grey',
        color: 'white'
    }
})

const mapToStateProp = ({}, {route, navigation}) => {
    const { deck } = route.params
    const totalCard = deck.questions.length
    return {
        deck,
        navigation,
        totalCard
    }
}
 
export default connect(mapToStateProp)(Quiz);