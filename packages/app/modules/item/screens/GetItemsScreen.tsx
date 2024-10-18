import React, { useState, useEffect } from 'react';
import { useAuthUser } from 'app/modules/auth';
import { View } from 'tamagui';

function GetItemsScreen() {
  const user = useAuthUser();
  const [ItemsComponent, setItemsComponent] = useState<React.ComponentType | null>(null);
  useEffect(() => {
    async function loadScreen() {
      if (user.role === 'admin') {
        const { ItemsScreen } = await import('./ItemsScreen');
        setItemsComponent(() => ItemsScreen);
      } 
      else if (user.role === 'user') {
        const { ItemsFeed: ItemsScreen } = await import('./ItemsFeed');
        setItemsComponent(() => ItemsScreen);
      }
    }

    loadScreen().catch((err) => {
      console.error(err);
    });
  }, [user]);

  if (!ItemsComponent) {
    return <View></View>;
  }

  return <ItemsComponent />;
}

export { GetItemsScreen };
