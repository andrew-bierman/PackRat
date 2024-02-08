import About from 'app/screens/about';
import { Platform, ScrollView, StyleSheet } from 'react-native';

// export const runtime = 'experimental-edge'

/**
 * Renders the AboutRoute component.
 *
 * @return {JSX.Element} The rendered component.
 */
export default function AboutRoute() {
  console.log("TOKEN: "+ process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);
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
