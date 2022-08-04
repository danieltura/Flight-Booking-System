import axios from "axios";

export default class AirportController {
  constructor(url) {
    this.base_url = url;
  }

  async getAirports() {
    const airports = await axios.get(this.base_url);
    return airports.data;
  }

  async getAirport(airportId) {
    const airport = await axios.get(this.base_url + airportId + "/");
    return airport.data;
  }
}
