import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SendIcon from "@mui/icons-material/Send";
import PaperClipIcon from "@mui/icons-material/AttachFile"; // Assuming this is the paper clip icon
import axios from "axios";

const MessageInputField = ({ cons, onMessageSent }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(""); // reset the input field
  }, [cons]);

  const sendMessage = async () => {
    if (message.trim("") === "") {
      console.log("No message to send");
      return; // Avoid sending empty messages
    }
    const url = "https://localhost:7170/api/messages/send-message";
    const data = {
      SenderId: "ad0ad1be-f7e5-47c7-b4c3-c17250cbebab",
      ConversationId: cons.id,
      Content: message,
    };

    try {
      await axios.post(url, data);
      console.log("Message sent successfully");
      setMessage("");
      onMessageSent();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <TextField
      fullWidth
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Your message"
      value={message}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PaperClipIcon color="disabled" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <MicNoneIcon color="disabled" />
            </IconButton>
            <IconButton onClick={sendMessage} disabled={message.trim() === ""}>
              <SendIcon
                color={message.trim() === "" ? "disabled" : "primary"}
              />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 30, // Rounded corners
          backgroundColor: "#f5f5f5", // Light grey background
          "& fieldset": {
            borderColor: "transparent", // Hide the border
          },
          "&:hover fieldset": {
            borderColor: "transparent", // Also on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "transparent", // Even when focused
          },
        },
        "& .MuiInputAdornment-root .MuiIconButton-root": {
          padding: "10px", // Ensuring the icons are not too close to the edge
        },
      }}
    />
  );
};

export default MessageInputField;
