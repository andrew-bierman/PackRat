import About from '../../screens/about';
import { Platform, ScrollView } from 'react-native';
import { Stack as Header } from 'expo-router';
import useCustomStyles from '~/hooks/useCustomStyles';

/**
 * Renders the AboutRoute component.
 *
 * @return {JSX.Element} The rendered component.
 */
export default function AboutRoute() {
  const styles = useCustomStyles(loadStyles);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.menuBar}
    >
      {Platform.OS === 'web' ? (
        <>
          <Header.Screen
            options={{
              // https://reactnavigation.org/docs/headers#setting-the-header-title
              title: 'About',
              // https://reactnavigation.org/docs/headers#adjusting-header-styles

              // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
            }}
          />
          <About />
        </>
      ) : (
        <About />
      )}
    </ScrollView>
  );
}

const loadStyles = () => ({
  menuBar: {
    paddingBottom: 120,
  },
});
