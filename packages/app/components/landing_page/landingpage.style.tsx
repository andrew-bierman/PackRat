import useResponsive from 'app/hooks/useResponsive';
import { Platform } from 'react-native';



const loadStyles = (theme) => {
  const { currentTheme } = theme;
  const { xxs, xs, xxl, sm, lg } = useResponsive();

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
      fontSize: Platform.OS === 'web' ? ((xs || sm) ? 16: 20) : 20,
      fontWeight: Platform.OS === 'web' ? 'normal' : 'normal',
      textAlign: 'left',
      marginTop : xs ? 0 : 30,
      color: "#45607d",
      width: '58vw',
      marginBottom: 20, // Ensure spacing between text and next elements
      paddingHorizontal: 10, // Adjust text alignment on smaller screens
    },
    buttonContainer: {
      // paddingHorizontal: 20,
      // paddingBottom: 20,
      // width: '100%', // Ensure buttons are well-spaced and aligned
      margin: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Center buttons horizontally
    },
    getStartedButton: {
      backgroundColor: '#f3e7fc',
      height: 50,
      paddingVertical: 12, // Increase padding for better touch area
      paddingHorizontal: 30,
      borderRadius: 30, // Rounded corners for modern look
      alignItems: 'center', // Ensure text is centered within button
    },
    footerText: {
      color: '#315173',
      fontSize: 18,
      fontWeight: 'bold',
    },
    card: {
      marginBottom: 10,
      // width: '100%',
      backgroundColor: "#fbfdff",
      boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.10)'
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
      textWrap: 'wrap',
      width: '100%',
    },
    transparentButton: {
      backgroundColor: 'transparent',
      height: 'auto',
    },
    icon: {
      fontSize: 40,
      color: "#315173",
      marginRight: 10,
    },
    featureText: {
      fontSize: 22,
      color: "#315173",
    },
    cardContent: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      fontSize: 16,
      color: "#315173",
    },
  };
};

export default loadStyles;
