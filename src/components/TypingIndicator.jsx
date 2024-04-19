import React from "react";
import "../styles/TypingIndicator.css";
import { Avatar } from "@mui/material";

const TypingIndicator = () => {
  return (
    <>
      <div className="typing-indicator">
        <div>
          <Avatar
            sx={{ bgcolor: "black", borderRadius: "25%", marginRight: "10px" }}
            variant="square"
          ></Avatar>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </>
  );
};

export default TypingIndicator;
