import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteDeck } from '../actions/decks';
import { decks } from "./_DATA"

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'; 

export async function fetchDecks() {
    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    if(storeResults == null) {
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    }
    return storeResults == null ? decks : JSON.parse(storeResults)
}

export async function addCardToStorage(title, card) {
    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const parsedStoreResults = JSON.parse(storeResults);
    parsedStoreResults[title] = {
        ...parsedStoreResults[title] = {
            ...parsedStoreResults[title],
            questions: [...parsedStoreResults[title].questions].concat(card)
        }

    }
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(parsedStoreResults))
}

export async function addNewDeckToStorage(newDeck) {
    await AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
            [newDeck]: {
              title:newDeck,
              questions: []
            }
        })
    )
}

export async function deleteDeckFromStorage(deletedDeck) {
    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const parsedStoreResults = JSON.parse(storeResults);
    parsedStoreResults[deletedDeck] = undefined
    delete parsedStoreResults[deleteDeck]
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(parsedStoreResults))
}