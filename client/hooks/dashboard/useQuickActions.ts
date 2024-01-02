import { useRouter } from "expo-router";

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

export const useQuickActions = () => {
  const router = useRouter();

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

  return { quickActionData, handleActionSelect }
}