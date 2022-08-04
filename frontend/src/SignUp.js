import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import contexts from "./contexts";
import SnackbarMessage from "./SnackbarMessage";

const theme = createTheme();

export default function SignUp() {
  const [snackOpen, setSnackOpen] = useState(null);
  const apiContext = useContext(contexts.apiContext);

  const handleSnackBar = (state) => {
    setSnackOpen(state);
  };

  const addUser = (user) =>
    apiContext.user
      .addUser(user)
      .then(() => setSnackOpen(false))
      .catch(() => setSnackOpen(true));

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      first_name: data.get("firstName"),
      last_name: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      trips: "",
    };
    addUser(user);
    event.target.firstName.value = null;
    event.target.lastName.value = null;
    event.target.email.value = null;
    event.target.password.value = null;
  };

  if (snackOpen === false) {
    return <Navigate to="/login" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <SnackbarMessage
          color="error"
          message="Failed, Provide all fields and unique email with correct format"
          handleClose={handleSnackBar}
          open={snackOpen}
        />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email_sign_up"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password_sign_up"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
