// Imports
import React from "react";
import PlayerOne from "../playerOne/PlayerOne.js";
import Button from "@mui/material/Button";
import Dealer from "../dealer/Dealer.js"
import {
  NewDeckOfCard,
  drawTwoCardFromExistingDeck,
} from "../../axiosCalls/AxiosCalls.js";

// Style
import "./home.css";

const Home = () => {
  // STATES:
  const [deckId, setDeckId] = React.useState(null);
  const [player1cards, setPlayer1Cards] = React.useState();
  const [player1Details, setPlayer1Details] = React.useState(null);
  const [dealerDetails, setDealerDetails] = React.useState();
  const [dealerCards, setDealerCards] = React.useState();
  const [isLetsPlayClicked, setIsLetsPlayClicked] = React.useState(false);

  // LifesCyle:
  React.useEffect(() => {
    if (deckId !== null) {
      initialDealerDraw(deckId);
    }
  }, [deckId]);

  // Functions
  const initialDealerDraw = (deckId) => {
    // Dealer draws two cards
    drawTwoCardFromExistingDeck(deckId)
      .then((res) => {
        // gives them to player 1
        setPlayer1Cards(res.data.cards);
        setPlayer1Details(res.data);
      })
      .then(() => {
        // Dealer Draws second card
        drawTwoCardFromExistingDeck(deckId).then((res) => {
          // keeps for himself
          setDealerCards(res.data.cards);
          setDealerDetails(res.data);
        });
      });
  };

  return (
    <div className="home-container">
      {!isLetsPlayClicked && (
        <Button
          variant="contained"
          onClick={() => {
            NewDeckOfCard().then((res) => {
              setDeckId(res.data.deck_id);
              setIsLetsPlayClicked(true);
            });
          }}
          className="playButton"
        >
          Lets Play
        </Button>
      )}

      {isLetsPlayClicked && (
        <div className="players-container" >
          <div className="dealer-container">
            <Dealer
              deckId={deckId}
              player2cards={dealerCards}
              dealerDetails={dealerDetails}
            />
          </div>
          <div className="player-one-container ">
            <PlayerOne
              deckId={deckId}
              player1cards={player1cards}
              player1Details={player1Details}
              dealerDetails={dealerDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
