const loadStyles = (theme: any, appTheme: any) => {
  const { currentTheme } = theme;
  return {
    cardStyles: {
      height: 200,
      width: '100%',
      backgroundColor: currentTheme.colors.card,
      borderRadius: 5,
      padding: 20,
    },
    feedItemTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      color: currentTheme.colors.text,
      marginBottom: 5,
    },
  };
};

export default loadStyles;
