import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Search from "./Search";
import Flight from "./Flight";
import Trips from "./Trips";
import contexts from "./contexts";
import controllers from "./controller";

function App() {
  const [userContext, setUserContext] = useState({ user: {} });
  return (
    <contexts.userContext.Provider value={[userContext, setUserContext]}>
      <contexts.apiContext.Provider value={{ ...controllers }}>
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route exact path="/" element={<Search />} />
            <Route path="search" element={<Search />} />
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="flights" element={<Flight />} />
            <Route path="trips" element={<Trips />} />
          </Routes>
        </BrowserRouter>
      </contexts.apiContext.Provider>
    </contexts.userContext.Provider>
  );
}

export default App;
