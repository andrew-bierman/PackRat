import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, View, Text } from 'react-native';
import PackRatPreview from 'app/assets/PackRat Preview.jpg';
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

const RButton: any = OriginalRButton;
const RStack: any = OriginalRStack;

const LandingPage = () => {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const { xs, sm, md, lg, xl, xxl } = useResponsive();

  return (
    <ScrollView>
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
                  textAlign: xs || sm ? 'center' : 'left',
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
                          Google Play
                        </RText>
                      </View>
                    </View>
                  </RLink>
                  <RLink href='/register'>
                    <View
                      style={{
                        width: 130,
                        height: 45,
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        backgroundColor: 'transparent',
                        color: currentTheme.colors.textPrimary,
                        borderWidth: 1,
                        borderColor: currentTheme.colors.cardBorderPrimary,
                        overflow: 'hidden',
                        padding: 8,
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
                          size={30}
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
                            fontSize: 19,
                            fontWeight: 'bold',
                          }}
                        >
                          Signup
                        </RText>
                      </View>
                    </View>
                  </RLink>

                  {/* <RButton
                    title="App Store"
                    paddingVertical={30}
                    paddingHorizontal={15}
                    style={{
                      margin: 10,
                      backgroundColor: 'transparent',
                      borderWidth: 1,
                      borderColor: currentTheme.colors.textPrimary,
                      width: xs || sm ? '95%' : 'auto',
                      overflow: 'hidden',
                    }}
                  >
                    <RStack
                      style={{
                        // display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        width: '100%',
                      }}
                    >
                      <View>
                        <MaterialCommunityIcons
                          name="apple"
                          size={55}
                          color={currentTheme.colors.icon}
                          style={{
                            width: '100%',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: xs || sm ? '100%' : 'auto',
                        }}
                      >
                        <RText
                          style={{
                            width: '100%',
                            color: currentTheme.colors.textPrimary,
                            fontStyle: 'normal',
                            textAlign: 'left',
                            fontSize: 14,
                            fontWeight: 'bold',
                          }}
                        >
                          Get it on the
                        </RText>
                        <RText
                          style={{
                            width: '100%',
                            color: currentTheme.colors.textPrimary,
                            fontStyle: 'normal',
                            textAlign: 'left',
                            fontSize: 20,
                            fontWeight: 'bolder',
                          }}
                        >
                          App Store
                        </RText>
                      </View>
                    </RStack>
                  </RButton>
                  <RButton
                    title="Google Play"
                    paddingVertical={30}
                    paddingHorizontal={15}
                    style={{
                      margin: 10,
                      backgroundColor: 'transparent',
                      borderWidth: 1,
                      borderColor: currentTheme.colors.textPrimary,
                      width: xs || sm ? '95%' : 'auto',
                      overflow: 'hidden',
                    }}
                  >
                    <RStack
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        width: '100%',
                      }}
                    >
                      <View>
                        <MaterialCommunityIcons
                          name="google-play"
                          size={55}
                          color={currentTheme.colors.icon}
                          style={{
                            width: '100%',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: xs || sm ? '100%' : 'auto',
                        }}
                      >
                        <RText
                          style={{
                            width: '100%',
                            color: currentTheme.colors.textPrimary,
                            fontStyle: 'normal',
                            textAlign: 'left',
                            fontSize: 14,
                            fontWeight: 'bold',
                          }}
                        >
                          Get it on
                        </RText>
                        <RText
                          style={{
                            width: '100%',
                            color: currentTheme.colors.textPrimary,
                            fontStyle: 'normal',
                            textAlign: 'left',
                            fontSize: 20,
                            fontWeight: 'bolder',
                          }}
                        >
                          Google Play
                        </RText>
                      </View>
                    </RStack>
                  </RButton> */}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.featureImage}>
            <RImage
              src={PackRatPreview}
              // source={{
              //   uri: ,
              //   width: 259,
              //   height: 530,
              // }}
              style={{
                backgroundColor: 'transparent',
                width: 259,
                height: 530,
              }}
              alt="PackRat Logo"
            />
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
          <View style={styles.contentContainer}>
            <RStack
              style={styles.landingPageAccordion}
              maxWidth={Platform.OS === 'web' ? 'auto' : '100%'}
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
        </View>
      </RStack>
    </ScrollView>
  );
};

export default LandingPage;
