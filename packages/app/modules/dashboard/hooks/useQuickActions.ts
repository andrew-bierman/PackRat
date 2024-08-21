import { useRouter } from 'app/hooks/router';
import { MaterialIcons } from '@expo/vector-icons';

interface IQuickActionData {
  action: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  text: string;
  href?: string;
}

const quickActionData: IQuickActionData[] = [
  {
    action: 'createPack',
    iconName: 'backpack',
    text: 'Create a Pack',
    href: '/pack/create',
  },
  /* DISABLE TRIP TEMP */
  // {
  //   action: 'createTrip',
  //   iconName: 'navigation',
  //   text: 'Create a Trip',
  //   href: '/trip/create',
  // },
];

export const useQuickActions = () => {
  const router = useRouter();

  /**
   * Handles the selection of an action.
   *
   * @param {string} action - The selected action.
   */
  const handleActionSelect = (action: string) => {
    const selectedAction = quickActionData.find((a) => a.action === action);
    if (selectedAction && selectedAction.href) {
      router.push(selectedAction.href);
    }
  };

  return { quickActionData, handleActionSelect };
};
