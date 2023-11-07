// Imports
import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { drawOneCardFromExistingDeck } from "../../axiosCalls/AxiosCalls.js";
import Stack from "@mui/material/Stack";
import useStore from "../gameStore/useStore.js";
import "./PlayerOne.css";
import "react-toastify/dist/ReactToastify.css";

const PlayerOne = ({ deckId, player1cards, player1Details, dealerDetails }) => {
  // STATES:
  const [player1CardObj, setPlayer1CardObj] = React.useState(player1cards);
  const [player1CardFaceValues, setPlayer1CardFaceValues] =
    React.useState(null);
  const [hitCards, setHitCards] = React.useState(null);
  const [score, setScore] = React.useState(null);
  const [player1Result, setPlayer1Result] = React.useState(null);
  const [gameState, setGameState] = React.useState("playing");
  const { stateObject, updateStateObject  } = useStore();


  const handleIsGameOver = (myBool) => {
    // Update the state object
    updateStateObject({ isGameOver: myBool });
  };
  const handleStay = (myBool) => {
    // Update the state object
    updateStateObject({ playerOneStay: myBool });
  };

  React.useEffect(() => {
    if (score >= 21 ) {
      handleIsGameOver(true);
    }
  }, [score]);

  // LifeCycle:
  React.useEffect(() => {
    if (player1cards !== null) {
      setPlayer1CardObj(player1cards);
    }
  }, [player1cards]);

  React.useEffect(() => {
    if (deckId !== null && player1cards !== null) {
      const cardVals = player1cards?.map((element) => element.value);
      setPlayer1CardFaceValues(cardVals);
    }
  }, [deckId, player1cards]);

  React.useEffect(() => {
    if (deckId !== null && hitCards !== null) {
      const cardVals = hitCards?.map((element) => element.value);
      const newArray = player1CardFaceValues.concat(cardVals);
      setPlayer1CardFaceValues(newArray);
    }
  }, [deckId, hitCards, player1CardFaceValues]);

  React.useEffect(() => {
    if (!player1CardFaceValues || player1CardFaceValues.length === 0) {
      return;
    }

    let result = 0;
    let aceCount = 0
    player1CardFaceValues.forEach((element) => {
      if (element === "ACE") {
        result += 11;
        aceCount += 1;
      } else if (["KING", "QUEEN", "JACK"].includes(element)) {
        result += 10;
      } else {
        const nums = parseInt(element, 10);
        result += isNaN(nums) ? 0 : nums;
      }
    });
    
    while (aceCount > 0 && result > 21) {
      result -= 10;
      aceCount -= 1;
    }
    setScore(result);
  }, [player1CardFaceValues, hitCards, player1CardObj]);

  // Functions:

  const resetGame = () => {
    setPlayer1CardObj([]);
    setPlayer1CardFaceValues([]);
    setHitCards([]);
    setScore(null);
    setPlayer1Result(null);
    setGameState("playing");
  };

  React.useEffect(() => {
    if (gameState !== "playing") {
      resetGame();
    }
  }, [gameState, resetGame]);

  const renderImageList = (cards) => (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {cards?.map((item) => (
        <ImageListItem key={item.image}>
          <img
            srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
            alt={item.code}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );

  return (
    <>
      <div>
        <div className="card-renders">
          {player1CardObj !== null && renderImageList(player1CardObj)}
        </div>
        <div>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              disabled={score > 21}
              onClick={() => {
                drawOneCardFromExistingDeck(deckId).then((res) => {
                  setPlayer1CardObj((prev) => [...prev, ...res.data.cards]);
                  setPlayer1CardFaceValues((prev) => [
                    ...prev,
                    ...res.data.cards.map((card) => card.value),
                  ]);
                });
              }}
            >
              Hit Me
            </Button>
            <Button
              variant="contained"
              disabled={stateObject.playerOneStay}
              onClick={() => {
                handleStay(true)
              }}
            >
              Stay
            </Button>
            <TextField
              id="outlined-number"
              label="Player 1 Total"
              type="number"
              size="small"
              width="100%"
              variant="filled"
              value={score}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
        </div>
      </div>
    </>
  );
};

export default PlayerOne;
