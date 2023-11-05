// Home.js
import React from "react";
import PlayerOne from "../playerOne/PlayerOne.js";
import Dealer from "../dealer/Dealer.js";
import Button from "@mui/material/Button";

import {
  NewDeckOfCard,
  drawTwoCardFromExistingDeck,
} from "../../axiosCalls/AxiosCalls.js";

import "./home.css";
const Home = () => {
  const [deckId, setDeckId] = React.useState(null);
  const [player1cards, setPlayer1Cards] = React.useState();
  const [player1Details, setPlayer1Details] = React.useState(null);
  const [dealerDetails, setDealerDetails] = React.useState();
  const [dealerCards, setDealerCards] = React.useState();

  const initialDealerDraw = (deckId) => {
    // Dealer draws two cards
    drawTwoCardFromExistingDeck(deckId)
      .then((res) => {
          // gives them to player 1
          setPlayer1Cards(res.data.cards)
          setPlayer1Details(res.data)
      })
      .then(() => {
        // Dealer Draws second card
        drawTwoCardFromExistingDeck(deckId).then((res) => {
          // keeps for himself
          setDealerCards(res.data.cards);
          setDealerDetails(res.data)
        });
      });
  };
  React.useEffect(()=>{
    if(deckId !== null){

      initialDealerDraw(deckId)
    }
  },[deckId])
  return (
    <>
      <div className="containerStyle">
        <PlayerOne deckId={deckId} player1cards={player1cards} player1Details={player1Details} dealerDetails={dealerDetails} />

        <Dealer deckId={deckId} player2cards={dealerCards} dealerDetails={dealerDetails}/>
      </div>
      <div className="containerStyleButton">

      <Button 
          variant="contained"
          onClick={() => {
            NewDeckOfCard().then((res) => {
              setDeckId(res.data.deck_id);
            });
          }}
        >
          Lets Play
        </Button>
      </div>
    </>
  );
};

export default Home;
