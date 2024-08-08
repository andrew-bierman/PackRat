import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome'; // You may need to install and import the appropriate icon library
import SVGLogoComponent from '../logo';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';

const Header = () => {
  const router = useRouter();
  const styles = useCustomStyles(loadStyles);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <SVGLogoComponent
          // width={isMobileView ? 48 : 64}
          // height={isMobileView ? 48 : 64}
          width={48}
          height={48}
          fill="#fff"
        />

        <Text style={styles.text}>PackRat</Text>

        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => router.push('filter')}
        >
          <Icon name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 60,
      width: '100%',
      paddingHorizontal: 20,
      backgroundColor: currentTheme.colors.background,
    },
    logo: {
      width: 50, // You can adjust the width and height as needed
      height: 50,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    searchIcon: {
      // width: 50, // Adjust the width and height as needed
      // height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
};

export default Header;
