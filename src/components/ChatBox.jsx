import { React, useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import ChatMessage from "./ChatMessage";
import useChatStore from "../stores/chatStore";
import TypingIndicator from "./TypingIndicator";

const ChatBox = () => {
  const messagesEndRef = useRef(null);
  const { selectedCons, messages, fetchMessages, isTyping } = useChatStore();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1); // Set to yesterday's date

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format hours and minutes for consistency
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Check if the given date is today
    if (date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
      return `Today at ${formattedHours}:${formattedMinutes}`;
    }
    // Check if the given date is yesterday
    else if (date.setHours(0, 0, 0, 0) === yesterday.setHours(0, 0, 0, 0)) {
      return `Yesterday at ${formattedHours}:${formattedMinutes}`;
    } else {
      // Return the formatted date for dates that are not today or yesterday
      return `${day}.${month} at ${formattedHours}:${formattedMinutes}`;
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [selectedCons]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages, isTyping]);

  const renderAllMessages = () => {
    if (selectedCons == null) {
      return (
        <Typography>
          Please select one conversation to show all messages.
        </Typography>
      );
    } else {
      if (messages.length > 0) {
        return (
          <>
            {messages.map((mes) => {
              return (
                <ChatMessage
                  message={mes.content}
                  time={formatDate(mes.createdAt)}
                  senderId={mes.senderId}
                  key={mes.id}
                />
              );
            })}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        );
      } else {
        return <Typography>This is the start of the conversation.</Typography>;
      }
    }
  };

  return (
    <Box
      sx={{
        marginBottom: "30px",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      {renderAllMessages()}
    </Box>
  );
};
export default ChatBox;
