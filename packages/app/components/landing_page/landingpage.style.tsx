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
      flexDirection: xs || sm ? 'column' : 'row',
      justifyContent: xs || sm ? 'center' : 'space-evenly',
      marginTop: Platform.OS !== 'web' ? 25 : 20,
      flex: 1,
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
      width: xs ? '100vw' : 'auto',
      mixBlendMode: 'multiply',
      justifyContent: 'center',
      alignItems: 'center',
      // filter: "brightness(100) invert(0)",
      // width: 259,
      // height: 530,
    },
    overlay: {
      border: '1px solid black',
      width: '100%',
      height: '100%',
      // background:
      // 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    },
    appBadges: {
      flexDirection: xs ? 'column' : 'row',
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
      textAlign: xs || sm ? 'center' : 'left',
      marginTop: xs ? 0 : 30,
      color: currentTheme.colors.textPrimary,
      width: xs || sm ? '100vw' : '50vw',
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
      flexDirection: 'row',
      flexWrap: 'no-wrap',
      width: xs || sm ? '100%' : 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 50,
    },
    landingPageAccordionFirstContainer: {
      width: 'auto',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'left',
      justifyContent: 'space-evenly',
      gap: 10,
    },
    landingPageAccordationSecondContainer: {
      // width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      transition: '0.3s ease-in-out'
    },
    panButton: {
      backgroundColor: '#232323',
      color: 'white',
      width: '100%',
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
      fontSize: 18,
      color: currentTheme.colors.textPrimary,
      width: '30vw',
      textAlign: 'left',
      // border: '1px solid black'
    },
    secondaryContainerIntroDiv: {
      width: xs ? '100%' : '80%',
      marginTop: 50,
      marginBottom: 50,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    secondaryContainerIntroText: {
      fontSize: 28,
      width: xs ? '95%' : '80%',
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 40,
    },
    secondaryContainerDescriptionText: {
      fontSize: 16,
      width: xs ? '95%' : '70%',
      fontWeight: 'normal',
      textAlign: 'left',
      marginBottom: 30,
    },
    
  };
};

export default loadStyles;
