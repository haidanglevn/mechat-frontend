import { React, useEffect, useRef, useState } from "react";
import { Avatar, Box, Paper, Typography, IconButton } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

const ChatMessage = ({ message, time, senderId }) => {
  const userId = "ad0ad1be-f7e5-47c7-b4c3-c17250cbebab";
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: "10px",
        flexDirection: senderId == userId ? "row-reverse" : "row", // add logic to check if this is the message of the user
      }}
    >
      {/* <Avatar src={avatarSrc} alt={name} /> */}
      <Paper
        sx={{
          padding: "10px 15px",
          margin: "0 10px",
          borderRadius: "20px",
          backgroundColor: senderId == userId ? "#7678ED" : "#f0f0f0",
          color: senderId == userId ? "white" : "text.primary",
          maxWidth: "75%",
        }}
        elevation={3}
      >
        {/* <Typography variant="caption" display="block" gutterBottom>
          {name == "User" ? "" : name}
        </Typography> */}
        <Typography variant="body1">{message}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
          <IconButton size="small">
            <ThumbUpAltIcon fontSize="small" />
          </IconButton>
          {/* <Typography variant="caption">{likes}</Typography>
          <IconButton size="small">
            <FavoriteIcon fontSize="small" />
          </IconButton>
          <Typography variant="caption">{favorites}</Typography>*/}
          <Typography variant="caption" sx={{ marginLeft: "auto" }}>
            {time}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatMessage;
