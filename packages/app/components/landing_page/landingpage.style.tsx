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
      background: 'hsla(0, 0%, 96%, 1)',
      filter: 'progid: DXImageTransform.Microsoft.gradient( startColorstr="#F6F6F6", endColorstr="#E1DAE6", GradientType=1 )',
      padding: 20,
    },
    secondaryContentContainer: {
      // flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'rgb(248, 248, 248)',
      background: 'hsla(0, 0%, 96%, 1)',
      filter: 'progid: DXImageTransform.Microsoft.gradient( startColorstr="#F6F6F6", endColorstr="#E1DAE6", GradientType=1 )',
    },
    appBadges: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
      marginBottom: 40,
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
      fontSize: (xs || sm ? 18 : 20),
      fontWeight: Platform.OS === 'web' ? 'normal' : 'normal',
      textAlign: 'center',
      marginTop: xs ? 0 : 30,
      color: currentTheme.colors.textPrimary,
      textAlign: 'left',
      width: '50vw',
      marginBottom: 20, // Ensure spacing between text and next elements
      paddingHorizontal: 10, // Adjust text alignment on smaller screens
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'start',
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
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: xs || sm ? 'auto' : '80%' ,
      // border: '10px solid black',
      justifyContent: 'center',
    },
    card: {
      width: xs || sm || md ? '100%' : '30%',
      margin: 8,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: currentTheme.colors.cardBorderPrimary,
      borderRadius: 16
    },
    cardHeader: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: '100%',
    },
    icon: {
      fontSize: 26,
      width: '100%',
      color: currentTheme.colors.icon,
    },
    featureText: {
      fontSize: 20,
      color: currentTheme.colors.textPrimary,
      marginTop: 10,
      fontWeight: 'bold',
      marginBottom: 10,
      width: '100%',
    },
    cardContent: {
      fontSize: 18,
      color: currentTheme.colors.textPrimary,
      width: '100%',
    },
  };
};

export default loadStyles;
