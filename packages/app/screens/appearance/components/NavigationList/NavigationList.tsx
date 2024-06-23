import React from 'react';
import { ChevronDown } from '@tamagui/lucide-icons';

import { Accordion } from 'tamagui';
import { UiKitRoutes } from 'app/screens/appearance/ui-kit';
import { RButton, RStack, RText } from '@packrat/ui';
export function NavigationList({
  onRouteChange,
}: {
  onRouteChange: (route: string) => void;
}) {
  return (
    <Accordion style={{ width: '100%' }}>
      {Object.entries(UiKitRoutes).map(([key, value]) => {
        console.log(key, value);
        return (
          <Accordion.Item key={key} value={key}>
            <Accordion.Trigger>{key}</Accordion.Trigger>
            <Accordion.Content>
              <RStack>
                {value.map(({ route }) => {
                  return (
                    <RButton onPress={() => onRouteChange(route)} key={route}>
                      <RText>{route}</RText>
                    </RButton>
                  );
                })}
              </RStack>
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}
