import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import contexts from "./contexts";
import _ from "lodash";

function Trips() {
  const [flights, setFlights] = useState(null);
  const apiContext = useContext(contexts.apiContext);
  const [userContext, s] = useContext(contexts.userContext);

  useEffect(() => {
    if (!flights) {
      getAllFlights();
    }
  }, [flights]);

  const getAllFlights = () =>
    apiContext.flight
      .getFlights()
      .then((res) => {
        const f = [];
        for (const r of res) {
          if (userContext.user.trips.includes(_.toString(r.id))) {
            f.push(r);
          }
        }
        setFlights([...f]);
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
          {flights ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Cost</TableCell>
                  </TableRow>
                </TableHead>
                {flights.map((item) => (
                  <TableBody key={item.id}>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{item.departure}</TableCell>
                      <TableCell>{item.destination}</TableCell>
                      <TableCell>
                        {new Date(item.time).toLocaleString("en-US", {
                          weekday: "short", // long, short, narrow
                          day: "numeric", // numeric, 2-digit
                          year: "numeric", // numeric, 2-digit
                          month: "long", // numeric, 2-digit, long, short, narrow
                          hour: "numeric", // numeric, 2-digit
                        })}
                      </TableCell>
                      <TableCell>${item.cost}</TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </TableContainer>
          ) : (
            <Paper>
              <b> No Trip Found From </b>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
export default Trips;
