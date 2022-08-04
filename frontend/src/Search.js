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
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import contexts from "./contexts";
import Autocomplete from "@mui/material/Autocomplete";

const theme = createTheme();

export default function Search() {
  const [userContext, _] = useContext(contexts.userContext);
  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");

  const [fromAirportValue, setFromAirportValue] = useState("");
  const [toAirportValue, setToAirportValue] = useState("");

  const [searchAirports, setSearchAirports] = useState(null);
  const apiContext = useContext(contexts.apiContext);
  var airports = [];

  useEffect(() => {
    if (!searchAirports) {
      getAllAirports();
    }
  }, [searchAirports]);

  const getAllAirports = () =>
    apiContext.airport
      .getAirports()
      .then((res) => {
        airports = JSON.parse(JSON.stringify(res));
        setFromAirport(res[0]);
        setToAirport(res[1]);
        setSearchAirports(null);
        setSearchAirports(res);
      })
      .catch((err) => console.log(err));

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      to: toAirportValue,
      from: fromAirportValue,
    });
  };

  if (Object.keys(userContext.user).length === 0) {
    return <Navigate to="/login" />;
  }

  return (
    <ThemeProvider theme={theme}>
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
                    Round Trip
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
                  getOptionLabel={(option) => option.name + ", " + option.code}
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
                  getOptionLabel={(option) => option.name + ", " + option.code}
                  renderInput={(params) => <TextField {...params} label="To" />}
                />
              </Grid>
              <Grid item xs={12}>
                <BasicDateRangePicker />
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
    </ThemeProvider>
  );
}

function BasicDateRangePicker() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={{ start: "Check-in", end: "Check-out" }}
    >
      <DateRangePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
