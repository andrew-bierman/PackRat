// export const api = "http://add your ip address";

import { NODE_ENV, API_URL } from "@env";

// let api = "http://localhost:3000";
let api = " https://26af-182-185-161-23.ngrok-free.app";

if (NODE_ENV === "production") {
  api = API_URL;
} else {
  api = " https://26af-182-185-161-23.ngrok-free.app";

  // api = "http://localhost:3000";
  // api = "https://packrat.onrender.com";
}

export { api };
