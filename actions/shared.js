import { fetchDecks } from '../utils/api'
import { receiveDecks } from './decks'

export function handleInitialData () {
    return (dispatch) => {
        return fetchDecks().then((decks) => {
            dispatch(receiveDecks(decks))
        })
    }
}

