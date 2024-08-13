import React from 'react';
import { MainContentWeb } from '@packrat/ui';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { NavbarTauri } from 'app/components/navigation';
import { Provider } from 'app/provider';
import { View } from 'react-native';
import { FullSideBar } from 'app/components/navigation/SideBar';

export const Route = createRootRoute({
  component: () => (
    <Provider>
      <NavbarTauri />
      <View style={{ paddingLeft: 300, paddingRight: 10 }}>
        <MainContentWeb>
          <Outlet />
        </MainContentWeb>
      </View>
      <TanStackRouterDevtools />
    </Provider>
  ),
});
