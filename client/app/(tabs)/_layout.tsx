import { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, useRouter } from 'expo-router';
import { Home, Plus } from '@tamagui/lucide-icons';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  VStack,
  Box,
  Divider,
  IconButton,
  Button,
  Menu,
  ThreeDotsIcon,
} from 'native-base';
import {
  Pressable,
  useColorScheme,
  View,
  Modal,
  StatusBar,
  Text,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { darkTheme, theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import { ChevronRight, Cloud, Moon, Star, Sun } from '@tamagui/lucide-icons';
import { ListItem, Separator, XStack, YGroup } from 'tamagui';

export default function TabLayout() {
  const {
    enableDarkMode,
    enableLightMode,
    isDark,
    isLight,
    currentTheme = theme,
  } = useTheme();
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);

  const openCreateModal = () => {
    setCreateModalVisible(true);
  };

  const closeCreateModal = () => {
    setCreateModalVisible(false);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'green',
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            href: '/dashboard',
            title: '',
            tabBarIcon: ({ color }) => (
              <View style={styles.tabIcon}>
                <TabBarIcon name="home" color={color} size={24} />
                <Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="my-trips"
          options={{
            href: '/my-trips',
            title: '',
            tabBarIcon: ({ color }) => (
              <View style={styles.tabIcon}>
                <MaterialIcons name="directions" color={color} size={24} />
                <Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
                  Trips
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="_create"
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              openCreateModal();
            },
          })}
          options={{
            title: '',
            tabBarIcon: ({ size }) => {
              return (
                <View style={styles.tabIcon}>
                  <TouchableOpacity onPress={openCreateModal}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: 'green',
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Plus color="$color" size={24} />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: '',
            headerShown: true,
            href: {
              pathname: '/profile',
            },
            tabBarIcon: ({ color }) => (
              <View style={styles.tabIcon}>
                <TabBarIcon name="user" color={color} size={24} />
                <Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
                  Account
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="_more"
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              // openCreateModal();
            },
          })}
          options={{
            title: '',
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <View style={styles.tabIcon}>
                <TabBarIcon name="ellipsis-v" color={color} size={24} />
                <Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
                  More
                </Text>
              </View>
            ),
          }}
        />
      </Tabs>
      <Modal
        visible={isCreateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeCreateModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Text type="titleBold" center>
                Quick Items
              </Text>
            </View>
            <YGroup
              alignSelf="center"
              bordered
              width="100%"
              marginBottom={20}
              marginTop={30}
              size="$5"
              separator={<Separator />}
            >
              <YGroup.Item>
                <ListItem
                  hoverTheme
                  pressTheme
                  title="Packs"
                  subTitle="Packing List"
                  icon={
                    <MaterialIcons
                      name="backpack"
                      style={{ fontSize: 28, color: '#34a89a' }}
                    />
                  }
                  iconAfter={ChevronRight}
                />
              </YGroup.Item>
              <YGroup.Item>
                <ListItem
                  hoverTheme
                  pressTheme
                  title="Weather Forcast"
                  subTitle="Up-to-date weather forcast"
                  icon={
                    <MaterialIcons
                      name="wb-sunny"
                      style={{ fontSize: 28, color: '#34a89a' }}
                    />
                  }
                  iconAfter={ChevronRight}
                />
              </YGroup.Item>
            </YGroup>
            <Button
              style={{ backgroundColor: '#34a89a' }}
              onPress={closeCreateModal}
            >
              <Text>Close Modal</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    ...Platform.select({
      ios: {
        paddingTop: StatusBar.currentHeight, // Adjust for status bar
      },
    }),
  },
  tabIcon: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 17,
    backgroundColor: 'transparent',
  },
  modalContent: {
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size?: number;
}) {
  return (
    <FontAwesome
      size={props.size || 26}
      style={{ marginBottom: -2 }}
      {...props}
    />
  );
}
