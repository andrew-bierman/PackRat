import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import {
  RButton as OriginalRButton,
  RText,
  RStack as OriginalRStack,
  RH1,
} from '@packrat/ui';
import useTheme from '../../hooks/useTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RLink } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { FAQ_ITEMS } from './constants';
import { LandingPageAccordion } from './LandingPageAccordion';
import loadStyles from './landingpage.style';

const RButton: any = OriginalRButton;
const RStack: any = OriginalRStack;

const LandingPage = () => {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);

  return (
    <RStack style={styles.container}>
      <View
        style={
          {
            alignItems: 'center',
            textAlign: 'center',
            paddingVertical: 18,
            marginTop: Platform.OS !== 'web' ? 25 : 1,
            flex: 1,
          } as any
        }
      >
        {Platform.OS === 'web' ? (
          <RH1
            style={{
              color: 'white',
              fontSize: currentTheme.font.headerFont,
            }}
          >
            PackRat
          </RH1>
        ) : (
          <RText
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            PackRat
          </RText>
        )}
        <RText style={{ color: 'white', fontSize: 24 }}>
          The Ultimate Travel App
        </RText>
      </View>
      <View style={styles.secondaryContentContainer}>
        {/* <ImageBackground
            source={require("../../assets/background-image.png")}
            style={styles.backgroundImage}
          > */}
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <RText style={styles.introText}>
            PackRat is the ultimate adventure planner designed for those who
            love to explore the great outdoors. Plan and organize your trips
            with ease, whether it's a weekend camping trip, a day hike, or a
            cross-country road trip.
          </RText>
          {Platform.OS === 'web' && (
            <View style={styles.appBadges}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <RButton title="App Store" style={{ margin: 10, padding: 32 }}>
                  <RStack
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="apple"
                      size={44}
                      color="white"
                    />
                    <RText style={{ color: 'white' }}>
                      Download on the App Store
                    </RText>
                  </RStack>
                </RButton>
                <RButton
                  title="Google Play"
                  style={{ margin: 10, padding: 32 }}
                >
                  <RStack
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="google-play"
                      size={44}
                      color="white"
                    />
                    <RText style={{ color: 'white' }}>
                      Download on Google Play
                    </RText>
                  </RStack>
                </RButton>
              </View>
              <RButton
                title="Web"
                style={{ margin: 10, padding: 32, width: '100%' }}
              >
                <RStack
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <MaterialCommunityIcons name="web" size={44} color="white" />
                  <RText style={{ color: 'white' }}>Use on Web</RText>
                </RStack>
              </RButton>
            </View>
          )}
          <RStack width="100%" maxWidth={Platform.OS === 'web' ? 800 : '100%'}>
            {FAQ_ITEMS.map((item, index) => (
              <LandingPageAccordion
                key={index}
                title={item.title}
                content={item.content}
                iconName={item.iconName}
              />
            ))}
          </RStack>
        </View>
        <View style={styles.buttonContainer}>
          <RLink href="/sign-in" style={{ textDecoration: 'none' }}>
            <RButton
              style={styles.getStartedButton}
              onPress={() => {
                /* Add navigation to the sign in screen */
              }}
            >
              <RText style={styles.footerText}>Get Started</RText>
            </RButton>
          </RLink>
        </View>
        <StatusBar style="auto" />
        {/* </ImageBackground> */}
      </View>
    </RStack>
  );
};

export default LandingPage;
