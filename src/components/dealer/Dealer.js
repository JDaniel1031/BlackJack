import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import useStore from "../gameStore/useStore.js";
import "react-toastify/dist/ReactToastify.css";
import "./Dealer.css";

const Dealer = ({ deckId, player2cards, dealerDetails }) => {
  // STATES:
  const [dealerCardObj, setDealerCardObj] = React.useState(player2cards);
  const [dealerCardFaceValues, setDealerCardFaceValues] = React.useState(null);
  const [hitCards, setHitCards] = React.useState(null);
  const [score, setScore] = React.useState(null);
  const { stateObject, updateStateObject } = useStore();
  const [allDealerCards, setAllDealerCards] = useState([]);
  const [usedBackImage, setUsedBackImage] = React.useState(false);
  console.log(allDealerCards, dealerCardObj, stateObject);
  // LifeCycle:
  useEffect(() => {
    // Whenever new dealer cards are drawn, update the allDealerCards state
    if (player2cards) {
      setAllDealerCards((prevCards) => [...prevCards, ...player2cards]);
    }
  }, [player2cards]);

  React.useEffect(() => {
    if (player2cards !== null) {
      setDealerCardObj(player2cards);
    }
  }, [player2cards]);

  React.useEffect(() => {
    if (deckId !== null && player2cards !== null) {
      const cardVals = player2cards?.map((element) => element.value);
      setDealerCardFaceValues(cardVals);
    }
  }, [player2cards]);

  React.useEffect(() => {
    if (deckId !== null && hitCards !== null) {
      const cardVals = hitCards?.map((element) => element.value);

      const newArray = dealerCardFaceValues.concat(cardVals);

      setDealerCardFaceValues(newArray);
    }
  }, [hitCards]);

  React.useEffect(() => {
    if (!dealerCardFaceValues || dealerCardFaceValues.length === 0) {
      return;
    }

    let result = 0;
    let aceCount = 0;

    dealerCardFaceValues.forEach((element) => {
      if (element === "ACE" && result < 21) {
        // Assume ace value is always 11 for the dealer
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
  }, [dealerCardFaceValues, hitCards]);

  // Functions:
  // const renderImageList = (cards) => (
  //   <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
  //     {cards?.map((item, index) => (
  //       <ImageListItem key={item.image}>
  //         <img
  //           srcSet={`${index === 1 ? 'https://www.deckofcardsapi.com/static/img/back.png' : item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
  //           src={`${index === 1 ? 'https://www.deckofcardsapi.com/static/img/back.png' : item.image}?w=164&h=164&fit=crop&auto=format`}
  //           alt={item.code}
  //           loading="lazy"
  //         />
  //       </ImageListItem>
  //     ))}
  //   </ImageList>
  // );
  const renderImageList = (cards, showBackImage) => (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {cards?.map((item, index) => (
        <ImageListItem key={item.image}>
          <img
            srcSet={`${
              showBackImage && index === 1
                ? "https://www.deckofcardsapi.com/static/img/back.png"
                : item.image
            }?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${
              showBackImage && index === 1
                ? "https://www.deckofcardsapi.com/static/img/back.png"
                : item.image
            }?w=164&h=164&fit=crop&auto=format`}
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
        <div className="dealer-card-renders">
          {stateObject.playerOneStay
            ? renderImageList(allDealerCards, false)
            : renderImageList(dealerCardObj, true)}
        </div>
        <div>
          <Stack spacing={2} direction="row">
            <TextField
              id="outlined-number"
              label="Dealer Total"
              type="number"
              size="small"
              width="100%"
              variant="filled"
              value={!stateObject.playerOneStay ? 777 : score}
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

export default Dealer;
