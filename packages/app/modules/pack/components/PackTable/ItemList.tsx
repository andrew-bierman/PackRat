import React, { useEffect, useRef, useState } from 'react';
import { RIconButton, RInput, RStack, RText } from '@packrat/ui';
import { ListItem } from 'tamagui';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { convertWeight } from 'app/utils/convertWeight';
import { SMALLEST_ITEM_UNIT } from 'app/modules/item/constants';
import useTheme from 'app/hooks/useTheme';
import useResponsive from 'app/hooks/useResponsive';

interface ItemListProps {
  item: any;
  onSubmitQuantity: (itemId: string, quantity: number) => void;
  handleDeleteItem: (itemId: string) => void;
}

export const ItemList = ({
  item,
  handleDeleteItem,
  onSubmitQuantity = () => {},
}: ItemListProps) => {
  const { currentTheme } = useTheme();
  const responsive = useResponsive();
  const { value, setValue, increase, decrease, hasError, submit } =
    useQuantityInput(item.quantity, (value: number) =>
      onSubmitQuantity(item.id, value),
    );

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
            onPress={decrease}
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
            value={String(value)}
            onChangeText={(text) => setValue(Number(text))}
            onBlur={(e) => submit(Number(e.target.value))}
            style={{
              width: 40,
              padding: 0,
              textAlign: 'center',
              height: responsive.xxs ? 25 : 30,
              color: currentTheme.colors.text,
              fontSize: 12,
              borderWidth: 1,
              borderColor: hasError ? 'red' : '',
            }}
          />

          <RIconButton
            onPress={increase}
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
              width: responsive.xxs ? 80 : 110,
              fontSize: responsive.xxs ? 10 : responsive.sm ? 12 : 14,
            }}
          >
            {`Weight: ${convertWeight(item.weight, SMALLEST_ITEM_UNIT, item.unit)} ${item.unit}`}
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
          onPress={() => handleDeleteItem(item.id)}
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

const useQuantityInput = (
  defaultValue: number,
  onChange: (value: number) => void,
) => {
  const [quantity, setQuantity] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setQuantity(defaultValue);
  }, [defaultValue]);

  const submit = (value: number) => {
    setQuantity(value);
    if (!validateQuantity(value)) {
      return setHasError(true);
    }

    setHasError(false);

    onChange(value);
  };

  const increase = () => {
    submit(quantity + 1);
  };

  const decrease = () => {
    submit(quantity - 1);
  };

  return {
    value: quantity,
    setValue: setQuantity,
    hasError,
    increase,
    decrease,
    submit,
  };
};

const validateQuantity = (quantity: number) => quantity > 0;
