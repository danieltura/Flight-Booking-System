import React, { useContext, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, Navigate } from "react-router-dom";
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
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [, setUserContext] = useContext(contexts.userContext);
  const apiContext = useContext(contexts.apiContext);

  const handleSnackBar = () => {
    setSnackOpen(null);
  };

  useEffect(() => {
    if (!users) {
      getAllUsers();
    }
  }, [users]);

  const getAllUsers = () =>
    apiContext.user
      .getUsers()
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => console.log(err));

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const [email, password] = [data.get("email"), data.get("password")];
    let found = false;
    for (const user_ of users) {
      if (user_.email == email && password == user_.password) {
        console.log("sucess");
        setUser({ user: user_ });
        found = true;
      }
    }
    if (found) {
      setSnackOpen(false);
    } else {
      setSnackOpen(true);
    }
  };

  if (snackOpen === false) {
    setUserContext(user);
    return <Navigate to="/search" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <SnackbarMessage
          color="error"
          message={
            "Failed to login. Please provide correct username and password"
          }
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
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email_sign_in"
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
                  id="password_sign_in"
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
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signup">Need an account? Sign up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
