// export const api = "http://add your ip address";

import { ENVIRONMENT, API_URL } from "@env";

let api = "http://localhost:3000";

if (ENVIRONMENT === "production") {
  api = API_URL;
} else {
  api = "http://localhost:3000";
}

export { api };
