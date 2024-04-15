import React, { useState } from "react";
import "../styles/LoginPage.css";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google"; // For Google login icon
import AppleIcon from "@mui/icons-material/Apple"; // For Apple login icon

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement your login logic here
    console.log("Login Attempt:", email, password);
  };
  return (
    <div className="login-page">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3 }}>OR</Divider>
            <Button
              startIcon={<GoogleIcon />}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              // onClick={handleGoogleLogin} // Implement Google login logic here
            >
              Sign in with Google
            </Button>
            <Button
              startIcon={<AppleIcon />}
              fullWidth
              variant="outlined"
              // onClick={handleAppleLogin} // Implement Apple login logic here
            >
              Sign in with Apple
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
