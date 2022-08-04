import UserController from "./UserController";
import FlightController from "./FlightController";
import AirportController from "./AirportController";

const base_url = "http://localhost:8000/api/";

const user = new UserController(base_url + "user/");
const airport = new AirportController(base_url + "airport/");
const flight = new FlightController(base_url + "flight/");

export default { user, airport, flight };
