import React from 'react';
import Privacy from 'app/screens/privacy';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/privacy/')({
  component: PrivacyRoute,
});

/**
 * Renders the AboutRoute component.
 *
 * @return {JSX.Element} The rendered component.
 */
export default function PrivacyRoute() {
  return (
    <>
      <Privacy />
    </>
  );
}

const styles = StyleSheet.create({
  menuBar: {
    paddingBottom: 120,
  },
});
