import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import { RImage, RLink, RSeparator, RText } from '@packrat/ui';
import { useNavigate } from 'app/hooks/navigation';
import { useMemo } from 'react';
import { footorLinks } from 'app/constants/footorLinks';
import { NewsLetter } from 'app/components/newsLetter';
import useResponsive from 'app/hooks/useResponsive';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Footer() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const { xs, sm, md } = useResponsive();
  const firstFootorLinksGroup = footorLinks.slice(0, 4);
  const secondFootorLinksGroup = footorLinks.slice(4);
  const styles = StyleSheet.create(loadStyles(currentTheme, xs, sm, md));
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  return (
    <View style={styles.mainContainer}>
      <View>
        <NewsLetter />
      </View>
      <View style={styles.mainFirstContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
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
          <RText style={{ fontSize: 25, fontWeight: 'bold', color: currentTheme.colors.logo }}>PackRat</RText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: 50 }}>
          <View>{firstFootorLinksGroup.map((item) => {
            return (
              <RLink src={item.link}>
                <RText style={styles.navItem}>{item.label}</RText>
              </RLink>
            );
          })}</View>
          <View>{secondFootorLinksGroup.map((item) => {
            return (
              <RLink src={item.link}>
                <RText style={styles.navItem}>{item.label}</RText>
              </RLink>
            );
          })}</View>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
          <RLink >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <MaterialCommunityIcons
                name="facebook"
                size={20}
                color={currentTheme.colors.textPrimary}
              />
              <RText>Facebook</RText>
            </View>
          </RLink>
          <RLink >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <MaterialCommunityIcons
                name="instagram"
                size={20}
                color={currentTheme.colors.textPrimary}
              />
              <RText>Instagram</RText>
            </View>
          </RLink>
          <RLink >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <MaterialCommunityIcons
                name="twitter"
                size={20}
                color={currentTheme.colors.textPrimary}
              />
              <RText>X</RText>
            </View>
          </RLink>
          <RLink >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <MaterialCommunityIcons
                name="github"
                size={20}
                color={currentTheme.colors.textPrimary}
              />
              <RText>Github</RText>
            </View>
          </RLink>
          {/* <RLink>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
            <MaterialCommunityIcons
              name="facebook"
              size={30}
              color={currentTheme.colors.textPrimary}
              style={{
                width: '100%',
              }}
            />
            <RText>Facebook</RText>
          </View>
        </RLink>
        <RLink>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
            <MaterialCommunityIcons
              name="instagram"
              size={30}
              color={currentTheme.colors.textPrimary}
              style={{
                width: '100%',
              }}
            />
            <RText>Instagram</RText>
          </View>
        </RLink>
        <RLink>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="instagram"
              size={30}
              color={currentTheme.colors.textPrimary}
              style={{
                width: '100%',
              }}
            />
            <RText>Instagram</RText>
          </View>
        </RLink>
        <RLink>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="twitter"
              size={30}
              color={currentTheme.colors.textPrimary}
              style={{
                width: '100%',
              }}
            />
            <RText>X</RText>
          </View>
        </RLink>
        <RLink >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="github"
              size={30}
              color={currentTheme.colors.textPrimary}
              style={{
                width: '100%',
              }}
            />
            <RText>Github</RText>
          </View>
        </RLink> */}
        </View>
        <View>
          <RText style={styles.credit}>
            © 2024 Bierman Collective. All rights reserved.
          </RText>
        </View>
      </View>
      {/* <View style={styles.firstMainContainer}>
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
        <View style={{paddingBottom: 30,}}>
        <RSeparator
          style={{
            backgroundColor: currentTheme.colors.textPrimary,
            borderWidth: '0.4',
            borderColor: currentTheme.colors.textPrimary,
            opacity: '0.1',
          }}
        />
        </View>
        <View style={styles.lastContainer}>
          <Text style={styles.credit}>
            © 2024 Bierman Collective. All rights reserved.
          </Text>
          <NewsLetter />
        </View>
      </View> */}
    </View>
  );
}

const loadStyles = (currentTheme, xs, sm, md) => {
  {
    return StyleSheet.create({
      mainContainer: {
        width: '100%',
        flexDirection: 'column',
        paddingTop: 80,
        paddingBottom: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'relative',
        bottom: 0,
      },
      mainFirstContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: 80,
        paddingBottom: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'relative',
        bottom: 0,
      },
      firstMainContainer: {
        width: '95%',
        // justifyContent: 'center',
        // alignItems: 'center',
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
        backgroundColor: 'blue',
        borderRadius: 8,
      },
      navLinks: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        margin: 10,
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
        paddingTop: sm || md ? 10 : 'auto',
      },
      lastContainer: {
        display: 'flex',
        flexWrap: 'wrap-reverse',
        flexDirection: sm ? 'column-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: sm || md ? 'auto' : '95%',

      },
    });
  }
};
