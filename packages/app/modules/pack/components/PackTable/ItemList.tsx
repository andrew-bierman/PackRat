import React from 'react';
import { RIconButton, RInput, RStack, RText } from '@packrat/ui';
import { ListItem } from 'tamagui';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { convertWeight } from 'app/utils/convertWeight';
import { SMALLEST_ITEM_UNIT } from 'app/modules/item/constants';
import useTheme from 'app/hooks/useTheme';
import useResponsive from 'app/hooks/useResponsive';

interface ItemListProps {
  item: any;
  quantities: any;
  handleDecrease: (itemId: string) => void;
  handleIncrease: (itemId: string) => void;
  handleQuantityChange: (itemId: string, newQuantity: string) => void;
}

export const ItemList = ({
  item,
  quantities,
  handleDecrease,
  handleIncrease,
  handleQuantityChange,
}: ItemListProps) => {
  const { currentTheme } = useTheme();
  const responsive = useResponsive();

  return (
    <ListItem hoverTheme pressTheme>
      <RStack
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <RText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            marginTop: 10,
            color: currentTheme.colors.text,
            fontSize: responsive.xxs ? 12 : responsive.sm ? 14 : 16,
            fontWeight: 'bold',
            flexBasis: '25%',
          }}
        >
          {item.name}
        </RText>

        <RStack
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexBasis: '25%',
          }}
        >
          <RIconButton
            onPress={() => handleDecrease(item.id)}
            style={{
              width: responsive.xxs ? 18 : responsive.sm ? 20 : 25,
              height: responsive.xxs ? 18 : responsive.sm ? 20 : 25,
              padding: 0,
            }}
          >
            <AntDesign
              name="minus"
              size={responsive.xxs ? 10 : responsive.sm ? 12 : 14}
              color={currentTheme.colors.text}
            />
          </RIconButton>

          <RInput
            value={String(quantities[item.id])}
            onChangeText={(text) => handleQuantityChange(item.id, text)}
            style={{
              width: 40,
              height: responsive.xxs ? 25 : 30,
              color: currentTheme.colors.text,
              fontSize: 12,
              borderWidth: 0,
            }}
          />

          <RIconButton
            onPress={() => handleIncrease(item.id)}
            style={{
              width: responsive.xxs ? 18 : responsive.sm ? 20 : 25,
              height: responsive.xxs ? 18 : responsive.sm ? 20 : 25,
              padding: 0,
            }}
          >
            <AntDesign
              name="plus"
              size={responsive.xxs ? 10 : responsive.sm ? 12 : 14}
              color={currentTheme.colors.text}
            />
          </RIconButton>
        </RStack>

        <RStack
          style={{
            flexBasis: '20%',
            alignItems: 'center',
          }}
        >
          <RText
            style={{
              color: currentTheme.colors.text,
              marginLeft: responsive.xxs ? 10 : 20,
              width: responsive.xxs ? 50 : 80,
              fontSize: responsive.xxs ? 10 : responsive.sm ? 12 : 14,
            }}
          >
            {`Weight: ${convertWeight(item.weight, SMALLEST_ITEM_UNIT, item.unit)}`}
          </RText>
        </RStack>

        <RText
          style={{
            color: currentTheme.colors.text,
            fontSize: responsive.xxs ? 11 : responsive.sm ? 12 : 14,
            flexBasis: '20%',
            textAlign: 'center',
          }}
        >
          {item.category.name}
        </RText>

        <RIconButton
          onPress={() => console.log('Delete')}
          style={{ backgroundColor: 'transparent' }}
        >
          <MaterialIcons
            name="delete"
            size={responsive.xxs ? 18 : responsive.sm ? 20 : 24}
            color={currentTheme.colors.text}
          />
        </RIconButton>
      </RStack>
    </ListItem>
  );
};
