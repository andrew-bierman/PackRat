import { lazy } from 'react';

export const ButtonRoute = {
  component: lazy(async () => import('./Button')),
  route: 'button',
};
