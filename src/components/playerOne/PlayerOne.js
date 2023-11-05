// Imports

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { drawOneCardFromExistingDeck } from "../../axiosCalls/AxiosCalls.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { randomImages } from "../randomAvatar/RandomAvatar.js";
import Stack from '@mui/material/Stack';
const PlayerOne = ({ deckId, player1cards, player1Details, dealerDetails }) => {
  // STATES:
  const [player1CardObj, setPlayer1CardObj] = React.useState(player1cards);
  const [player1CardFaceValues, setPlayer1CardFaceValues] =
    React.useState(null);
  const [hitCards, setHitCards] = React.useState(null);
  const [score, setScore] = React.useState(null);

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
  }, [player1CardFaceValues, hitCards]);

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
      position: "bottom-left",
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
      {/* <div>
        <Card sx={{ maxWidth: 345 }} className="playerOneCard">
          <CardActionArea>
            <CardMedia
              component="img"
              height="500"
              image={randomImages[0].id}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Player 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                DeckId : {deckId}
                Score : {score}
                <br></br>
              </Typography>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-number"
                  label="Number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={score}
                />
              </Box>
              <br></br>

              <ToastContainer />
            </CardContent>
          </CardActionArea>
          <CardActions></CardActions>
        </Card>
      </div> */}

      <div>{player1CardObj !== null && renderImageList(player1CardObj)}</div>
      <Stack spacing={2} direction="row">
      <Button
        variant="contained"
        disabled={score > 21}
        onClick={() => {
          drawOneCardFromExistingDeck(deckId)
            .then((res) => {
              setHitCards(res.data.cards);
              const newArray = player1CardObj.concat(res.data.cards);
              setPlayer1CardObj(newArray);
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
          //
        }}
      >
        Stay
      </Button>
    </Stack>
    </>
  );
};

export default PlayerOne;
