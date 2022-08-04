import axios from "axios";

export default class UserController {
  constructor(url) {
    this.base_url = url;
  }

  async getUsers() {
    const users = await axios.get(this.base_url);
    return users.data;
  }

  async getUser(userId) {
    const user = await axios.get(this.base_url + userId + "/");
    return user.data;
  }

  async addUser(user) {
    const user_ = await axios.post(this.base_url, user);
    return user_.data;
  }
}
