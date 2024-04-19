import React, { useEffect, useState } from "react";
import { Avatar, Stack, Typography } from "@mui/material";

import InlineNotificationBadge from "./InlineBadge";
import useAuthStore from "../stores/authStore";
import useChatStore from "../stores/chatStore";
import timeSince from "../utils/timeSince";

const MessageThubnail = ({ onClick }) => {
  const { user } = useAuthStore();
  const { selectedCons, conversations, setSelectedCons } = useChatStore();

  const renderConversationAvatar = (cons) => {
    let participant;
    if (user && cons) {
      if (cons.conversationType == 0) {
        participant = cons.participants.filter((p) => p.userId == user.userId);
      }

      return (
        <Avatar
          sx={{ bgcolor: "black", borderRadius: "25%" }}
          variant="square"
        ></Avatar>
      );
    }
  };
  return (
    <>
      {conversations.map((cons) => {
        return (
          <div onClick={() => setSelectedCons(cons)} key={cons.id}>
            <Stack
              direction={"row"}
              gap={"20px"}
              alignItems={"center"}
              justifyContent={"left"}
              sx={{
                padding: "10px",
                borderRadius: "10px",
                backgroundColor:
                  selectedCons && cons.id === selectedCons.id
                    ? "gray"
                    : "#EEEEF8",
                width: "100%",
                cursor: "pointer",
              }}
            >
              {renderConversationAvatar(cons)}
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
      })}
    </>
  );
};

export default MessageThubnail;
