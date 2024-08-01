const loadStyles = (theme: any, appTheme: any) => {
  const { currentTheme } = theme;
  return {
    feedPreview: {
      flexDirection: 'row',
      width: '100%',
      marginBottom: 20,
    },
    cardStyles: {
      height: 100,
      width: '100%',
      backgroundColor: currentTheme.colors.card,
      borderRadius: 5,
      padding: 20,
    },
    feedItem: {
      width: 250,
      height: 100,
      backgroundColor: currentTheme.colors.primary,
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
      marginRight: 10,
      marginLeft: 10,
    },
    feedItemTitle: {
      fontWeight: 'bold',
      fontSize: 17,
      color: currentTheme.colors.text,
      marginBottom: 5,
    },
    feedItemType: {
      fontWeight: 'bold',
      fontSize: 16,
      color: currentTheme.colors.text,
      backgroundColor: currentTheme.colors.border,
      marginBottom: 5,
    },
  };
};

export default loadStyles;
