import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Link } from 'expo-router';
import { theme } from '../theme';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';

const Drawer = ({
  isDrawerOpen,
  toggleDrawer,
  handleSignOut,
  navigationItems,
  navigateTo,
  renderNavigationItem,
}) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const renderNavigationItems = () => {
    return (
      <SafeAreaView>
        <TouchableOpacity style={styles.closeButton} onPress={toggleDrawer}>
          <AntDesign
            name="close"
            size={24}
            color={currentTheme.colors.iconColor}
          />
        </TouchableOpacity>
        {navigationItems.map((item) => (
          <TouchableOpacity
            key={item.href}
            style={styles.navigationItem}
            onPress={() => navigateTo(item.href)}
          >
            {renderNavigationItem(item)}
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    );
  };

  return (
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
        <View style={styles.drawerContainer}>{renderNavigationItems()}</View>
      </View>
    </Modal>
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
    navigationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    closeButton: {
      position: 'absolute',
      top: 16,
      right: 16,
    },
  };
};

export default Drawer;
