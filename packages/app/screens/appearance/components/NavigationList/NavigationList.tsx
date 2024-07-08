import React from 'react';
import { ChevronDown } from '@tamagui/lucide-icons';

import {
  Accordion,
  YGroup,
  ListItem,
  Square,
  Separator,
  Paragraph,
} from 'tamagui';
import { KitchenSinkRoutes } from 'app/screens/appearance/kitchen-sink';
import { Pressable } from 'react-native';
export function NavigationList({
  onRouteChange,
  onPressItem,
}: {
  onRouteChange: (route: string) => void;
  onPressItem: (route: string) => void;
}) {
  return (
    <Accordion style={{ width: '100%', overflowY: 'auto' }} type="multiple">
      {Object.entries(KitchenSinkRoutes).map(([key, value]) => {
        return (
          <Accordion.Item key={key} value={key}>
            <Accordion.Trigger
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              {({ open }: { open: boolean }) => (
                <>
                  <Paragraph>{key}</Paragraph>
                  <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                    <ChevronDown size="$1" />
                  </Square>
                </>
              )}
            </Accordion.Trigger>
            <Accordion.Content>
              <YGroup
                alignSelf="center"
                bordered
                width="100%"
                size="$4"
                style={{
                  overflow: 'auto'
                }}
              >
                {value.map(({ route }) => {
                  return (
                    <>
                      <Pressable
                        onPress={() => {
                          onPressItem?.(route);
                          onRouteChange(route);
                        }}
                        key={route}
                      >
                        <YGroup.Item>
                          <ListItem hoverTheme title={route} />
                        </YGroup.Item>
                      </Pressable>
                      <Separator />
                    </>
                  );
                })}
              </YGroup>
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}
