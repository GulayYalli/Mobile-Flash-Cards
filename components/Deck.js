import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Deck extends Component {
    render() { 
        const { deck } = this.props
        return ( 
            <View style={styles.deck}>
                <Text style={styles.decktitle}>{deck.title}</Text>
                <Text style={{color:'grey'}}>{deck.questions.length ? deck.questions.length : 0} cards</Text>
            </View>
         );
    }
}
 
export default Deck;

const styles = StyleSheet.create({
    decktitle: {
        fontSize: 16,
        color: 'grey'
    },
    deck: {
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        paddingTop:20,
        paddingBottom: 20
    }
})