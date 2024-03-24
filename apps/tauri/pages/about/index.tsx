import About from 'app/screens/about';
import { StyleSheet } from 'react-native';

// export const runtime = 'experimental-edge'

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
