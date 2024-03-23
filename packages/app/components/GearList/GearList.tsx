import { RStack, RText } from '@packrat/ui';
import { FontAwesome5 } from '@expo/vector-icons';
import { AddPackContainer } from '../pack/AddPack';
import useTheme from '../../hooks/useTheme';
import PackContainer from '../pack/PackContainer';
import { Paragraph } from 'tamagui';
import { useFormContext } from 'react-hook-form';

export const GearList = ({ setPackId }) => {
  const { currentTheme } = useTheme();
  const { formState } = useFormContext();

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
        border: formState.errors.packId ? `2px solid ${currentTheme.colors.error}` : 'none'
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
      <PackContainer isCreatingTrip={true} setPackId={setPackId} />
      {
        formState.errors.packId && (
          <Paragraph
            color='$red10'
          >
            Please select a pack
          </Paragraph>
        )
      }
    </RStack>
  );
};
