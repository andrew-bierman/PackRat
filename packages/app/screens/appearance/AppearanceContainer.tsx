import React, { useMemo } from 'react';
import { ScrollView, View } from 'tamagui';
import { AppearanceLayout } from './AppearanceLayout';
import { NavigationList } from './components/NavigationList';
import { UiKitRoutes } from './ui-kit';
import find from 'lodash/find';
import some from 'lodash/some';

export default function AppearanceContainer() {
  const [activeRoute, setActiveRoute] = React.useState('button');
  console.log({ UiKitRoutes });
  const ActiveComponent = useMemo(() => {
    const currentRoute = findItemInObject(
      UiKitRoutes,
      ({ route }) => route === activeRoute,
    );
    console.log('currentRoute', currentRoute);
    return currentRoute ? currentRoute.component : null;
  }, [activeRoute]);

  return (
    <ScrollView>
      <AppearanceLayout
        navigationList={<NavigationList onRouteChange={setActiveRoute} />}
        currentRoute={<ActiveComponent />}
      />
    </ScrollView>
  );
}

const findItemInObject = (obj: Record<string, any[]>, predicate) => {
  for (const [key, value] of Object.entries(obj)) {
    const found = value.find(predicate);
    console.log({ found });
    if (found) {
      return found;
    }
  }
};
