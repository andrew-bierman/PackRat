import { View, StyleSheet } from 'react-native'
import { Card } from 'native-base'
import React from 'react'
import { theme } from '../../theme'

const Section = ({ children, onPress }) => {
  return (
    <View style={styles.section} onPress={onPress}>
      <Card style={styles.card}>
        {children}
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    paddingHorizontal: 20 // Added padding here.
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: theme.colors.secondaryBlue
  }
})

export default Section
