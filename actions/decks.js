export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addCardToDeck(deckId, card) {
    return {
        type: ADD_CARD,
        deckId,
        card
    }
}

export function addDeck(newDeck) {
    return {
        type: ADD_DECK,
        newDeck
    }
}

export function deleteDeck(deletedDeck) {
    return {
        type: DELETE_DECK,
        deletedDeck
    }
}