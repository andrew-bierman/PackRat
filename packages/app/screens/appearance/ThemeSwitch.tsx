import React from 'react';
import { RText, RSwitch } from '@packrat/ui';

const ThemeSwitch = ({ isEnabled, toggleSwitch, currentTheme }) => (
  <>
    <RText style={{ color: currentTheme.colors.drawerIconColor }}>
      Theme Changer
    </RText>
    <RSwitch
      trackColor={!isEnabled ? '#767577' : '#81b0ff'}
      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onCheckedChange={toggleSwitch}
      checked={isEnabled}
    />
    <RText style={{ color: currentTheme.colors.drawerIconColor }}>
      {isEnabled ? 'Dark Mode' : 'Light Mode'}
    </RText>
  </>
);

export default ThemeSwitch;
