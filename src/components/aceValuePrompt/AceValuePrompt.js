// AceValuePrompt.js

import React from "react";
import Button from "@mui/material/Button";

const AceValuePrompt = ({ onAceSelection }) => {
  const handleAceSelection = (isAce11) => {
    onAceSelection(isAce11);
  };

  return (
    <div>
      <p>Do you want the value of ACE to be 11 or 1?</p>
      <Button variant="contained" onClick={() => handleAceSelection(true)}>
        11
      </Button>
      <Button variant="contained" onClick={() => handleAceSelection(false)}>
        1
      </Button>
    </div>
  );
};

export default AceValuePrompt;
