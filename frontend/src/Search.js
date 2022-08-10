import React, { useContext, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Flight from "@mui/icons-material/Flight";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import contexts from "./contexts";
import Autocomplete from "@mui/material/Autocomplete";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Trips from "./Trips";

const theme = createTheme();

function ButtonAppBar({ setTrips, handleSignout }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            onClick={() => {
              console.log("sdsobject");
              setTrips(false);
            }}
          >
            Home
          </Button>
          <Button color="inherit" onClick={() => setTrips(true)}>
            Trips
          </Button>
          <Button color="inherit" onClick={() => handleSignout(true)}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default function Search() {
  const [userContext, setUserContext] = useContext(contexts.userContext);
  const apiContext = useContext(contexts.apiContext);
  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");
  const [trips, setTrips] = useState(false);
  const [signout, setSignout] = useState(false);

  const [fromAirportValue, setFromAirportValue] = useState("");
  const [toAirportValue, setToAirportValue] = useState("");

  const [dateRange, setDateRange] = useState([null, null]);

  const [searchAirports, setSearchAirports] = useState(null);
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    if (!searchAirports) {
      getAllAirports();
    }
  }, [searchAirports]);

  const handleSignout = () => {
    setUserContext({ user: {} });
  };

  const getAllAirports = () =>
    apiContext.airport
      .getAirports()
      .then((res) => {
        setFromAirport(res[0]);
        setToAirport(res[1]);
        setSearchAirports(null);
        setSearchAirports(res);
      })
      .catch((err) => console.log(err));

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchData({
      to: toAirportValue,
      from: fromAirportValue,
      from_date: dateRange[0],
      to_date: dateRange[1],
    });
  };

  if (Object.keys(userContext.user).length === 0) {
    return <Navigate to="/login" />;
  }

  if (searchData !== null) {
    return (
      <Navigate
        to="/flights"
        state={{
          to: toAirportValue,
          from: fromAirportValue,
          from_date: dateRange,
        }}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <ButtonAppBar setTrips={setTrips} handleSignout={handleSignout} />
      {trips ? (
        <Trips />
      ) : (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <Flight />
            </Avatar>
            <Typography component="h1" variant="h5">
              Next Stop
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <FormControl sx={{ minWidth: 200, mb: 5 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      One WAy Trip
                    </InputLabel>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    value={fromAirport}
                    onChange={(event, newValue) => {
                      setFromAirport(newValue);
                    }}
                    inputValue={fromAirportValue}
                    onInputChange={(event, newInputValue) => {
                      setFromAirportValue(newInputValue);
                    }}
                    id="from_city"
                    label="from_city"
                    options={searchAirports ? searchAirports : []}
                    autoFocus
                    getOptionLabel={(option) =>
                      option.name + ", " + option.code
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="From" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    value={toAirport}
                    onChange={(event, newValue) => {
                      setToAirport(newValue);
                    }}
                    inputValue={toAirportValue}
                    onInputChange={(event, newInputValue) => {
                      setToAirportValue(newInputValue);
                    }}
                    id="to_city"
                    options={searchAirports ? searchAirports : []}
                    autoFocus
                    getOptionLabel={(option) =>
                      option.name + ", " + option.code
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="To" />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <BasicDateRangePicker
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={<SearchOutlined />}
              >
                Search
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}

function BasicDateRangePicker({ dateRange, setDateRange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Departure Date"
        value={dateRange}
        onChange={(newValue) => {
          setDateRange(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
