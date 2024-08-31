import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { QuickActionsSection } from '../../modules/dashboard';

const FABNative = ({
  showQuickActions,
  toggleQuickActions,
  closeQuickActions,
}) => {
  const styles = useCustomStyles(loadStyles);

  return (
    <>
      {showQuickActions && (
        <View style={styles.quickActionsContainer}>
          <QuickActionsSection closeQuickActions={closeQuickActions} />
        </View>
      )}
      <TouchableOpacity style={styles.fab} onPress={toggleQuickActions}>
        <MaterialIcons name="add" size={40} style={styles.fabIcon} />
      </TouchableOpacity>
    </>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    quickActionsContainer: {
      position: 'absolute',
      bottom: 70,
      right: 40,
      zIndex: 1,
      backgroundColor: currentTheme.colors.background,
      height: 54,
      width: 150,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    fab: {
      position: 'absolute',
      width: 55,
      height: 55,
      backgroundColor: currentTheme.colors.card,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
      elevation: 2,
      bottom: 20,
      alignSelf: 'center',
    },
    fabIcon: {
      color: currentTheme.colors.tertiaryBlue,
    },
  };
};

export default FABNative;
