import { View, Text } from 'react-native';
import { usePathname } from 'expo-router';
import Dashboard from 'screens/dashboard';

export default function Home() {
  const path = usePathname();

  console.log(path);
  return <Dashboard />;
}
