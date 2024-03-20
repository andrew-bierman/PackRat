import { MainContentWeb } from '@packrat/ui';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Navbar } from 'app/components/navigation';
import { Provider } from 'app/provider';

export const Route = createRootRoute({
  component: () => (
    <Provider>
      <Navbar />
      <MainContentWeb>
        <Outlet />
      </MainContentWeb>
      <TanStackRouterDevtools />
    </Provider>
  ),
});
