import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { deleteDeck } from '../actions/decks'
import Deck from './Deck'
import { deleteDeckFromStorage } from '../utils/api'

class DeckDetail extends Component {
    handleDeckDelete = (deletedDeck) => {
        const {dispatch, navigation} = this.props
        deleteDeckFromStorage(deletedDeck)
        dispatch(deleteDeck(deletedDeck))
        navigation.goBack()
    }
    render() { 
        const { deck, navigation } = this.props
        if(deck === undefined) {
            return (
                <View><Text>Deck not found!!</Text></View>
            )
        }
        return ( 
            <View style={styles.deckDetail}>
                <Deck deck={deck} />
                <View style={styles.btns}>
                    <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddCard', {title: deck.title})}>
                        <Text>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Quiz', {deck: deck})}>
                        <Text style={styles.quizBtn}>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleDeckDelete(deck.title)}>
                        <Text style={{color:'red'}}>Delete Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
         );
    }
}

const styles = StyleSheet.create({
    deckDetail: {
        flex: 1,
        justifyContent: 'space-around'
    },
    btns: {
        alignItems: 'center'
    },
    addBtn : {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        marginBottom: 30
    },
    quizBtn : {
        backgroundColor: 'black',
        color: 'white',
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        marginBottom: 30
    }
})


const mapToStateProp = ({decks}, {route, navigation}) => {
    const { title } = route.params
    const deck = decks[title]
    return {
        decks,
        deck,
        title,
        navigation
    }
}
export default connect(mapToStateProp)(DeckDetail);