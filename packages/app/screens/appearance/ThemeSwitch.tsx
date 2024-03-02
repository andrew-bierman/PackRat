import React from 'react';
import { RText, RSwitch } from '@packrat/ui';

const ThemeSwitch = ({ isEnabled, toggleSwitch, currentTheme }) => (
  <>
    <RText style={{ color: currentTheme.colors.drawerIconColor }}>
      Theme Changer
    </RText>
    <RSwitch
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
    <RText style={{ color: currentTheme.colors.drawerIconColor }}>
      {isEnabled ? 'Dark Mode' : 'Light Mode'}
    </RText>
  </>
);

export default ThemeSwitch;
