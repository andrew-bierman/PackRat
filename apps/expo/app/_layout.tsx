import { Provider } from 'app/provider';
import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Provider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </Provider>
  );
}
