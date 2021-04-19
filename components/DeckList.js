import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import {handleInitialData} from '../actions/shared'
import Deck from './Deck'

class DeckList extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() { 
        const { decks } = this.props
        return ( 
            <View style={styles.deckContainer}>
                {
                    Object.values(decks).map((deck) => {
                        return(
                            <TouchableOpacity key={deck.title} onPress={() => this.props.navigation.navigate('DeckDetail', {title: deck.title})}>
                                <Deck deck={deck} />
                            </TouchableOpacity>
                        )                       
                    })
                }
            </View>           
         );
    }
}
function mapToStateProp({decks}) {
    return {
        decks
    }
}
export default connect(mapToStateProp)(DeckList);

const styles = StyleSheet.create({
    deckContainer: {
        flex:1,
        justifyContent: 'space-around'
    }
})