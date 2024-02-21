export const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  return {
    desktopContainer: {
      gap: 15,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: currentTheme.colors.card,
      padding: 30,
      alignSelf: 'center',
    },

    card: {
      gap: 10,
      borderColor: currentTheme.colors.border,
      borderWidth: 1,
      padding: 18,
      borderRadius: 8,
      shadowColor: 'black',
    },

    cardContainer: {
      alignItems: 'flex-start',
      gap: 8,
      borderColor: currentTheme.colors.border,
      borderWidth: 1,
      padding: 18,
      borderRadius: 8,
      shadowColor: 'black',
      justifyContent: 'space-between',
    },

    weatherInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
    },
    weatherCard: {
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    iconsSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      flex: 1,
    },
  };
};
