import React from 'react';
import { RStack, RText, RIconButton, RInput } from '@packrat/ui';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import useTheme from 'app/hooks/useTheme';

interface ItemCardProps {
  item: any;
  value: number;
  decrease: () => void;
  increase: () => void;
  setValue: (value: number) => void;
  submit: (value: number) => void;
  hasError: boolean;
  handleDeleteItem: (itemId: string) => void;
  isActionsEnabled: boolean;
}

export const ItemCard = ({
  item,
  value,
  decrease,
  increase,
  setValue,
  submit,
  hasError,
  handleDeleteItem,
  isActionsEnabled,
}: ItemCardProps) => {
  const { currentTheme } = useTheme();

  return (
    <RStack
      style={{
        backgroundColor: currentTheme.colors.background,
        padding: 16,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: currentTheme.colors.cardBorderPrimary,
      }}
    >
      <RStack
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <RText
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: currentTheme.colors.text,
          }}
        >
          {item.name}
        </RText>
        <RText
          style={{
            fontSize: 14,
            color: currentTheme.colors.textSecondary,
          }}
        >
          {item.category.name}
        </RText>
      </RStack>
      <RStack style={{ marginTop: 10 }}>
        <RText
          style={{
            fontSize: 14,
            color: currentTheme.colors.textSecondary,
          }}
        >
          {`Weight: ${item.weight} ${item.unit}`}
        </RText>
        {isActionsEnabled ? (
          <RStack
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <RStack
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
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
                onBlur={(e) => submit(Number(e.target.value))}
                style={{
                  width: 50,
                  padding: 0,
                  textAlign: 'center',
                  height: 30,
                  color: currentTheme.colors.text,
                  fontSize: 12,
                  borderWidth: 1,
                  borderColor: hasError ? 'red' : currentTheme.colors.border,
                  marginHorizontal: 8,
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
            </RStack>
            <RStack
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <RIconButton
                onPress={() => handleDeleteItem(item.id)}
                style={{
                  backgroundColor: 'transparent',
                }}
              >
                <MaterialIcons
                  name="delete"
                  size={24}
                  color={currentTheme.colors.text}
                />
              </RIconButton>
            </RStack>
          </RStack>
        ) : (
          <RText
            style={{
              fontSize: 12,
              color: currentTheme.colors.text,
              marginTop: 10,
            }}
          >
            Quantity: {value}
          </RText>
        )}
      </RStack>
    </RStack>
  );
};
