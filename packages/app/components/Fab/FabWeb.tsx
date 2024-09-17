import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RText } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { QuickActionsSection } from 'app//modules/dashboard';

const FABWeb = ({ showQuickActions, toggleQuickActions }) => {
  const styles = useCustomStyles(loadStyles);

  return (
    <>
      {showQuickActions && (
        <View style={styles.quickActionsContainer}>
          <QuickActionsSection />
        </View>
      )}
      <TouchableOpacity style={styles.fab} onPress={toggleQuickActions}>
        <MaterialIcons name="add" size={30} style={styles.fabIcon} />
        <RText style={styles.fabText}>Create</RText>
      </TouchableOpacity>
    </>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    quickActionsContainer: {
      position: 'absolute',
      top: 50,
      left: 10,
      zIndex: 1,
      backgroundColor: currentTheme.colors.background,
      height: 54,
      width: 150,
      borderRadius: 5,
    },
    fab: {
      flexDirection: 'row',
      width: 100,
      backgroundColor: currentTheme.colors.card,
      borderRadius: 9,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      zIndex: 2,
    },
    fabIcon: {
      color: currentTheme.colors.tertiaryBlue,
    },
    fabText: {
      fontSize: 17,
      color: currentTheme.colors.tertiaryBlue,
      fontWeight: 'bold',
    },
  };
};

export default FABWeb;
