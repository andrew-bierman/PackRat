const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  return {
    container: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
      padding: 20,
      alignItems: 'center',
    },
    containerDark: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
      padding: 20,
      alignItems: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      justifyContent: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginRight: 10,
    },

    textContainer: {
      marginBottom: 20,
    },
    text: {
      fontSize: 18,
      lineHeight: 28,
      letterSpacing: 1,
      // fontFamily: 'sans-serif',
      color: currentTheme.colors.text,
      textAlign: 'left',
      marginBottom: 20,
    },
  };
};

export default loadStyles;
