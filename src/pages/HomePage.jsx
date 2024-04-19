import React, { useEffect, useState } from "react";
import {
  IconButton,
  Stack,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import MessageInputField from "../components/MessageInputField";
import ChatBox from "../components/ChatBox";
import ChatInfo from "../components/ChatInfo";
import axios from "axios";
import MessageThubnail from "../components/MessageThubnail";

import "../styles/HomePage.css";
import useAuthStore from "../stores/authStore";
import useChatStore from "../stores/chatStore";
import { HubConnectionBuilder } from "@microsoft/signalr";

const HomePage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const { user } = useAuthStore();
  const {
    selectedCons,
    fetchMessageThumbnail,
    fetchMessages,
    setItTypingTrue,
    setItTypingFalse,
  } = useChatStore();

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
      (user, message, conversation) => {
        console.log(
          `Message from ${user} in conversation ${conversation}: ${message}`
        );
        fetchMessages();
      }
    );

    connect.on("Typing", (username, conversationId) => {
      setItTypingTrue();
      // console.log(`User ${username} is typing.....`);
    });
    connect.on("StopTyping", (username, conversationId) => {
      setItTypingFalse();
      // console.log(`User ${username} stopped typing.....`);
    });

    // Clean up on unmount
    return () => {
      connect.stop().then(() => console.log("Disconnected from SignalR hub."));
    };
  }, []);

  // Join and Leave conversation when selectedCons changes
  useEffect(() => {
    if (connection) {
      const joinConversation = async (conversationId) => {
        await connection.invoke("JoinConversation", conversationId);
        // .then(() => console.log(`Joined conversation ${conversationId}`))
        // .catch((err) => console.error("Failed to send typing event:", err));
      };

      const leaveConversation = async (conversationId) => {
        await connection.invoke("LeaveConversation", conversationId);
        // console.log(`Left conversation ${conversationId}`);
      };

      if (selectedCons) {
        joinConversation(selectedCons.id);
      }

      // Cleanup function to leave the conversation when the selectedCons changes or component unmounts
      return () => {
        if (selectedCons) {
          leaveConversation(selectedCons.id);
        }
      };
    }
  }, [selectedCons, connection]);

  const handleTyping = (conversation) => {
    if (connection && conversation) {
      connection.invoke("Typing", user.name, conversation);
    }
  };

  const handleStopTyping = (conversation) => {
    if (connection && conversation) {
      connection.invoke("StopTyping", user.name, conversation);
    }
  };

  // End of signalR hub ---------------------------------------------

  useEffect(() => {
    fetchMessageThumbnail(user);
  }, [user]);

  useEffect(() => {
    if (messageSent) {
      fetchMessageThumbnail(user);
      fetchMessages();
      setMessageSent(false);
    }
  }, [messageSent]);

  const handleMessageSent = () => {
    setMessageSent(true);
  };

  return (
    <>
      <Stack className="chat-window" direction={"row"} gap={"20px"}>
        <Stack className="chat-list" gap={"5px"}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#DBDCFF",
                height: "40px",
                "& input": {
                  height: "100%",
                },
              },
              marginBottom: "20px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <MessageThubnail />
        </Stack>

        <Stack className="chat-conversation">
          <Stack
            className="chat-conversation-header"
            justifyContent={"space-between"}
            alignItems={"center"}
            direction={"row"}
          >
            {selectedCons !== null && (
              <>
                <Stack>
                  <Typography variant="h4">
                    {selectedCons.title} - (
                    {selectedCons.id.toString().slice(0, 10)}....)
                  </Typography>
                  <Typography variant="caption" sx={{ paddingLeft: "5px" }}>
                    23 members, 10 online
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <IconButton>
                    <VideocamIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => setShowInfo((showInfo) => !showInfo)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Stack>
              </>
            )}
          </Stack>

          <Stack className="chat-conversation-body">
            <ChatBox />
            {selectedCons && (
              <Stack
                className="chat-conversation-input"
                justifyContent={"flex-end"}
                height={"30px"}
              >
                <MessageInputField
                  cons={selectedCons}
                  onMessageSent={handleMessageSent}
                  onTyping={() => handleTyping(selectedCons.id)}
                  onStopTyping={() => handleStopTyping(selectedCons.id)}
                />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
      {showInfo && (
        <Stack className="group-info">
          <ChatInfo selectedCons={selectedCons} />
        </Stack>
      )}
    </>
  );
};

export default HomePage;
