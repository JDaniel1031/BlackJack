import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { drawOneCardFromExistingDeck } from "../../axiosCalls/AxiosCalls.js";
import { ToastContainer, toast } from "react-toastify";
import Stack from '@mui/material/Stack';
import "react-toastify/dist/ReactToastify.css";
const Dealer = ({ deckId, player2cards, dealerDetails }) => {
  // STATES:
  const [dealerCardObj, setDealerCardObj] = React.useState(player2cards);
  const [dealerCardFaceValues, setDealerCardFaceValues] =
    React.useState(null);
  const [hitCards, setHitCards] = React.useState(null);
  const [score, setScore] = React.useState(null);

  // LifeCycle:
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
  }, [dealerCardFaceValues, hitCards]);

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

  const notify = () => toast.success('Hit!', {
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
    {dealerCardObj !== null && renderImageList(dealerCardObj)}
     
    
     <Stack spacing={2} direction="row" style={{ marginRight:"auto" }}>
       <Button
         variant="contained"
         disabled={score > 21}
         onClick={() => {
           drawOneCardFromExistingDeck(deckId)
             .then((res) => {
              setDealerCardObj((prev) => [...prev, ...res.data.cards]);
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
         label="Dealer Total"
         type="number"
         size="small"
         variant="standard"
         color="warning"
         value={score}
         InputLabelProps={{
           shrink: true,
         }}
       />
     </Stack>
     <ToastContainer />
     
   </>
  );
};

export default Dealer;
