import React from 'react';
import { RStack } from '@packrat/ui';
import { QuickActionButton } from '../QuickActionButton';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useQuickActions } from 'app/hooks/dashboard';

export const QuickActionsSection = () => {
  const styles = useCustomStyles(loadStyles);
  const { handleActionSelect, quickActionData } = useQuickActions();

  return (
    <RStack style={{ flexDirection: 'row', ...styles.section }}>
      {quickActionData.map((action) => (
        <QuickActionButton
          key={action.action}
          onPress={() => handleActionSelect(action.action)}
          iconName={action.iconName}
          text={action.text}
        />
      ))}
    </RStack>
  );
};

const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  return {
    section: {
      display: 'flex',
      justifyContent: 'center',
    },
  };
};
