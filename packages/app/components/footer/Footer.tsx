import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import { RImage, RLink, RText } from '@packrat/ui';
import { useNavigate } from 'app/hooks/navigation';
import { useMemo } from 'react';
import { footorLinks } from 'app/constants/footorLinks';
import { NewsLetter } from 'app/components/newsLetter';
import useResponsive from 'app/hooks/useResponsive';

export default function Footer() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
    const {xs , sm} = useResponsive();
  const styles = useMemo(() => {
    return StyleSheet.create(loadStyles(currentTheme, xs , sm));
  }, [currentTheme]);
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.firstMainContainer}>
        <View style={styles.firstContainer}>
          <RImage
            source={{
              // TODO: Update this to use the PackRat logo from the assets folder
              uri: 'https://github.com/andrew-bierman/PackRat/blob/main/packages/app/assets/packrat_icon.png?raw=true',
              width: 40,
              height: 40,
            }}
            width={40}
            height={40}
            style={styles.logo}
            alt="PackRat Logo"
            onClick={() => {
              navigate('/');
            }}
          />
          <RText
            style={{ fontSize: 18, fontWeight: 'normal', cursor: 'pointer' }}
            onPress={() => {
              navigate('/');
            }}
          >
            The Ultimate Travel App
          </RText>
        </View>
        <View style={styles.navLinks}>
          {footorLinks.map((item) => {
            return (
              <RLink src={item.link}>
                <RText style={styles.navItem}>{item.label}</RText>
              </RLink>
            );
          })}
        </View>
        <View style={styles.lastContainer}>
          <Text style={styles.credit}>
            © 2024 Bierman Collective. All rights reserved.
          </Text>
          {/* <NewsLetter /> */}
        </View>
      </View>
    </View>
  );
}

const loadStyles = (currentTheme, xs , sm) => {

  {
    return StyleSheet.create({
      mainContainer: {
        width: '100vw',
        paddingTop: 80,
        paddingBottom: 40,
        // backgroundColor: '#f6f6f6',

        // border: '1px solid red',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        bottom: 0,
      },
      firstMainContainer: {
        width: '95%',
        // border: '1px solid black',
      },
      firstContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 4,
        paddingVertical: 18,
      },
      logo: {
        backgroundColor: 'black',
        borderRadius: 8,
      },
      navLinks: {
        flexDirection: 'row',
        gap: 16,
        fontSize: 14,
        color: currentTheme.colors.textPrimary,
        paddingBottom: 40,
      },
      navItem: { color: currentTheme.colors.textPrimary },
      credit: {
        color: currentTheme.colors.textPrimary,
        fontSize: 13,
        textAlign: xs ? 'center' : 'left',
        fontWeight: 'normal',
      },
      lastContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        border: '1px solid red',
        width: xs ? '100%' : 'auto',
      }
    });
  }
};
