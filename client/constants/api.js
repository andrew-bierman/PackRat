// export const api = "http://add your ip address";

import { NODE_ENV, API_URL } from '@env';

let api = 'https://f4f1-182-185-161-23.ngrok-free.app';

if (NODE_ENV === 'production') {
  api = API_URL;
} else {
  api = 'https://f4f1-182-185-161-23.ngrok-free.app';
  // api = "https://packrat.onrender.com";
}

export { api };
