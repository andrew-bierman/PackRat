import About from 'app/screens/about';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about/')({
  component: AboutRoute,
});

/**
 * Renders the AboutRoute component.
 *
 * @return {JSX.Element} The rendered component.
 */
export default function AboutRoute() {
  return (
    <>
      <About />
    </>
  );
}

const styles = StyleSheet.create({
  menuBar: {
    paddingBottom: 120,
  },
});
