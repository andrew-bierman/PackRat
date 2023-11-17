// SectionHeader.js
import React from 'react';
import { Text, HStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import useCustomStyles from '~/hooks/useCustomStyles';
import { RText, XStack } from '@packrat/ui';

const SectionHeader = ({ iconName, text }) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <XStack jc='space-around' ai='center' mb={10}>
      <Ionicons name={iconName} style={styles.icon} />
      <RText fos={20} fow='bold' col={theme.colors.text}>{text}</RText>
    </XStack>
  );
};

const loadStyles = () => ({
  icon: {
    fontSize: 40,
    margin: 10,
    color: 'white',
  },
});

export default SectionHeader;
