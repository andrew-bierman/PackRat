import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RText } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import QuickActionsSection from '../../components/dashboard/QuickActionSection';

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
      right: 10,
      zIndex: 1,
      backgroundColor: currentTheme.colors.background,
      height: 54,
      width: 150,
      borderRadius: 5,
    },
    fab: {
      position: 'absolute',
      flexDirection: 'row',
      width: 100,
      height: 50,
      backgroundColor: currentTheme.colors.card,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
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
