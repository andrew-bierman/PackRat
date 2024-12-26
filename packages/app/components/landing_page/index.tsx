import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  RButton as OriginalRButton,
  RText,
  RStack as OriginalRStack,
  RH1,
  RImage,
  RLink,
} from '@packrat/ui';
import PackRatPreview from 'app/assets/PackRat Preview.jpg';
import PackRatPreviewLeft from 'app/assets/PackRat Preview_Left.jpg';
import PackRatPreviewRight from 'app/assets/PackRat Preview_Right.jpg';
import useTheme from 'app/hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useResponsive from 'app/hooks/useResponsive';
import loadStyles from './landingpage.style';
import { LandingPageAccordion } from './LandingPageAccordion';
import { FAQS } from './FAQS';
import { Pricing } from './Pricing';
import Footer from 'app/components/footer/Footer';

const RButton: any = OriginalRButton;
const RStack: any = OriginalRStack;

const AppBadges = ({ currentTheme }: { currentTheme: any }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: 8,
    }}
  >
    <RLink>
      <View style={badgeStyle(currentTheme)}>
        <MaterialCommunityIcons
          name="apple"
          size={30}
          color={currentTheme.colors.background}
        />
        <BadgeText
          primary="Get it on the"
          secondary="App Store"
          currentTheme={currentTheme}
        />
      </View>
    </RLink>
    <RLink>
      <View style={badgeStyle(currentTheme)}>
        <MaterialCommunityIcons
          name="google-play"
          size={30}
          color={currentTheme.colors.background}
        />
        <BadgeText
          primary="Get it on"
          secondary="Google Play"
          currentTheme={currentTheme}
        />
      </View>
    </RLink>
  </View>
);

const BadgeText = ({
  primary,
  secondary,
  currentTheme,
}: {
  primary: string;
  secondary: string;
  currentTheme: any;
}) => (
  <View>
    <RText style={badgeTextStyle.primary(currentTheme)}>{primary}</RText>
    <RText style={badgeTextStyle.secondary(currentTheme)}>{secondary}</RText>
  </View>
);

const badgeStyle = (currentTheme: any) => ({
  width: 160,
  height: 45,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: currentTheme.colors.textPrimary,
  borderWidth: 1,
  borderColor: currentTheme.colors.cardBorderPrimary,
  borderRadius: 8,
  paddingHorizontal: 8,
});

const badgeTextStyle = {
  primary: (currentTheme: any) => ({
    color: currentTheme.colors.background,
    fontSize: 14,
    fontWeight: 'normal',
    position: 'relative',
    top: '0.4rem',
  }),
  secondary: (currentTheme: any) => ({
    color: currentTheme.colors.background,
    fontSize: 19,
    fontWeight: 'bold',
    position: 'relative',
    bottom: '0.3rem',
  }),
};

const FeatureImages = () => (
  <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
    <RImage
      src={PackRatPreviewLeft}
      style={{ width: 100, height: 200 }}
      alt="PackRat Left"
    />
    <RImage
      src={PackRatPreview}
      style={{ width: 150, height: 200 }}
      alt="PackRat Center"
    />
    <RImage
      src={PackRatPreviewRight}
      style={{ width: 100, height: 200 }}
      alt="PackRat Right"
    />
  </View>
);

const LandingPage = () => {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const { xs, sm, md } = useResponsive();

  return (
    <ScrollView>
      <RStack style={styles.container}>
        <HeroSection
          currentTheme={currentTheme}
          styles={styles}
          isSmallScreen={xs || sm || md}
        />
        <SecondaryContent styles={styles} />
      </RStack>
    </ScrollView>
  );
};

const HeroSection = ({ currentTheme, styles, isSmallScreen }: any) => (
  <View style={styles.firstMainContainer}>
    <View>
      <RH1
        style={{
          ...styles.heroTitle,
          textAlign: isSmallScreen ? 'center' : 'left',
        }}
      >
        The Ultimate Travel App
      </RH1>
      <RText style={styles.introText}>
        PackRat is the ultimate adventure planner designed for those who love to
        explore the great outdoors. Plan and organize your trips with ease,
        whether it's a weekend camping trip, a day hike, or a cross-country road
        trip.
      </RText>
      <View style={styles.buttonContainer}>
        <AppBadges currentTheme={currentTheme} />
      </View>
      <RLink href="/register">
        <View style={styles.signupButton}>
          <MaterialCommunityIcons
            name="forwardburger"
            size={40}
            color={currentTheme.colors.textPrimary}
          />
          <RText style={styles.signupButtonText}>Signup</RText>
        </View>
      </RLink>
    </View>
    <FeatureImages />
  </View>
);

const SecondaryContent = ({ styles }: { styles: any }) => (
  <View style={styles.secondaryContentContainer}>
    <View style={styles.secondaryContainerIntroDiv}>
      <RText style={styles.secondaryContainerIntroText}>
        Discover how the PackRat app is designed to make your adventures easier
        and more enjoyable.
      </RText>
      <RText style={styles.secondaryContainerDescriptionText}>
        From seamless route planning to real-time weather updates, PackRat
        ensures you're prepared for every step of your journey.
      </RText>
    </View>
    <LandingPageAccordion />
    <Pricing />
    <FAQS />
    <Footer />
  </View>
);

export default LandingPage;
