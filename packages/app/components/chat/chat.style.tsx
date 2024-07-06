import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const loadStyles = (theme: any) => {
  const isWeb = Platform.OS === 'web';
  const { currentTheme } = theme;

  return {
    container: {
      flex: 1,
      padding: 16,
      position: isWeb ? 'fixed' : 'absolute',
      right: 50,
      bottom: 30,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: { fontSize: 24, fontWeight: 'bold' },
    flatList: { flexGrow: 1, justifyContent: 'flex-end' },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    input: {
      flex: 1,
      height: 40,
      borderColor: currentTheme.colors.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
    },
    sendButton: {
      backgroundColor: currentTheme.colors.background,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      marginLeft: 8,
    },
    sendText: { color: currentTheme.colors.white },
    aiBubble: {
      alignSelf: 'flex-start',
      backgroundColor: currentTheme.colors.primary,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginVertical: 4,
      marginHorizontal: 16,
    },
    userBubble: {
      alignSelf: 'flex-end',
      backgroundColor: '#e0e0e0',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginVertical: 4,
      marginHorizontal: 16,
    },
    aiText: { color: currentTheme.colors.white },
    userText: { color: 'black' },
    chatSelector: {
      backgroundColor: '#e0e0e0',
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
    },
    chatSelectorText: { fontSize: 16 },
    chatSelectorContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    newChatButton: {
      backgroundColor: currentTheme.colors.background,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      marginLeft: 8,
    },
    newChatButtonText: {
      color: currentTheme.colors.white,
    },
    floatingChatContainer: {
      position: 'absolute',
      bottom: 50,
      right: 50,
      width: 300,
      height: 500,
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      zIndex: 1000,
    },
    actionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(44, 44, 46, 0.6)',
      borderRadius: 15,
      padding: 10,
      borderWidth: 1.3, // Adding border
      borderColor: '#3a3a3c', // Slightly lighter border color
      height: 112,
      width: SCREEN_WIDTH * 0.82,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionTextContainer: {
      marginLeft: 10,
      rowGap: 4,
      width: '90%',
    },
    actionTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    actionDescription: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 18,
      color: 'rgba(224, 224, 224, 0.9)',
    },
    logo: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.75,
      shadowRadius: 1.24,
      elevation: 3,
    },
    animatedView: {
      position: 'absolute',
      bottom: 60,
      right: 5,
      width: 450,
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 4,
      zIndex: 1000,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  };
};
