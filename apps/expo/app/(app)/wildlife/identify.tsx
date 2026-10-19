import { IdentificationScreen } from 'expo-app/features/wildlife/screens/IdentificationScreen';
import { OnDeviceIdentificationScreen } from 'expo-app/features/wildlife/screens/OnDeviceIdentificationScreen';
import { useFeatureFlag } from 'expo-app/hooks/useFeatureFlags';
import { Redirect } from 'expo-router';

export default function IdentifyRoute() {
  const enableWildlifeIdentification = useFeatureFlag('enableWildlifeIdentification');
  // Swaps the engine behind the same entry point rather than adding a second one.
  const enableOfflineWildlifeID = useFeatureFlag('enableOfflineWildlifeID');
  if (!enableWildlifeIdentification) {
    return <Redirect href="/" />;
  }
  return enableOfflineWildlifeID ? <OnDeviceIdentificationScreen /> : <IdentificationScreen />;
}
