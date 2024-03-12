import {Platform} from 'react-native';

import { NODE_ENV, API_URL, NEXT_PUBLIC_API_URL } from '@env';

let api = 'http://localhost:3000/api';

if (NODE_ENV === 'production') {
  // api = API_URL;
  api = NEXT_PUBLIC_API_URL;
} else {
  if (Platform.OS !== 'web')
    api = 'https://packrat-dev-qj5h.onrender.com/api';
  else
    api = 'http://localhost:3000/api';
  // api = "https://packrat.onrender.com";
}

export { api };

