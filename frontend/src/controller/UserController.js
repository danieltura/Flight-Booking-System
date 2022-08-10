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
    const new_user = await axios.post(this.base_url, user);
    return new_user.data;
  }

  async updateUser(id, user) {
    const update_user = await axios.put(this.base_url + id + "/", user);
    return update_user.data;
  }
}
