import { lazy } from 'react';

export const InputRoute = {
  component: lazy(async () => import('./Input')),
  route: 'input',
};
