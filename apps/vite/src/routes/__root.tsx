import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Navigation } from 'app/components/navigation';
import { Provider } from 'app/provider';

export const Route = createRootRoute({
  component: () => (
    <Provider>
      <Navigation />
      <Outlet />
      <TanStackRouterDevtools />
    </Provider>
  ),
});
