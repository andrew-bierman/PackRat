import { View, StyleSheet, Text, Image } from 'react-native'
import { Link } from 'expo-router'

import { useAuth } from '../auth/provider'

import { theme } from '../theme'
import { Entypo, FontAwesome, EvilIcons, AntDesign, MaterialIcons } from '@expo/vector-icons'

import packratlogo from '../assets/packrat.png'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import UseTheme from '../hooks/useTheme'
export default function NavigationMobile () {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    UseTheme()
  // const { user } = useAuth();
  const user = useSelector((state) => state.auth.user)

  return user ? (
    <View style={styles.mobileContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
        <Image src={String(packratlogo)} alt="logo" />
        <Text
          style={{
            color: currentTheme.colors.text,
            fontSize: 28,
            fontWeight: 900
          }}
        >
          PackRat
        </Text>
      </View>
      <Link href="/drawer">
        <EvilIcons
          name="navicon"
          size={48}
          color={currentTheme.colors.iconColor}
          // onPress={() => setIsMenuOpen(!isMenuOpen)}
        />
      </Link>
    </View>
  ) : (
    <View style={styles.mobileContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
        <Image src={String(packratlogo)} alt="logo" />
        <Text
          style={{
            color: currentTheme.colors.text,
            fontSize: 28,
            fontWeight: 900
          }}
        >
          PackRat
        </Text>
      </View>
      <Link href="/drawer">
        <EvilIcons
          name="navicon"
          size={48}
          color={currentTheme.colors.iconColor}
          // onPress={() => setIsMenuOpen(!isMenuOpen)}
        />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  mobileContainer: {
    backgroundColor: theme.colors.background,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 40,
    position: 'relative'
  },

  logo: {
    width: 60,
    height: 50
  },
  smallLogo: {
    width: 100,
    height: 95
  },

  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,

    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: '100%',
    color: 'white'
  }
})
