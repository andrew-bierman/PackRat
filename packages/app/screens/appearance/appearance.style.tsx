import { StyleSheet } from 'react-native';

export const loadStyles = () =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 25,
    },
    infoSection: {
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 12,
      padding: 20,
    },
    nativeBaseBox: {
      fontSize: 'md',
      fontWeight: 'medium',
      color: 'amber.100',
      letterSpacing: 'lg',
    } as any,
  });
