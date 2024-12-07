import { RStack, RText } from '@packrat/ui';
import { FontAwesome5 } from '@expo/vector-icons';
import { AddPackContainer } from './pack/AddPack';
import useTheme from '../hooks/useTheme';
import PackContainer from './pack/PackContainer';

export const GearList = () => {
  const { currentTheme } = useTheme();
  return (
    <RStack
      alignSelf="center"
      $sm={{
        borderRadius: '6px',
        width: '100%',
      }}
      $gtSm={{
        borderRadius: '12px',
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
              paddingVertical: 12,
              fontWeight: 600,
            }}
            fontFamily="$body"
          >
            Gear List
          </RText>
        </RStack>
      </RStack>

      <AddPackContainer />
      <PackContainer isCreatingTrip={true} />
    </RStack>
  );
};
