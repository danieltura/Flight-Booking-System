import axios from "axios";

export default class FlightController {
  constructor(url) {
    this.base_url = url;
  }

  async getFlights() {
    const flights = await axios.get(this.base_url);
    return flights.data;
  }

  async getFlight(flightId) {
    const flight = await axios.get(this.base_url + flightId + "/");
    return flight.data;
  }
}
