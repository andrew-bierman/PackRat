import { View, Text } from 'react-native';
import { usePathname } from 'expo-router';
import Trips from '../../screens/trip/createTrip';

export default function TripsLayout() {
  return <Trips />;
}