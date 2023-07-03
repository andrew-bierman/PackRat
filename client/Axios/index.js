import React from "react";
import axios from "axios";

import { api } from "../constants/api";

export class AxiosInstance {
  static async addItem(item) {
    return await axios.post(`${api}/item`, item);
  }
}
