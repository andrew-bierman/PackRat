import React, { type FC, type ReactNode } from 'react';
import { ListItem, type ListItemProps, YGroup, Text, useTheme } from 'tamagui';

interface DetailsItem extends ListItemProps {
  key: string | number;
  label: ReactNode;
  value: ReactNode;
}
interface DetailsProps {
  items: DetailsItem[];
}
export const Details: FC<DetailsProps> = ({ items }) => {
  const theme = useTheme();
  const primaryColor = theme.primary;

  return (
    <YGroup alignSelf="center" width="100%" size="$2">
      {items.map(({ key, label, value, ...item }) => (
        <YGroup.Item key={key}>
          <ListItem
            {...item}
            size="$4"
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'space-between',
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                alignItems: 'center',
                flexWrap: 'wrap',
                textTransform: 'capitalize',
                // color: primaryColor?.val,
                flex: 1,
                fontSize: 14,
              }}
            >
              {label}:
            </Text>
            <Text style={{ textAlign: 'right', fontSize: 14 }}>{value}</Text>
          </ListItem>
        </YGroup.Item>
      ))}
    </YGroup>
  );
};
