import { MainContentWeb } from '@packrat/ui';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Navbar } from 'app/components/navigation';
import { Provider } from 'app/provider';
import { NODE_ENV } from '@packrat/config';

export const Route = createRootRoute({
  component: () => (
    <Provider>
      <Navbar />
      <MainContentWeb>
        <Outlet />
      </MainContentWeb>
      {NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </Provider>
  ),
});
