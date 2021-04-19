import { ADD_CARD, ADD_DECK, DELETE_DECK, RECEIVE_DECKS } from "../actions/decks";

export function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_CARD:
            const {deckId, card} = action;
            return {
                ...state,
                [deckId] : {
                    ...state[deckId],
                    questions: [...state[deckId].questions].concat(card)
                }
            }
        case ADD_DECK:
            const {newDeck} = action
            return {
                ...state,
                [newDeck]: {
                   title: newDeck,
                   questions: [] 
                }
            }
        case DELETE_DECK:
            const {deletedDeck} = action
            const { [deletedDeck]:value, ...othersDecks } = state
            return othersDecks
        default:
            return state
    }
}
