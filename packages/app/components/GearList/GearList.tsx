import React from 'react';
import { RStack as OriginalRStack, RText as OriginalRText } from '@packrat/ui';
import { FontAwesome5 } from '@expo/vector-icons';
import { AddPackContainer } from '../pack/AddPack';
import useTheme from '../../hooks/useTheme';
import PackContainer from '../pack/PackContainer';

const RStack: any = OriginalRStack;
const RText: any = OriginalRText;

export const GearList = () => {
  const { currentTheme } = useTheme();
  return (
    <RStack
      alignSelf="center"
      $sm={{
        borderRadius: 6,
        width: '100%',
      }}
      $gtSm={{
        borderRadius: 12,
        width: '90%',
      }}
      style={{
        flexDirection: 'column',
        backgroundColor: currentTheme.colors.card,
        gap: 15,
        marginVertical: 10,
        alignItems: 'center',
        padding: 30,
      }}
    >
      <RStack>
        <RStack
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <FontAwesome5
            name="clipboard-check"
            size={20}
            color={currentTheme.colors.cardIconColor}
          />
          <RText
            style={{
              color: currentTheme.colors.textPrimary,
              fontSize: currentTheme.font.size,
              paddingTop: 12,
              paddingBottom: 12,
              fontWeight: 600,
            }}
            fontFamily="$body"
          >
            Gear List
          </RText>
        </RStack>
      </RStack>

      <AddPackContainer isCreatingTrip={true} />
      <PackContainer isCreatingTrip={true} />
    </RStack>
  );
};
