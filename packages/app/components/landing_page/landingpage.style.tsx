import { Platform } from 'react-native';

const loadStyles = (theme) => {
  const { currentTheme } = theme;
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
      backgroundColor: currentTheme.colors.background,
      padding: 20,
    },
    secondaryContentContainer: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: currentTheme.colors.background,
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      width: '100%',
    },
    introText: {
      fontSize: Platform.OS === 'web' ? 24 : 20,
      fontWeight: Platform.OS === 'web' ? 'bold' : 'normal',
      textAlign: 'center',
      color: currentTheme.colors.text,
      marginBottom: 20, // Ensure spacing between text and next elements
      paddingHorizontal: 10, // Adjust text alignment on smaller screens
    },
    buttonContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      // width: '100%', // Ensure buttons are well-spaced and aligned
      display: 'flex',
      justifyContent: 'center', // Center buttons horizontally
    },
    getStartedButton: {
      backgroundColor: '#34a89a',
      height: 50,
      paddingVertical: 12, // Increase padding for better touch area
      paddingHorizontal: 30,
      borderRadius: 8, // Rounded corners for modern look
      alignItems: 'center', // Ensure text is centered within button
    },
    footerText: {
      color: currentTheme.colors.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
    card: {
      marginBottom: 10,
      width: '100%',
      backgroundColor: currentTheme.colors.secondaryBlue,
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
      height: 80,
    },
    icon: {
      fontSize: 40,
      color: '#34a89a',
      marginRight: 10,
    },
    featureText: {
      fontSize: 22,
      color: currentTheme.colors.text,
    },
    cardContent: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      fontSize: 16,
      color: currentTheme.colors.text,
    },
  };
};

export default loadStyles;
