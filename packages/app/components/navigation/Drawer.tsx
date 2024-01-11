import { View, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { NavigationList } from './NavigationList';
import { useDrawer } from 'app/hooks/navigation';

export const Drawer = () => {
  const { currentTheme } = useTheme();
  const { isDrawerOpen, toggleDrawer, closeDrower } = useDrawer();
  const styles = useCustomStyles(loadStyles);

  return (
    <>
      <View>
        {!isDrawerOpen && (
          <TouchableOpacity style={styles.drawerTrigger} onPress={toggleDrawer}>
            <EvilIcons
              name={isDrawerOpen ? 'close' : 'navicon'}
              size={36}
              color={currentTheme.colors.iconColor}
            />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        visible={isDrawerOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleDrawer}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.fullScreenTouchable}
            onPress={toggleDrawer}
          />
          <View style={styles.drawerContainer}>
            <SafeAreaView style={styles.drawerWrapper}>
              <View>
                <NavigationList
                  itemStyle={styles.navigationItem}
                  onItemSelect={closeDrower}
                />
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleDrawer}
              >
                <AntDesign
                  name="close"
                  size={24}
                  color={currentTheme.colors.iconColor}
                />
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    modalOverlay: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    fullScreenTouchable: {
      flex: 1,
    },
    drawerContainer: {
      backgroundColor: currentTheme.colors.background,
      width: '70%',
      height: '100%',
      padding: 16,
    },
    drawerWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    navigationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
  };
};
