import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Avatar,
  IconButton,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Container,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import ArchiveIcon from "@mui/icons-material/Archive";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { HubConnectionBuilder } from "@microsoft/signalr";
import useAuthStore from "./stores/authStore";

const App = () => {
  const { user, isLoggedIn, login, logout } = useAuthStore();
  console.log("User from state: ", user);
  const handleLogin = (userData) => {
    // const userData = { name: "John Doe", email: "john@example.com" }; // Simulated user data
    login(userData);
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <Stack className="chat-app" direction={"row"}>
      <Stack className="side-bar">
        <Stack>
          <Avatar
            alt="avatar"
            src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            sx={{ width: "3em", height: "3em" }}
            onClick={() =>
              handleLogin({
                name: "Admin",
                userId: "ad0ad1be-f7e5-47c7-b4c3-c17250cbebab",
              })
            }
          />
          <Typography
            sx={{
              backgroundColor: user && user.name == "Admin" ? "red" : "none",
            }}
          >
            Admin
          </Typography>
          <Avatar
            alt="avatar"
            src="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            sx={{ width: "3em", height: "3em" }}
            onClick={() =>
              handleLogin({
                name: "John Cena",
                userId: "760454fa-4af1-4ae6-9b18-ed3aec4be2a9",
              })
            }
          />
          <Typography
            sx={{
              backgroundColor:
                user && user.name == "John Cena" ? "red" : "none",
            }}
          >
            John Cena
          </Typography>
        </Stack>
        <Stack gap={"30px"}>
          <Stack>
            <IconButton color="inherit">
              <ChatIcon />
            </IconButton>
            <Typography>All Chats</Typography>
          </Stack>
          <Stack>
            <IconButton color="inherit">
              <ArchiveIcon />
            </IconButton>
            <Typography>Archived Chats</Typography>
          </Stack>
        </Stack>
        <Stack>
          <IconButton color="inherit">
            <LogoutIcon />
          </IconButton>
          <Typography>Log out</Typography>
        </Stack>
      </Stack>
      <HomePage />
      {/* <LoginPage /> */}
    </Stack>
  );
};

export default App;
