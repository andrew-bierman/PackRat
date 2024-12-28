import React, { useEffect, useState } from 'react';
import { Separator, Text, View, YGroup } from 'tamagui';
import { RButton } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';
import { useAddPackItem } from 'app/modules/pack';
import { ScrollView } from 'react-native';

interface Category {
  id: string;
  name: string;
}

interface SuggestionItem {
  id: string;
  name: string;
  ownerId: string;
  weight: number;
  quantity: number;
  unit: string;
  category: Category;
}

interface SuggestionListProps {
  suggestion: { Items: SuggestionItem[] } | null;
  onAddItem: (itemId: string) => void;
}

export function SuggestionList({ suggestion, onAddItem }: SuggestionListProps) {
  const [itemsList, setItemsList] = useState<SuggestionItem[]>([]);
  const { isDark } = useTheme();

  useEffect(() => {
    if (suggestion?.Items) {
      setItemsList(suggestion.Items);
    } else {
      setItemsList([]);
    }
  }, [suggestion]);

  return (
    <YGroup
      style={{
        background: isDark ? '#333' : 'white',
        // padding: 10,
        borderRadius: 0,
        height: '100%',
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          minWidth: 300,
          height: '100%',
          overflow: 'scroll',
        }}
      >
        {itemsList.map((item, i) => (
          <React.Fragment key={item.id}>
            <Item item={item} onAddItem={onAddItem} />
            {i < itemsList.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </ScrollView>
    </YGroup>
  );
}

SuggestionList.fileName = 'List';

interface ItemProps {
  item: SuggestionItem;
  onAddItem: (itemId: string) => void;
}

function Item({ item, onAddItem }: ItemProps) {
  const { addPackItem, isLoading } = useAddPackItem();

  const handleAddItem = (item) => {
    addPackItem(item);
    onAddItem(item.id);
  };

  return (
    <YGroup.Item>
      <View
        paddingVertical="$1"
        paddingHorizontal="$1.5"
        gap="$2"
        $group-window-gtXs={{
          padding: '$4',
          gap: '$4',
        }}
        backgroundColor="$color1"
        style={{
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text selectable>{item.name}</Text>
          <Text
            selectable
            fontSize="$2"
            lineHeight="$2"
            fontWeight="$2"
            // theme="alt1"
          >
            {item.category} {item.weight}
            {item.unit}, {item.quantity}pcs
          </Text>
        </View>
        <RButton
          onPress={() => {
            handleAddItem(item);
          }}
          style={{ borderRadius: 5, marginLeft: 'auto' }}
          disabled={isLoading}
        >
          Add
        </RButton>
      </View>
    </YGroup.Item>
  );
}
