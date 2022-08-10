import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useLocation, Navigate } from "react-router-dom";
import FlightTakeoff from "@mui/icons-material/Flight";
import BookOnline from "@mui/icons-material/AirplaneTicket";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import contexts from "./contexts";
import _ from "lodash";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  mt: 3,
  mb: 3,
};

function Flight() {
  const { state } = useLocation();
  const [flights, setFlights] = useState(null);
  const [flight, setFlight] = useState(null);
  const [backToSearch, setBackToSearch] = useState(false);
  const [onDateFlight, setOnDateFlight] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const apiContext = useContext(contexts.apiContext);
  const [userContext, setUserContext] = useContext(contexts.userContext);

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

  const updateUser = (id, user) =>
    apiContext.user
      .updateUser(id, user)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

  const handleSubmit = (event) => {
    event.preventDefault();
    let trip = { ...userContext.user };
    trip.trips += flight + ",";
    updateUser(trip.id, trip);
    handleClose();
    setBackToSearch(true);
  };

  if (
    _.isEmpty(userContext) ||
    _.isEmpty(userContext.user) ||
    Object.keys(userContext.user).length === 0
  ) {
    return <Navigate to="/login" />;
  }

  if (backToSearch) {
    return <Navigate to="/search" />;
  }
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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  Payment Details
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="nameOnCard"
                    label="Name On Card"
                    name="nameOnCard"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="cardNumber"
                    label="Card Number"
                    name="cardNumber"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="cvc"
                    label="CVC"
                    name="cvc"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="zip"
                    label="ZIP"
                    name="zip"
                    autoComplete="zip"
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Book
              </Button>
            </Box>
          </Modal>
        </Grid>
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
                      onClick={() => {
                        handleOpen();
                        setFlight(item.id);
                      }}
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
                      <TableCell> ${item.cost} </TableCell>
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
