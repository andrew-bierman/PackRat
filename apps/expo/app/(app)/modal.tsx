import { Platform, ScrollView, View } from 'react-native';
import { Stack, router, Link } from 'expo-router';
import Head from 'expo-router/head';
import { RText } from '@packrat/ui';
import { StatusBar } from 'expo-status-bar';

export default function Modal() {
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();

  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Modal</title>
        </Head>
      )}
        <Stack.Screen
          name="Modal"
          options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: 'Modal',
            // http://reactnavigation.org/docs/headers#adjusting-header-styles

            // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component

            presentation: 'modal',
          }}
          screenOptions={{ headerShown: false, headerTitle: 'modal' }}
        />

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
        {!isPresented && <Link href="../">Dismiss</Link>}
        {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
        <StatusBar style="light" />
        <RText>modal</RText>

        <RText>isPresented: {isPresented ? 'true' : 'false'}</RText>

        <Link href="../">Close</Link>
      </View>
      {/* Add Modal content logic */}
    </>
  );
}
