import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, View, Text } from 'react-native';
import {
  RButton as OriginalRButton,
  RText,
  RStack as OriginalRStack,
  RH1,
  RCard,
  RH3,
} from '@packrat/ui';
import useTheme from '../../hooks/useTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RLink } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { FAQ_ITEMS } from './constants';
import { LandingPageAccordion } from './LandingPageAccordion';
import loadStyles from './landingpage.style';
import { Redirect } from 'app/components/Redirect';
import useResponsive from 'app/hooks/useResponsive';

const RButton: any = OriginalRButton;
const RStack: any = OriginalRStack;

const LandingPage = () => {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const { xxs, xs, xxl } = useResponsive();

  const handleGetStarted = () => {
    return <Redirect to="/sign-in" />;
  };

  return (
    <ScrollView>
      <RStack style={styles.container}>
        <View
          style={
            {
              width: '100vw',
              height: xs && xxs ? 'auto' : '70vh',
              alignItems: 'center',
              textAlign: 'center',
              paddingVertical: 18,
              marginTop: Platform.OS !== 'web' ? 25 : 65,
              // flex: 1,
            } as any
          }
        >
          {Platform.OS === 'web' ? (
            <View
              style={{
                background:
                  '-webkit-linear-gradient( 90deg, transparent, var(--purple12) 70% )',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              <RH1
                style={{
                  color: 'white',
                  fontSize: xs ? currentTheme.font.headerFont : 90,
                  margin: xs ? 0 : 20,
                  fontWeight: 'bolder',
                  height: 'auto',
                }}
              >
                PackRat
              </RH1>
            </View>
          ) : (
            <RText
              style={{
                height: 40,
                color: 'white',
                fontSize: 30,
                fontWeight: 'bold',
                paddingTop: 8,
              }}
            >
              PackRat
            </RText>
          )}
          <View
            style={{
              height: 'auto',
            }}
          >
            <RH1
              style={{
                display: 'inline-block',
                color: '#45607d',
                height: 'auto',
                fontSize: xs ? 30 : 50,
                fontWeight: xs ? 'bold' : 'bolder',
              }}
            >
              The Ultimate Travel App
            </RH1>
          </View>
          <RText style={styles.introText}>
            PackRat is the ultimate adventure planner designed for those who
            love to explore the great outdoors. Plan and organize your trips
            with ease, whether it's a weekend camping trip, a day hike, or a
            cross-country road trip.
          </RText>
          <View style={styles.buttonContainer}>
            <RLink href="/sign-in" style={{ textDecoration: 'none' }}>
              <View style={styles.getStartedButton}>
                <Text style={styles.footerText}> Get Started</Text>
              </View>
            </RLink>
          </View>
        </View>
        <View style={styles.secondaryContentContainer}>
          {/* <ImageBackground
            source={require("../../assets/background-image.png")}
            style={styles.backgroundImage}
          > */}
          {/* <View style={styles.overlay} /> */}
          <View style={styles.contentContainer}>
            {Platform.OS === 'web' && (
              <View style={styles.appBadges}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <RButton
                    title="App Store"
                    style={{
                      margin: 10,
                      padding: 32,
                      backgroundColor: '#fbfdff',
                      width: xs ? '100%' : 'auto',
                      
                    }}
                  >
                    <RStack
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="apple"
                        size={44}
                        color="#315173"
                      />
                      <RText style={{ color: '#315173', fontStyle: 'normal' }}>
                        Download on App Store
                      </RText>
                    </RStack>
                  </RButton>
                  <RButton
                    title="Google Play"
                    style={{
                      margin: 10,
                      padding: 32,
                      backgroundColor: '#fbfdff',
                      width: xs ? '100%' : 'auto',
                    }}
                  >
                    <RStack
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="google-play"
                        size={44}
                        color="#315173"
                      />
                      <RText style={{ color: '#315173', fontStyle: 'normal' }}>
                        Download on Google Play
                      </RText>
                    </RStack>
                  </RButton>
                  <RButton
                    title="Web"
                    style={{
                      margin: 10,
                      padding: 32,
                      backgroundColor: '#fbfdff',
                      width: xs ? '100%' : "auto",
                      justifyContent: 'center',
                    }}
                  >
                    <RStack
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="web"
                        size={44}
                        color="#315173"
                      />
                      <RText style={{ color: '#315173', fontStyle: 'normal' }}>
                        Use as Web App
                      </RText>
                    </RStack>
                  </RButton>
                </View>
              </View>
            )}
            <RStack
              width="100%"
              maxWidth={Platform.OS === 'web' ? 800 : '100%'}
            >
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

          {/* <StatusBar style="auto" /> */}
          {/* </ImageBackground> */}
        </View>
      </RStack>
    </ScrollView>
  );
};

export default LandingPage;
