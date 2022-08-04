import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Search from "./Search";
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
            <Route path="/search" element={<Search />} />
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </contexts.apiContext.Provider>
    </contexts.userContext.Provider>
  );
}

export default App;

// import React, { useState } from "react";
// import { Link, Redirect } from "react-router-dom";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import SignUp from "./SignUp";
// import SignIn from "./SignIn";
// import Home from "./Home";

// const theme = createTheme();

// function App() {
//   const [currentPage, showCurrentPage] = useState(0);

//   const pages = ["Home", "LogIn", "SignUp"];
//   const handleCurrentPage = (index) => {
//     showCurrentPage(index);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <AppBar position="static">
//         <Container maxWidth="xl">
//           <Toolbar disableGutters>
//             <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//               {pages.map((page, index) => (
//                 <Button
//                   key={page}
//                   onClick={() => handleCurrentPage(index)}
//                   sx={{ my: 2, color: "white", display: "block" }}
//                 >
//                   {page}
//                 </Button>
//               ))}
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>
//       {currentPage == 0 && <Home />}
//       {currentPage == 1 && <SignIn />}
//       {currentPage == 2 && <SignUp />}
//     </ThemeProvider>
//   );
// }

// export default App;
// import React, { useContext, useState, useEffect } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Flight from "@mui/icons-material/Flight";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Navigate } from "react-router-dom";
// import { SearchOutlined } from "@mui/icons-material";
// import { LocalizationProvider } from "@mui/x-date-pickers-pro";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import contexts from "./contexts";
// import Autocomplete from "@mui/material/Autocomplete";

// const theme = createTheme();

// export default function Search() {
//   const [userContext, _] = useContext(contexts.userContext);
//   const [airports, setAirports] = useState(null);
//   const apiContext = useContext(contexts.apiContext);

//   useEffect(() => {
//     if (!airports) {
//       getAllAirports();
//     }
//   }, [airports]);

//   const getAllAirports = () =>
//     apiContext.airport
//       .getAirports()
//       .then((res) => {
//         setAirports(res);
//       })
//       .catch((err) => console.log(err));

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       to: data.get("to"),
//       from: data.get("from"),
//     });
//   };

//   if (Object.keys(userContext.user).length === 0) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <Flight />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Next Stop
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 3 }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={12}>
//                 <FormControl sx={{ minWidth: 90 }}>
//                   <InputLabel id="demo-simple-select-autowidth-label">
//                     Trip
//                   </InputLabel>
//                   {/* <Select
//                     labelId="demo-simple-select-autowidth-label"
//                     id="demo-simple-select-autowidth"
//                     value={age}
//                     onChange={handleChange}
//                     autoWidth
//                     label="Age"
//                   >
//                     <MenuItem value="">
//                       <em>None</em>
//                     </MenuItem>
//                     <MenuItem value={10}>Twenty</MenuItem>
//                     <MenuItem value={21}>Twenty one</MenuItem>
//                     <MenuItem value={22}>Twenty one and a half</MenuItem>
//                   </Select> */}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="from"
//                   required
//                   fullWidth
//                   id="from_city"
//                   label="From"
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="to_city"
//                   label="To"
//                   name="to"
//                   autoComplete="family-name"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <BasicDateRangePicker />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               startIcon={<SearchOutlined />}
//             >
//               Search
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }

// function BasicDateRangePicker() {
//   const [value, setValue] = React.useState([null, null]);

//   return (
//     <LocalizationProvider
//       dateAdapter={AdapterDateFns}
//       localeText={{ start: "Check-in", end: "Check-out" }}
//     >
//       <DateRangePicker
//         value={value}
//         onChange={(newValue) => {
//           setValue(newValue);
//         }}
//         renderInput={(startProps, endProps) => (
//           <React.Fragment>
//             <TextField {...startProps} />
//             <Box sx={{ mx: 2 }}> to </Box>
//             <TextField {...endProps} />
//           </React.Fragment>
//         )}
//       />
//     </LocalizationProvider>
//   );
// }
