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

const RButton: any = OriginalRButton;
const RStack: any = OriginalRStack;

const LandingPage = () => {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const { xs, sm, md, lg, xl, xxl } = useResponsive();

  return (
    <ScrollView>
      <RStack style={styles.container}>
        <View
          style={
            {
              width: '100%',
              alignItems: 'center',
              textAlign: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingVertical: 18,
              marginTop: Platform.OS !== 'web' ? 25 : 65,
              flex: 1,
            } as any
          }
        >
          <View>
            <View
              style={{
                height: 'auto',
              }}
            >
              <RH1
                style={{
                  color: currentTheme.colors.textPrimary,
                  height: 'auto',
                  fontSize: xs || sm ? 34 : 34,
                  fontWeight: xs || sm ? 'bold' : 'bold',
                  textAlign: 'left',
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
                  <MaterialCommunityIcons
                    name="source-commit-start"
                    size={24}
                    color={currentTheme.colors.buttonBackgroundPrimary}
                  />
                </View>
              </RLink>
            </View>
          </View>
          <View style={{border: '1px solid black'}}>
            <RImage
              source={{
                // TODO: Update this to use the PackRat logo from the assets folder
                uri: 'https://github.com/andrew-bierman/PackRat/blob/packages/app/assets/packrat_icon.png?raw=true',
                width: 40,
                height: 40,
              }}
              width={40}
              height={40}
              // style={styles.logo}
              alt="PackRat Logo"
            />
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
                    paddingVertical={30}
                    paddingHorizontal={15}
                    style={{
                      margin: 10,
                      backgroundColor: 'transparent',
                      borderWidth: 1,
                      borderColor: currentTheme.colors.textPrimary,
                      width: xs || sm ? '100%' : 'auto',
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
                      width: xs || sm ? '100%' : 'auto',
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
                  </RButton>
                  <RButton
                    title="Web"
                    paddingVertical={30}
                    paddingHorizontal={15}
                    style={{
                      margin: 10,
                      backgroundColor: 'transparent',
                      borderWidth: 1,
                      borderColor: currentTheme.colors.textPrimary,
                      width: xs || sm ? '100%' : 'auto',
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
                          name="web"
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
                          Use as
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
                          Web App
                        </RText>
                      </View>
                    </RStack>
                  </RButton>
                </View>
              </View>
            )}
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

          {/* <StatusBar style="auto" /> */}
          {/* </ImageBackground> */}
        </View>
      </RStack>
    </ScrollView>
  );
};

export default LandingPage;
