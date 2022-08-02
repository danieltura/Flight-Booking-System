import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";

const theme = createTheme();

function App() {
  const [currentPage, showCurrentPage] = useState(0);

  const pages = ["Home", "LogIn", "SignUp"];
  const handleCurrentPage = (index) => {
    showCurrentPage(index);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Button
                  key={page}
                  onClick={() => handleCurrentPage(index)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {currentPage == 0 && <Home />}
      {currentPage == 1 && <SignIn />}
      {currentPage == 2 && <SignUp />}
    </ThemeProvider>
  );
}

export default App;
