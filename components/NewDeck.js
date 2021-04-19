import React, { Component } from 'react'
import {connect} from 'react-redux'
import { View,Text, StyleSheet, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { addDeck } from '../actions/decks'
import { StackActions } from '@react-navigation/native'
import { addNewDeckToStorage } from '../utils/api'

class NewDeck extends Component {
    state = {
        newDeck: ''
    }
    handleInputChange = newDeck => {
        this.setState({
            newDeck
        })
    }
    handleSubmitDeck = () => {
        const newDeck = this.state.newDeck
        const {dispatch, navigation} = this.props
        dispatch(addDeck(newDeck))
        addNewDeckToStorage(newDeck)
        this.setState({
            newDeck: ''
        })
        navigation.dispatch(
            StackActions.push('DeckDetail', {
              title: newDeck
            })
        )
    }
    render() { 
        return ( 
            <View style={styles.newDeck}>
               <Text style={styles.title}>What is the title of your new deck?</Text>
               <View style={styles.inputWrap}><TextInput style={styles.input} onChangeText={this.handleInputChange} value={this.state.newDeck} placeholder="Deck Title" autoFocus={true} onSubmitEditing={this.handleSubmitDeck} /></View>
               <View style={styles.btns}><TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmitDeck} disabled={this.state.newDeck == ''}><Text style={{color:'#fff'}}>Create Deck</Text></TouchableOpacity></View>
            </View>
         );
    }
}

const styles = StyleSheet.create({
    newDeck: {
        flex: 1,
        padding: 10
    },
    btns: {
        alignItems: 'center'
    },
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
function mapToStateProp({},{navigation}) {
    return {
        navigation
    }
}
export default connect(mapToStateProp)(NewDeck)