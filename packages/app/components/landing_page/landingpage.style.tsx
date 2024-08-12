import useResponsive from 'app/hooks/useResponsive';
import { Platform } from 'react-native';

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  const { xxs, xs, xxl, sm, lg, md } = useResponsive();

  return {
    mutualStyles: {
      backgroundColor: currentTheme.colors.background,
      flex: 1,
      flexDirection: 'column',
      height: '100%',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: 'rgb(248, 248, 248)',
      padding: 20,
    },
    secondaryContentContainer: {
      // flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(248, 248, 248)',
    },
    appBadges: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
      marginBottom: 20,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    contentContainer: {
      // flex: 1,
      justifyContent: 'start',
      alignItems: 'center',
      // paddingHorizontal: 20,
      width: '100%',
    },
    introText: {
      fontSize: (xs || sm ? 18 : 22),
      fontWeight: Platform.OS === 'web' ? 'normal' : 'normal',
      textAlign: 'center',
      marginTop: xs ? 0 : 30,
      color: '#45607d',
      width: '58vw',
      marginBottom: 20, // Ensure spacing between text and next elements
      paddingHorizontal: 10, // Adjust text alignment on smaller screens
    },
    buttonContainer: {
      margin: 30,
      display: 'flex',
      alignItems: 'center',
      
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
      color: '#315173',
      fontSize: 18,
      fontWeight: 'bold',
    },
    landingPageAccordion: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      // border: '10px solid black',
      justifyContent: 'center',
    },
    card: {
      width: xs || sm || md ? '100%' : '30%',
      margin: 8,
      backgroundColor: 'transparent',
      flexDirection: 'row',
    },
    cardHeader: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: '100%',
    },
    icon: {
      fontSize: 26,
      width: '100%',
      color: '#315173',
    },
    featureText: {
      fontSize: 20,
      color: '#315173',
      marginTop: 10,
      marginBottom: 10,
      width: '100%',
    },
    cardContent: {
      fontSize: 18,
      color: '#315173',
      width: '100%',
    },
  };
};

export default loadStyles;
