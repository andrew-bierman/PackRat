export const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mainContainer: {
      backgroundColor: currentTheme.colors.background,
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    infoSection: {
      flexDirection: 'column',
      backgroundColor: currentTheme.colors.white,
      alignItems: 'center',
      borderRadius: 12,
      marginBottom: 25,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
      justifyContent: 'center',
    },
    userInfo: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    userEmail: {
      fontSize: 16,
      color: currentTheme.colors.textDarkGrey,
      textAlign: 'center',
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      padding: 15,
      borderRadius: 12,
      backgroundColor: currentTheme.colors.card,
      marginVertical: 15,
    },
    cardInfo: {
      alignItems: 'center',
    },
    mainContentContainer: {
      width: '100%',
      flex: 1,
    },
    userDataContainer: {
      marginBottom: 25,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    userDataCard: {
      borderRadius: 15,
      backgroundColor: currentTheme.colors.card,
      padding: 10,
      margin: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
  };
};
