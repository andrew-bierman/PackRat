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

const RButton: any = OriginalRButton;
const RStack: any = OriginalRStack;

const LandingPage = () => {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);

  const handleGetStarted = () => {
    return <Redirect to="/sign-in" />;
  };

  return (
    <ScrollView>
      <RStack style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            backgroundColor: currentTheme.colors.secondaryBlue,
            borderRadius: 15,
            padding: 50,
            marginBottom: 20,
            // boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          }}
        >
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
            <RText style={{ color: 'white', fontSize: 20,  marginBottom:30, marginTop:20 }}>
              The Ultimate Travel App
            </RText>
            <RButton
              title="Web"
              style={{
                margin: 10,
                padding: 32,
                width: Platform.OS === 'web'?'70%':'100%',
                backgroundColor: currentTheme.colors.secondaryBlue,
                borderColor: currentTheme.colors.white,  // Set the border color
                borderWidth: 2,  // Set the border width
                borderRadius: 100,
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
                  size={34}
                  style={{ color: currentTheme.colors.white }}
                />
                <RText
                  style={{
                    color: currentTheme.colors.white,
                    fontSize: 13,
                  }}
                >
                  Continue on Web
                </RText>
              </RStack>
            </RButton>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
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
                  <RButton
                    title="App Store"
                    style={{
                      margin: 10,
                      padding: 32,
                      backgroundColor: currentTheme.colors.white,
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
                        name="apple"
                        size={34}
                        style={{ color: currentTheme.colors.secondaryBlue }}
                      />
                      <RText
                        style={{
                          fontSize: 13,
                          color: currentTheme.colors.secondaryBlue,
                        }}
                      >
                        Download on the App Store
                      </RText>
                    </RStack>
                  </RButton>
                  <RButton
                    title="Google Play"
                    style={{
                      margin: 10,
                      padding: 32,
                      backgroundColor: currentTheme.colors.white,
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
                        name="google-play"
                        size={34}
                        style={{ color: currentTheme.colors.secondaryBlue }}
                      />
                      <RText
                        style={{
                          color: currentTheme.colors.secondaryBlue,
                          fontSize: 13,
                        }}
                      >
                        Download on Google Play
                      </RText>
                    </RStack>
                  </RButton>
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={styles.secondaryContentContainer}>
          {/* <ImageBackground
            source={require("../../assets/background-image.png")}
            style={styles.backgroundImage}
          > */}
          {/* <View style={styles.overlay} /> */}
          {/* <View style={styles.contentContainer}>
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
          <View style={styles.buttonContainer}>
            <RLink href="/sign-in" style={{ textDecoration: 'none' }}>
              <View style={styles.getStartedButton}>
                <Text style={styles.footerText}> Get Started</Text>
              </View>
            </RLink>
          </View>
          <StatusBar style="auto" /> */}
          </ImageBackground>
        </View>
      </RStack>
    </ScrollView>
  );
};

export default LandingPage;
