import { Provider } from 'app/provider'
import { Stack } from 'expo-router'
import { Slot } from 'expo-router';
import { Navigation } from 'app/components/navigation';
import React = require('react');

export default function Root() {
  return (
    <Provider>
      <Navigation />
      <Slot />
      {/* {Platform.OS === 'web' ? <Footer /> : null} */}
    </Provider>
  )
}
