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

const HomePage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const { user } = useAuthStore();
  const {
    selectedCons,
    setSelectedCons,
    fetchMessageThumbnail,
    conversations,
  } = useChatStore();

  useEffect(() => {
    fetchMessageThumbnail(user);
  }, [user]);

  useEffect(() => {
    if (messageSent) {
      fetchMessageThumbnail();
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

          {conversations.map((cons) => {
            return (
              <MessageThubnail
                cons={cons}
                key={cons.id}
                onClick={() => setSelectedCons(cons)}
              />
            );
          })}
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
                  <Typography variant="h4">{selectedCons.title}</Typography>
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
          </Stack>

          <Stack
            className="chat-conversation-input"
            justifyContent={"flex-end"}
            height={"30px"}
          >
            <MessageInputField
              cons={selectedCons}
              onMessageSent={handleMessageSent}
            />
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
