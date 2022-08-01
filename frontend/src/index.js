import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CssBaseline />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);
