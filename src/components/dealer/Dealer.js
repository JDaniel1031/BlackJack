import React, { useState, useEffect } from "react";
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
const Dealer = ({ deckId, player2cards, dealerDetails }) => {
  // STATES:
  const [wholeShaBang, setWholeShaBang] = React.useState(player2cards);
  const [player1WholeCardObj, setPlayer1WholeCardObj] = React.useState(null);
  const [hitCards, setHitCards] = React.useState(null);
  const [score, setScore] = React.useState(null);

  // LifeCycle:
  React.useEffect(() => {
    if (player2cards !== null) {
      setWholeShaBang(player2cards);
    }
  }, [player2cards]);

  React.useEffect(() => {
    if (deckId !== null && player2cards !== null) {
      const cardVals = player2cards.map((element) => element.value);
      setPlayer1WholeCardObj(cardVals);
    }
  }, [player2cards]);

  React.useEffect(() => {
    if (deckId !== null && hitCards !== null) {
      const cardVals = hitCards.map((element) => element.value);

      const newArray = player1WholeCardObj.concat(cardVals);

      setPlayer1WholeCardObj(newArray);
    }
  }, [hitCards]);

  React.useEffect(() => {
    if (!player1WholeCardObj || player1WholeCardObj.length === 0) {
      return;
    }

    let result = 0;
    let aceCount = 0;

    player1WholeCardObj.forEach((element) => {
      if (element === "ACE") {
        aceCount += 1;
        result += 11;
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
  }, [player1WholeCardObj, hitCards]);

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

    const notifyError = () =>
    toast.error("Bust!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  return (
    <>
      <div>
        <Card sx={{ maxWidth: 345 }} className="playerOneCard">
          <CardActionArea>
            <CardMedia
              component="img"
              height="500"
              image={randomImages[1].id}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Dealer
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
              <Button
                variant="contained"
                disabled={score > 21}
                onClick={() => {
                  drawOneCardFromExistingDeck(deckId)
                    .then((res) => {
                      setHitCards(res.data.cards);
                      const newArray = wholeShaBang.concat(res.data.cards);
                      setWholeShaBang(newArray);
                    })
                    .then(() => {
                      if(score < 21){
                        notify();
                      }else {
                        notifyError()
                      }
                    });
                }}
              >
                Hit Me
              </Button>
              <ToastContainer />
            </CardContent>
          </CardActionArea>
          <CardActions></CardActions>
        </Card>
      </div>
      <div>{wholeShaBang !== null && renderImageList(wholeShaBang)}</div>
    </>
  );
};

export default Dealer;
