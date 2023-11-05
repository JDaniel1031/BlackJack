import axios from "axios"


export const shuffleCardsWithID = async (deckId) => {
    // Make a GET request to the API endpoint
    await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/?deck_count=1`)
};


export const NewDeckOfCard = async () => {
    // Make a GET request to the API endpoint
    return await axios.get('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  }  



export const drawTwoCardFromExistingDeck = async (deckId) => {
    // Make a GET request to the API endpoint
   return await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
  }

  export const drawOneCardFromExistingDeck = async (deckId) => {
    // Make a GET request to the API endpoint
   return await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
  }

