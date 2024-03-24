import { theme } from './../../theme';
export const loadStyles = () => {
  const currentTheme = theme;
  return {
    container: {
      flex: 1,
      padding: 10,
      width: '100%',
    },
    tableStyle: {
      width: '100%',
      paddingHorizontal: 20,
    },
    mainTitle: {
      marginTop: 10,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    categoryRow: {
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    title: {
      height: 50,
      width: '80%',
      alignSelf: 'center',
      backgroundColor: currentTheme.colors.primary,
      borderRadius: 10,
      justifyContent: 'center',
      paddingLeft: 15,
    },
    titleText: {
      fontWeight: 'bold',
      color: currentTheme.colors.text,
    },
    head: {
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: '#D1D5DB',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    headerText: {
      fontWeight: 'bold',
      color: '#000000',
      fontSize: 12,
    },
    row: {
      flexDirection: 'row',
      height: 60,
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#D1D5DB',
      paddingLeft: 10,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 25,
      backgroundColor: '#F8F8F8',
    },
    noItemsText: {
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: 20,
      textAlign: 'center',
    },
    paginationWrapper: {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'space-around',
    },
    rowText: {
      fontSize: 12,
      paddingRight: 4,
    },
  };
};
