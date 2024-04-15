import React, { useEffect, useState } from "react";
import { Avatar, Stack, Typography } from "@mui/material";

import InlineNotificationBadge from "./InlineBadge";

const MessageThubnail = ({ cons, onClick }) => {
  function timeSince(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    let interval = seconds / 31536000; // 60 * 60 * 24 * 365

    if (interval > 1) {
      return (
        Math.floor(interval) + " year" + (Math.floor(interval) > 1 ? "s" : "")
      );
    }
    interval = seconds / 2592000; // 60 * 60 * 24 * 30
    if (interval > 1) {
      return (
        Math.floor(interval) + " month" + (Math.floor(interval) > 1 ? "s" : "")
      );
    }
    interval = seconds / 604800; // 60 * 60 * 24 * 7
    if (interval > 1) {
      return (
        Math.floor(interval) + " week" + (Math.floor(interval) > 1 ? "s" : "")
      );
    }
    interval = seconds / 86400; // 60 * 60 * 24
    if (interval > 1) {
      return (
        Math.floor(interval) + " day" + (Math.floor(interval) > 1 ? "s" : "")
      );
    }
    interval = seconds / 3600; // 60 * 60
    if (interval > 1) {
      return (
        Math.floor(interval) + " hour" + (Math.floor(interval) > 1 ? "s" : "")
      );
    }
    interval = seconds / 60;
    if (interval > 1) {
      return (
        Math.floor(interval) + " minute" + (Math.floor(interval) > 1 ? "s" : "")
      );
    }
    return (
      Math.floor(seconds) + " second" + (Math.floor(seconds) > 1 ? "s" : "")
    );
  }

  const renderConversationAvatar = () => {
    if (cons.conversationType == 0) {
      let participant = cons.participants.filter(
        (p) => p.userId == "ad0ad1be-f7e5-47c7-b4c3-c17250cbebab"
      );
      return (
        <Avatar sx={{ bgcolor: "black", borderRadius: "25%" }} variant="square">
          {participant[0].nickName.slice(0, 1)}
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
          backgroundColor: "#EEEEF8",
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
