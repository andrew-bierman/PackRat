import React, { useEffect, useState } from 'react';
import { RStack, RText, RIconButton, RInput } from '@packrat/ui';
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
  isActionsEnabled: boolean;
}

export const ItemList = ({
  item,
  handleDeleteItem,
  onSubmitQuantity = () => {},
  isActionsEnabled,
}: ItemListProps) => {
  const { currentTheme } = useTheme();
  const responsive = useResponsive();
  const { value, setValue, increase, decrease, hasError, submit } =
    useQuantityInput(item.quantity, (value: number) =>
      onSubmitQuantity(item.id, value),
    );

  return (
    <>
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
            style={{
              marginTop: 10,
              color: currentTheme.colors.text,
              fontSize: 16,
              fontWeight: 'bold',
              flexBasis: '25%',
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </RText>
          <RText
            style={{
              color: currentTheme.colors.text,
              fontSize: 14,
              flexBasis: '20%',
              textAlign: 'center',
            }}
          >
            {item.category.name}
          </RText>
          <RText
            style={{
              color: currentTheme.colors.text,
              flexBasis: '20%',
              textAlign: 'center',
            }}
          >
            {`${convertWeight(item.weight, SMALLEST_ITEM_UNIT, item.unit)}${item.unit}`}
          </RText>
          <RStack
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flexBasis: '25%',
            }}
          >
            {isActionsEnabled ? (
              <>
                <RIconButton
                  onPress={decrease}
                  style={{
                    width: 25,
                    height: 25,
                    padding: 0,
                  }}
                >
                  <AntDesign
                    name="minus"
                    size={14}
                    color={currentTheme.colors.text}
                  />
                </RIconButton>
                <RInput
                  value={String(value)}
                  onChangeText={(text) => setValue(Number(text))}
                  onBlur={(e) => submit(Number(value))}
                  style={{
                    width: 40,
                    padding: 0,
                    textAlign: 'center',
                    height: 30,
                    color: currentTheme.colors.text,
                    fontSize: 12,
                    borderWidth: 1,
                    borderColor: hasError ? 'red' : currentTheme.colors.border,
                  }}
                />
                <RIconButton
                  onPress={increase}
                  style={{
                    width: 25,
                    height: 25,
                    padding: 0,
                  }}
                >
                  <AntDesign
                    name="plus"
                    size={14}
                    color={currentTheme.colors.text}
                  />
                </RIconButton>
              </>
            ) : (
              <RText style={{ fontSize: 12, color: currentTheme.colors.text }}>
                {value}
              </RText>
            )}
          </RStack>
          {isActionsEnabled && (
            <RIconButton
              onPress={() => handleDeleteItem(item.id)}
              style={{ backgroundColor: 'transparent', flexBasis: '10%' }}
            >
              <MaterialIcons
                name="delete"
                size={24}
                color={currentTheme.colors.text}
              />
            </RIconButton>
          )}
        </RStack>
      </ListItem>
    </>
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
