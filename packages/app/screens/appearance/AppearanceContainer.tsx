import React, { useMemo } from 'react';
import { ScrollView, View } from 'tamagui';
import { AppearanceLayout } from './AppearanceLayout';
import { NavigationList } from './components/NavigationList';
import { KitchenSinkRoutes } from './kitchen-sink';

export default function AppearanceContainer() {
  const [activeRoute, setActiveRoute] = React.useState('button');
  console.log({ KitchenSinkRoutes });
  const ActiveComponent = useMemo(() => {
    const currentRoute = findItemInObject(
      KitchenSinkRoutes,
      ({ route }) => route === activeRoute,
    );
    console.log('currentRoute', currentRoute);
    return currentRoute ? currentRoute.component : null;
  }, [activeRoute]);

  return (
    <ScrollView style={{ height: '100%' }}>
      <AppearanceLayout
        navigationList={
          <NavigationList
            onRouteChange={setActiveRoute}
            onPressItem={() => {}}
          />
        }
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
