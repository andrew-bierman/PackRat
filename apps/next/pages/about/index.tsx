import About from 'app/screens/about';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { createParam } from '@packrat/crosspath';

// export const runtime = 'experimental-edge'

/**
 * Renders the AboutRoute component.
 *
 * @return {JSX.Element} The rendered component.
 */

const { useParam } = createParam();
export default function AboutRoute() {
  const [test, setTest] = useParam('test');
  const [test1, setTest2] = useParam('test2');
  return (
    <>
      <button
        onClick={() => {
          setTest('2');
          setTest2('3');
        }}
      >
        Test
      </button>
      <About />
    </>
  );
}

const styles = StyleSheet.create({
  menuBar: {
    paddingBottom: 120,
  },
});
