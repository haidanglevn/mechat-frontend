import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SendIcon from "@mui/icons-material/Send";
import PaperClipIcon from "@mui/icons-material/AttachFile"; // Assuming this is the paper clip icon
import axios from "axios";
import useAuthStore from "../stores/authStore";
import debounce from "lodash.debounce";
import useChatStore from "../stores/chatStore";

const MessageInputField = ({ cons, onMessageSent, onTyping, onStopTyping }) => {
  const [messageInput, setMessageInput] = useState("");
  const { user } = useAuthStore();
  const { selectedCons } = useChatStore();
  let sendTypingIndicator = useRef(debounce(onStopTyping, 10000)).current; // auto stop typing if user doesn't type for 10 secs

  useEffect(() => {
    setMessageInput(""); // reset the input field
  }, [cons]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setMessageInput(newValue);
    if (newValue.trim() !== "" && newValue.length > 0) {
      onTyping();
      sendTypingIndicator();
    } else {
      // If input is cleared, stop typing immediately
      onStopTyping();
      sendTypingIndicator.cancel(); // Cancel any pending debounced calls
    }
  };

  const sendMessage = async () => {
    if (messageInput.trim("") === "") {
      console.log("No message to send");
      return; // Avoid sending empty messages
    }
    const url = "https://localhost:7170/api/messages/send-message";
    const data = {
      SenderId: user.userId,
      ConversationId: cons.id,
      Content: messageInput,
    };

    try {
      await axios.post(url, data);
      console.log("Message sent successfully");
      setMessageInput("");
      onStopTyping();
      onMessageSent();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <TextField
      fullWidth
      onChange={(e) => handleInputChange(e)}
      placeholder="Your message"
      value={messageInput}
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
            <IconButton
              onClick={sendMessage}
              disabled={messageInput.trim() === ""}
            >
              <SendIcon
                color={messageInput.trim() === "" ? "disabled" : "primary"}
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
