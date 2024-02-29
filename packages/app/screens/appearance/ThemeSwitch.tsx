import React from 'react';
import { Switch } from 'native-base';
import { RText as Text } from '@packrat/ui';

const ThemeSwitch = ({ isEnabled, toggleSwitch, currentTheme }) => (
  <>
    <Text style={{ color: currentTheme.colors.drawerIconColor }}>
      Theme Changer
    </Text>
    <Switch
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
    <Text style={{ color: currentTheme.colors.drawerIconColor }}>
      {isEnabled ? 'Dark Mode' : 'Light Mode'}
    </Text>
  </>
);

export default ThemeSwitch;
