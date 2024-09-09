import useResponsive from 'app/hooks/useResponsive';
import { Platform } from 'react-native';

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  const { xxs, xs, xxl, sm, lg, md } = useResponsive();

  return {
    mutualStyles: {
      // flex: 1,
      flexDirection: 'column',
      height: '100%',
    },
    container: {
      flex: 1,
      // backgroundColor: currentTheme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    firstMainContainer: {
      width: '100%',
      textAlign: 'center',
      flexDirection: xs || sm || md ? 'column' : 'row',
      justifyContent: xs || sm || md ? 'center' : 'space-evenly',
      marginTop: Platform.OS !== 'web' ? 25 : 20,
      flex: 1,
      paddingTop: 50,
      paddingBottom: 50,
    },
    secondaryContentContainer: {
      // flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'rgb(248, 248, 248)',
      // background: 'hsla(0, 0%, 96%, 1)',
      // filter:
      // 'progid: DXImageTransform.Microsoft.gradient( startColorstr="#F6F6F6", endColorstr="#E1DAE6", GradientType=1 )',
    },
    featureImageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    featureImage: {
      zIndex: 100,
      width: xs ? '100%' : 'auto',
      mixBlendMode: 'multiply',
      justifyContent: 'center',
      alignItems: 'center',
      // filter: "brightness(100) invert(0)",
      // width: 259,
      // height: 530,
    },
    featureLeftImage: {
      backgroundColor: 'transparent',
      width: xs || sm || md ? 162 : 215,
      height: xs || sm || md ? 340 : 410,
      position: 'absolute',
      zIndex: '-1',
      right: 120,
    },
    featureCenterImage: {
      backgroundColor: 'transparent',
      width: xs || sm || md ? 220 : 259,
      height: xs || sm || md ? 450 : 530,
    },
    featureRightImage: {
      backgroundColor: 'transparent',
      width: xs || sm || md ?  162 : 215,
      height: xs || sm || md ? 340 : 410,
      position: 'absolute',
      zIndex: '-1',
      left: 120,
    },
    overlay: {
      border: '1px solid black',
      width: '100%',
      height: '100%',
      // background:
      // 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    },
    appBadges: {
      width: xs || sm || md ? '100%' : 'auto',
      flexDirection: xs || sm || md ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    contentContainer: {
      justifyContent: 'start',
      alignItems: 'center',
      width: '100%',
    },
    introText: {
      fontSize: xs || sm ? 18 : 20,
      fontWeight: Platform.OS === 'web' ? 'normal' : 'normal',
      textAlign: xs || sm || md  ? 'center' : 'left',
      marginTop: xs ? 0 : 30,
      color: currentTheme.colors.textPrimary,
      width: xs || sm || md ? '100vw' : '50vw',
      marginBottom: 20,
    },
    buttonContainer: {
      display: 'flex',
      alignItems: xs || sm ? 'center' : 'start',
      justifyContent: 'center', // Center buttons horizontally
    },
    getStartedButton: {
      backgroundColor: 'transparent',
      height: 50,
      borderWidth: 1,
      borderColor: '#315173',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 12, // Increase padding for better touch area
      paddingHorizontal: 30,
      borderRadius: 8, // Rounded corners for modern look
      alignItems: 'center', // Ensure text is centered within button
    },
    footerText: {
      color: currentTheme.colors.textPrimary,
      fontSize: 18,
      // fontWeight: 'bold',
    },
    landingPageAccordion: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      width: xs || sm ? 'auto' : '80%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    landingPageAccordionContainer: {
      flexDirection: xs || sm || md  ? 'row' : 'column',
      flexWrap: 'no-wrap',
      width: xs || sm || md ? '100%' : 'auto',
      paddingTop: 100,
      paddingBottom: 100,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 50,
    },
    landingPageAccordionFirstContainer: {
      width: 'auto',
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'left',
      justifyContent: 'space-evenly',
      gap: 10,
    },
    landingPageAccordationSecondContainer: {
      // width: '100%',
      flexDirection: xs || sm || md ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      gap: 50,
      transition: '0.3s ease-in-out'
    },
    panButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderRadius: 0,
      borderColor: currentTheme.colors.textPrimary,
      // width: '100%',
    },
    card: {
      width: xs || sm || md ? '95%' : '30%',
      margin: 8,
      // backgroundColor: 'transparent',
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: currentTheme.colors.cardBorderPrimary,
      borderOpacity: '1',
      borderRadius: 16,
    },
    cardHeader: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: '100%',
    },
    icon: {
      fontSize: 35,
      width: '100%',
      color: currentTheme.colors.icon,
    },
    featureText: {
      fontSize: 16,
      color: currentTheme.colors.textPrimary,
      marginTop: 10,
      fontWeight: 'bold',
      marginBottom: 10,
      width: '100%',
    },
    cardContent: {
      fontSize: xs || sm || md ? 20 : 25,
      color: currentTheme.colors.textPrimary,
      width: xs || sm ? '100%' : '30vw',
      textAlign: xs || sm || md ? 'center' : 'left',
      marginLeft: xs || sm || md ? 10 : 0,
      marginRight: xs || sm || md ? 10 : 0,
      fontWeight: 'normal',
      // border: '1px solid black'
    },
    secondaryContainerIntroDiv: {
      width: xs ? '100%' : '100%',
      paddingTop: 100,
      paddingBottom: 100,
      justifyContent: 'center',
      backgroundColor: currentTheme.colors.textPrimary,
      alignItems: 'center',
    },
    secondaryContainerIntroText: {
      fontSize: 28,
      width: xs ? '95%' : '80%',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 40,
      color: currentTheme.colors.background,
    },
    secondaryContainerDescriptionText: {
      fontSize: 16,
      width: xs ? '95%' : '70%',
      fontWeight: 'normal',
      textAlign: 'center',
      marginBottom: 30,
      color: currentTheme.colors.background,
    },

  };
};

export default loadStyles;
