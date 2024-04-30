import { NODE_ENV, API_URL, NEXT_PUBLIC_API_URL } from '@env';

let api = API_URL ?? NEXT_PUBLIC_API_URL;

if(!api && NODE_ENV !== 'production') {
  api = 'http://localhost:8787/api';
}

export { api };
