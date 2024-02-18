import { position } from 'native-base/lib/typescript/theme/styled-system';

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
    },
    introText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: currentTheme.colors.text,
      // width: '80%',
      // lineHeight: 1.5,
    },
    buttonContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    getStartedButton: {
      backgroundColor: '#34a89a',
    },
    footerText: {
      color: currentTheme.colors.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
    card: {
      marginBottom: 10,
      maxWidth: '100%',
      overflow: 'hidden',
      position: 'relative',
      padding:12,
      backgroundColor: currentTheme.colors.secondaryBlue,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    transparentButton: {
      backgroundColor: 'transparent',
    },
    icon: {
      fontSize: 28,
      color: '#34a89a',
      marginRight: 10,
    },
    featureText: {
      fontSize: 18,
      color: currentTheme.colors.text,
    },
    cardContent: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom:20,
      fontSize: 16,
      position: 'absolute',
      top: '50%',
      left: '10%',
      transform: [{ translateX: -50 }, { translateY: -50 }],
      color: currentTheme.colors.text,
    },
  };
};

export default loadStyles;
