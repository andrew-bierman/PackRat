import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, View, Text } from 'react-native';
import PackRatPreview from 'app/assets/PackRat Preview.jpg';
import PackRatPreviewLeft from 'app/assets/PackRat Preview_Left.jpg';
import PackRatPreviewRight from 'app/assets/PackRat Preview_Right.jpg';
import AppleLink from 'app/assets/applelink.svg';
import {
  RButton as OriginalRButton,
  RText,
  RStack as OriginalRStack,
  RH1,
  RCard,
  RH3,
  YStack,
  RImage,
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
import Footer from 'app/components/footer/Footer';
import { FAQS } from './FAQS';
import { Pricing } from './Pricing';

const RButton: any = OriginalRButton;
const RStack: any = OriginalRStack;

const LandingPage = () => {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const { xs, sm, md, lg, xl, xxl } = useResponsive();

  return (
    <ScrollView>
      {
        Platform.OS === 'web' ? (
          <RStack style={styles.container}>
            <View style={styles.firstMainContainer as any}>
              <View>
                <View
                  style={{
                    height: 'auto',
                    marginTop: 40,
                    justifyContent: 'center',
                  }}
                >
                  <RH1
                    style={{
                      color: currentTheme.colors.textPrimary,
                      height: 'auto',
                      fontSize: xs || sm ? 34 : 34,
                      fontWeight: xs || sm ? 'bold' : 'bold',
                      textAlign: xs || sm || md ? 'center' : 'left',
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
                  {Platform.OS === 'web' && (
                    <View style={styles.appBadges}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          flexWrap: 'wrap',
                          gap: 8,
                        }}
                      >
                        <RLink>
                          <View
                            style={{
                              width: 150,
                              height: 45,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 8,
                              backgroundColor: currentTheme.colors.textPrimary,
                              color: currentTheme.colors.textPrimary,
                              borderWidth: 1,
                              borderColor: currentTheme.colors.cardBorderPrimary,
                              overflow: 'hidden',
                              paddingHorizontal: 8,
                              borderRadius: 8,
                              fontSize: 16,
                              fontWeight: 'normal',
                            }}
                          >
                            <View>
                              <MaterialCommunityIcons
                                name="apple"
                                size={30}
                                color={currentTheme.colors.background}
                                style={{
                                  width: '100%',
                                }}
                              />
                            </View>
                            <View style={{ flexDirection: 'column', gap: 0 }}>
                              <RText
                                style={{
                                  width: '100%',
                                  position: 'relative',
                                  top: '0.4rem',
                                  color: currentTheme.colors.background,
                                  textAlign: 'left',
                                  fontSize: 14,
                                  fontWeight: 'normal',
                                }}
                              >
                                Get it on the
                              </RText>
                              <RText
                                style={{
                                  width: '100%',
                                  color: currentTheme.colors.background,
                                  textAlign: 'left',
                                  fontSize: 19,
                                  position: 'relative',
                                  bottom: '0.3rem',
                                  fontWeight: 'bold',
                                }}
                              >
                                App Store
                              </RText>
                            </View>
                          </View>
                        </RLink>
                        <RLink>
                          <View
                            style={{
                              width: 160,
                              height: 45,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 8,
                              backgroundColor: currentTheme.colors.textPrimary,
                              color: currentTheme.colors.textPrimary,
                              borderWidth: 1,
                              borderColor: currentTheme.colors.cardBorderPrimary,
                              overflow: 'hidden',
                              paddingHorizontal: 8,
                              borderRadius: 8,
                              fontSize: 16,
                              fontWeight: 'normal',
                            }}
                          >
                            <View>
                              <MaterialCommunityIcons
                                name="google-play"
                                size={30}
                                color={currentTheme.colors.background}
                                style={{
                                  width: '100%',
                                }}
                              />
                            </View>
                            <View style={{ flexDirection: 'column', gap: 0 }}>
                              <RText
                                style={{
                                  width: '100%',
                                  position: 'relative',
                                  top: '0.4rem',
                                  color: currentTheme.colors.background,
                                  textAlign: 'left',
                                  fontSize: 14,
                                  fontWeight: 'normal',
                                }}
                              >
                                Get it on
                              </RText>
                              <RText
                                style={{
                                  width: '100%',
                                  color: currentTheme.colors.background,
                                  textAlign: 'left',
                                  fontSize: 19,
                                  position: 'relative',
                                  bottom: '0.3rem',
                                  fontWeight: 'bold',
                                }}
                              >
                                Google Play
                              </RText>
                            </View>
                          </View>
                        </RLink>
                      </View>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    // width: xs || sm || md ? '100%' : 'auto',
                    flexDirection: 'row',
                    justifyContent: xs || sm || md ? 'center' : 'flex-start',
                    flexWrap: 'wrap',
                  }}
                >
                  <RLink href="/register">
                    <View
                      style={{
                        width: 150,
                        height: 65,
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        backgroundColor: 'transparent',
                        color: currentTheme.colors.textPrimary,
                        borderWidth: 1,
                        borderColor: currentTheme.colors.cardBorderPrimary,
                        overflow: 'hidden',
                        borderRadius: 4,
                        fontSize: 16,
                        fontWeight: 'normal',
                        paddingHorizontal: 8,
                        borderRadius: 8,
                        fontSize: 16,
                        fontWeight: 'normal',
                      }}
                    >
                      <View>
                        <MaterialCommunityIcons
                          name="forwardburger"
                          size={40}
                          color={currentTheme.colors.textPrimary}
                          style={{
                            width: '100%',
                          }}
                        />
                      </View>
                      <View style={{ flexDirection: 'column', gap: 0 }}>
                        <RText
                          style={{
                            width: '100%',
                            color: currentTheme.colors.textPrimary,
                            textAlign: 'left',
                            fontSize: 22,
                            fontWeight: 'bold',
                          }}
                        >
                          Signup
                        </RText>
                      </View>
                    </View>
                  </RLink>
                </View>
              </View>
              <View style={styles.featureImage}>
                <View style={styles.featureImageContainer}>
                  <RImage
                    src={PackRatPreviewLeft}
                    style={styles.featureLeftImage}
                    alt="PackRat Logo"
                  />
                  <RImage
                    src={PackRatPreview}
                    style={styles.featureCenterImage}
                    alt="PackRat Logo"
                  />
                  <RImage
                    src={PackRatPreviewRight}
                    style={styles.featureRightImage}
                    alt="PackRat Logo"
                  />
                </View>
              </View>
            </View>
            <View style={styles.secondaryContentContainer}>
              <View style={styles.secondaryContainerIntroDiv}>
                <RText style={styles.secondaryContainerIntroText}>
                  Discover how the PackRat app is designed to make your adventures
                  easier and more enjoyable.
                </RText>
                <RText style={styles.secondaryContainerDescriptionText}>
                  With a suite of powerful features tailored specifically for
                  backpackers, you'll have everything you need right at your
                  fingertips. From seamless route planning to real-time weather
                  updates, PackRat ensures you're prepared for every step of your
                  journey. Dive into the key features below to see how we can help
                  you elevate your backpacking experience:
                </RText>
              </View>
              <View style={{ width: '100%' }}>
                <LandingPageAccordion />
              </View>
              <View style={{ width: '100%', paddingTop: 50 }}>
                <Pricing />
              </View>
              <View style={{ width: '100%', paddingTop: 50 }}>
                <FAQS />
              </View>
            </View>
          </RStack>
        ) : (
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
                    color: currentTheme.colors.tertiaryBlue,
                    fontSize: currentTheme.font.headerFont,
                  }}
                >
                  PackRat
                </RH1>
              ) : (
                <RText
                  style={{
                    height: 40,
                    color: currentTheme.colors.tertiaryBlue,
                    fontSize: 30,
                    fontWeight: 'bold',
                    paddingTop: 8,
                  }}
                >
                  PackRat
                </RText>
              )}
              <RText
                style={{ color: currentTheme.colors.tertiaryBlue, fontSize: 20 }}
              >
                The Ultimate Travel App
              </RText>
            </View>
            <View style={styles.secondaryContentContainer}>
              {/* <ImageBackground
            source={require("../../assets/background-image.png")}
            style={styles.backgroundImage}
          > */}
              {/* <View style={styles.overlay} /> */}
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
                      <RButton
                        title="App Store"
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
                        <MaterialCommunityIcons
                          name="web"
                          size={44}
                          color="white"
                        />
                        <RText style={{ color: 'white' }}>Use on Web</RText>
                      </RStack>
                    </RButton>
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
              <View style={styles.buttonContainer}>
                <RLink href="/sign-in" style={{ textDecoration: 'none' }}>
                  <View style={styles.getStartedButton}>
                    <Text style={styles.footerText}> Get Started</Text>
                  </View>
                </RLink>
              </View>
              <StatusBar style="auto" />
              {/* </ImageBackground> */}
            </View>
          </RStack>
        )
      }

    </ScrollView>
  );
};

export default LandingPage;
