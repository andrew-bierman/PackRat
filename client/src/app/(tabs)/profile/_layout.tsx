import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="edit"
        options={{
          headerShown: true,
          title: 'Edit Profile',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
