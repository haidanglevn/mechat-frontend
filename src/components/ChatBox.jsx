import { React, useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import ChatMessage from "./ChatMessage";
import { HubConnectionBuilder } from "@microsoft/signalr";
import useChatStore from "../stores/chatStore";

const ChatBox = () => {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const { selectedCons } = useChatStore();

  // Connect to hub -------------------------------------------------
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    // Create and start the connection
    const connect = new HubConnectionBuilder()
      .withUrl("https://localhost:7170/testhub") // Adjust the URL to where your hub is hosted
      .withAutomaticReconnect()
      .build();

    connect
      .start()
      .then(() => {
        console.log("Connected!");
        setConnection(connect);
      })
      .catch((err) =>
        console.error("Error while establishing connection:", err)
      );

    // Handle receiving messages
    connect.on(
      "ReceiveMessageInConversation",
      (user, message, conversationId) => {
        console.log(
          `Message from ${user} in conversation ${conversationId}: ${message}`
        );
        fetchMessages();
        // You can update the UI to show this message in the appropriate conversation view
      }
    );

    // Clean up on unmount
    return () => {
      connect.stop().then(() => console.log("Disconnected from SignalR hub."));
    };
  }, []);

  // End of signalR hub ---------------------------------------------

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
  }, [messages]);

  const fetchMessages = () => {
    if (selectedCons !== null) {
      axios
        .get(
          `https://localhost:7170/api/conversations/get-messages-for-conversation/${selectedCons.id}`
        )
        .then((res) => setMessages(res.data));
    }
  };

  const renderAllMessages = () => {
    if (selectedCons == null) {
      return (
        <Typography>
          Please select one conversation to show all messages.
        </Typography>
      );
    } else {
      if (messages.length > 0) {
        return messages.map((mes) => {
          return (
            <ChatMessage
              message={mes.content}
              time={formatDate(mes.createdAt)}
              senderId={mes.senderId}
              key={mes.id}
            />
          );
        });
      } else {
        return <Typography>This is the start of the conversation.</Typography>;
      }
    }
  };

  return (
    <Box sx={{ marginBottom: "50px" }}>
      {renderAllMessages()}
      <div ref={messagesEndRef} />
    </Box>
  );
};
export default ChatBox;
