// AceValuePrompt.js
import React from "react";
import Button from "@mui/material/Button";
import "./AceValuePrompt.css"; // Import the CSS file for styling

const AceValuePrompt = ({ onAceSelection }) => {
  const handleAceSelection = (isAce11) => {
    onAceSelection(isAce11);
  };

  return (
    <div className="ace-prompt-container">
      <p>Do you want the value of ACE to be 11 or 1?</p>
      <Button
        variant="contained"
        onClick={() => handleAceSelection(true)}
        className="ace-button"
      >
        11
      </Button>
      <Button
        variant="contained"
        onClick={() => handleAceSelection(false)}
        className="ace-button"
      >
        1
      </Button>
    </div>
  );
};

export default AceValuePrompt;
