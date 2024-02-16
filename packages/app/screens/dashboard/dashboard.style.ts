export const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  return {
    container: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: currentTheme.colors.background,
      width: '100%',
    },
    content: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      paddingHorizontal: 20,
    },
    cardContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom: 20,
      width: '100%',
    },
  };
};
