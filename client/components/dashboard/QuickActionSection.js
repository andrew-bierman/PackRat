import { HStack } from 'native-base';
import QuickActionButton from './QuickActionButton';
import { useRouter } from 'expo-router';
import useCustomStyles from '~/hooks/useCustomStyles';

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
    if (action === 'createPack') {
      router.push('/pack/create');
    } else if (action === 'createTrip') {
      router.push('/trip/create');
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
