import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useLocation } from "react-router-dom";
import FlightTakeoff from "@mui/icons-material/Flight";
import BookOnline from "@mui/icons-material/AirplaneTicket";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import contexts from "./contexts";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableBody } from "@mui/material";

function Flight() {
  const { state } = useLocation();
  const [flights, setFlights] = useState(null);
  const [onDateFlight, setOnDateFlight] = useState(null);
  const apiContext = useContext(contexts.apiContext);

  const to = {
    name: state.to.split(",")[0].trim(),
    code: state.to.split(",")[1].trim(),
  };
  const from = {
    name: state.from.split(",")[0].trim(),
    code: state.from.split(",")[1].trim(),
  };

  const [dm, dd, dy] = getDate(state.from_date);

  useEffect(() => {
    if (!flights) {
      getAllFlights();
    }
  }, [flights]);

  const getAllFlights = () =>
    apiContext.flight
      .getFlights()
      .then((res) => {
        setFlights(res);
        const thisDayFlights = [];
        const options = [];

        for (const flight of res) {
          if (
            flight.departure === from.code &&
            flight.destination === to.code
          ) {
            const [m, d, y] = getDate(flight.time);
            if (m === dm && d == dd && y === dy) {
              thisDayFlights.push(flight);
              console.log(flight, dm, dd, dy);
            }
          }
        }
        setOnDateFlight(thisDayFlights);
      })
      .catch((err) => console.log(err));

  return (
    <Container component="main" maxWidth="xl">
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        marginTop={4}
      >
        <Grid item xs={12} sm={12}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <FlightTakeoff />
          </Avatar>
          <Typography component="h1" variant="h5">
            Flights
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          {onDateFlight ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                </TableHead>
                {onDateFlight.map((item) => (
                  <TableBody key={item.id}>
                    <TableRow
                      onClick={() => console.log(item, "Test")}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{from.name}</TableCell>
                      <TableCell>{to.name}</TableCell>
                      <TableCell>
                        {new Date(item.time).toLocaleString("en-US", {
                          weekday: "short", // long, short, narrow
                          day: "numeric", // numeric, 2-digit
                          year: "numeric", // numeric, 2-digit
                          month: "long", // numeric, 2-digit, long, short, narrow
                          hour: "numeric", // numeric, 2-digit
                        })}
                      </TableCell>
                      <TableCell> {from.name} </TableCell>
                      <TableCell>
                        <BookOnline />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </TableContainer>
          ) : (
            <Paper>
              No Flight Found From <b> {from.name} </b> To <b> {to.name} </b>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

function getDate(str) {
  const date = new Date(str);
  return [date.getMonth(), date.getDate(), date.getFullYear()];
}
export default Flight;
