import React, { useEffect, useState } from 'react';
import { Phone } from '@tamagui/lucide-icons';
import type { ColorTokens } from 'tamagui';
import { Avatar, Button, Circle, Separator, Text, View, YGroup } from 'tamagui';
import { RButton } from '@packrat/ui';

// type SuggestionList = typeof suggestion.Items;

export function SuggestionList({ suggestion }) {
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    setItemsList(suggestion.Items);
  }, []);
  return (
    <YGroup width="100%" justifyContent="center" alignItems="center">
      <View
        $group-window-gtXs={{
          padding: '$3',
          width: 600,
        }}
        gap="$1.5"
        minWidth="100%"
      >
        {itemsList.map((item, i) => (
          <React.Fragment key={item.name}>
            <Item item={item} />
            {i < itemsList.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </View>
    </YGroup>
  );
}

SuggestionList.fileName = 'List';

function Item({ item }) {
  return (
    <YGroup.Item>
      <View
        flexDirection="row"
        paddingVertical="$2"
        gap="$2"
        $group-window-gtXs={{
          padding: '$4',
          gap: '$4',
        }}
        backgroundColor="$color1"
        alignItems="center"
      >
        <View flexDirection="column" flexShrink={1} justifyContent="center">
          <Text selectable>{item.name}</Text>
          <Text
            selectable
            fontSize="$2"
            lineHeight="$2"
            fontWeight="$2"
            theme="alt1"
          >
            {item.category} {item.weight}
            {item.unit}, {item.quantity}pcs
          </Text>
        </View>
        <RButton marginLeft="auto">Add</RButton>
      </View>
    </YGroup.Item>
  );
}
