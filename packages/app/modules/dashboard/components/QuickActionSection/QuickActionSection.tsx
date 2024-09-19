import React from 'react';
import { RStack } from '@packrat/ui';
import { QuickActionButton } from '../QuickActionButton';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useQuickActions } from 'app/modules/dashboard';

export const QuickActionsSection = ({ closeQuickActions }) => {
  const styles = useCustomStyles(loadStyles);
  const { handleActionSelect, quickActionData } = useQuickActions();

  return (
    <RStack style={{ flexDirection: 'column', ...styles.section }}>
      {quickActionData.map((action) => (
        <QuickActionButton
          key={action.action}
          onPress={() => {
            handleActionSelect(action.action);
            closeQuickActions();
          }}
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
      minWidth: 250,
      justifyContent: 'center',
    },
  };
};
