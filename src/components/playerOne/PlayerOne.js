// Imports

import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { drawOneCardFromExistingDeck } from "../../axiosCalls/AxiosCalls.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stack from "@mui/material/Stack";
import "./PlayerOne.css";

const PlayerOne = ({ deckId, player1cards, player1Details, dealerDetails }) => {
  // STATES:
  const [player1CardObj, setPlayer1CardObj] = React.useState(player1cards);
  const [player1CardFaceValues, setPlayer1CardFaceValues] =
    React.useState(null);
  const [hitCards, setHitCards] = React.useState(null);
  const [score, setScore] = React.useState(null);
  console.log(player1CardObj, "player1CardObj");
  console.log(player1CardFaceValues, "player1CardFaceValues");
  console.log(score, "score");
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
  }, [player1cards]);

  React.useEffect(() => {
    if (deckId !== null && hitCards !== null) {
      const cardVals = hitCards?.map((element) => element.value);

      const newArray = player1CardFaceValues.concat(cardVals);

      setPlayer1CardFaceValues(newArray);
    }
  }, [hitCards]);

  React.useEffect(() => {
    if (!player1CardFaceValues || player1CardFaceValues.length === 0) {
      return;
    }

    let result = 0;
    let aceCount = 0;

    player1CardFaceValues.forEach((element) => {
      if (element === "ACE" && result < 21) {
        // Prompt the player to decide if the value of "ACE" should be 11 or 1
        const isAce11 = window.confirm(
          "Do you want the value of ACE to be 11?"
        );
        if (isAce11) {
          result += 11;
        } else {
          result += 1;
        }
      } else if (["KING", "QUEEN", "JACK"].includes(element)) {
        result += 10;
      } else {
        const nums = parseInt(element, 10);
        result += isNaN(nums) ? 0 : nums;
      }
    });

    // Adjust ACE values based on the total result
    while (aceCount > 0 && result > 21) {
      result -= 10;
      aceCount -= 1;
    }

    setScore(result);
  }, [player1CardFaceValues, hitCards, player1CardObj]);

  // Functions:
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

  const notify = () =>
    toast.success("Hit!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
                drawOneCardFromExistingDeck(deckId)
                  .then((res) => {
                    setPlayer1CardObj((prev) => [...prev, ...res.data.cards]);
                    setPlayer1CardFaceValues((prev) => [
                      ...prev,
                      ...res.data.cards.map((card) => card.value),
                    ]);
                  })
                  .then(() => {
                    notify();
                  });
              }}
            >
              Hit Me
            </Button>
            <Button
              variant="contained"
              disabled={score > 21}
              onClick={() => {
                // Add functionality for the "Stay" button
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
              variant="standard"
              color="warning"
              value={score}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default PlayerOne;
