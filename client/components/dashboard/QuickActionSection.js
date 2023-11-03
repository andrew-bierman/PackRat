import { HStack } from 'native-base';
import QuickActionButton from './QuickActionButton';
import useTheme from '../../hooks/useTheme';
import { useRouter } from 'expo-router';
import useCustomStyles from '~/hooks/useCustomStyles';
import { Platform } from 'react-native';

const QuickActionsSection = () => {
  const router = useRouter();
  const styles = useCustomStyles(loadStyles);

  const quickActionData = [
    {
      action: 'createPack',
      iconName: 'backpack',
      text: 'Create a Pack',
    },
    {
      action: 'createTrip',
      iconName: 'navigation',
      text: 'Create a Trip',
    },
  ];

  /**
   * Handles the selection of an action.
   *
   * @param {string} action - The selected action.
   */
  const handleActionSelect = (action) => {
    const isWeb = Platform.OS == 'web';
    if (action === 'createPack') {
      router.push(isWeb ? '/pack/create' : '/tabs/pack/create');
    } else if (action === 'createTrip') {
      router.push(isWeb ? '/trip/create' : '/tabs/trip/create');
    }
  };

  return (
    <HStack style={styles.section}>
      {quickActionData.map((action) => (
        <QuickActionButton
          key={action.action}
          onPress={() => {
            handleActionSelect(action.action);
          }}
          iconName={action.iconName}
          text={action.text}
        />
      ))}
    </HStack>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    section: {
      marginBottom: 20,
      paddingHorizontal: 20, // Added padding here.
    },
    card: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 20,
      backgroundColor: currentTheme.colors.secondaryBlue,
    },
  };
};
export default QuickActionsSection;
