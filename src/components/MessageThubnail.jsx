import React, { useEffect, useState } from "react";
import { Avatar, Stack, Typography } from "@mui/material";

import InlineNotificationBadge from "./InlineBadge";
import useAuthStore from "../stores/authStore";
import useChatStore from "../stores/chatStore";
import timeSince from "../utils/timeSince";

const MessageThubnail = ({ cons, onClick }) => {
  const { user } = useAuthStore();
  const { selectedCons } = useChatStore();
  console.log(cons);

  const renderConversationAvatar = () => {
    if (cons.conversationType == 0 && user && cons) {
      let participant = cons.participants.filter(
        (p) => p.userId == user.userId
      );
      console.log("Im talking to...", participant);
      return (
        <Avatar sx={{ bgcolor: "black", borderRadius: "25%" }} variant="square">
          {/* {participant[0].nickName.slice(0, 1)} */}
        </Avatar>
      );
    }
  };
  return (
    <div onClick={onClick}>
      <Stack
        direction={"row"}
        gap={"20px"}
        alignItems={"center"}
        justifyContent={"left"}
        sx={{
          padding: "10px",
          borderRadius: "10px",
          backgroundColor:
            selectedCons && cons.id === selectedCons.id ? "gray" : "#EEEEF8",
          width: "100%",
          cursor: "pointer",
        }}
      >
        {renderConversationAvatar()}
        <Stack sx={{ width: "300px" }}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} gap={"2px"} alignItems={"center"}>
              <Typography variant="h6">
                <b>{cons.title}</b>
              </Typography>
              {/* <InlineNotificationBadge number={5} /> */}
            </Stack>

            <Typography variant="caption">
              {cons.lastMessage !== null
                ? timeSince(cons.lastMessage.createdAt)
                : timeSince(cons.createdAt)}
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="body1">
              {cons.lastMessage ? (
                <i>{cons.lastMessage.content}</i>
              ) : (
                "New conversation created."
              )}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default MessageThubnail;
