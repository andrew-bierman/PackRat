import React from 'react';
import { Popover, Button, YStack, Text } from 'tamagui';
import { useQuickActions } from 'app/modules/dashboard';
import { QuickActionButton } from 'app/modules/dashboard/components/QuickActionButton/QuickActionButton';
import { RButton, RText } from '@packrat/ui';
import { MaterialIcons } from '@expo/vector-icons';
import useTheme from 'app/hooks/useTheme';

interface FABProps {
  showQuickActions: boolean;
  toggleQuickActions: () => void;
  closeQuickActions: () => void;
}

const FABWeb: React.FC<FABProps> = ({
  showQuickActions,
  toggleQuickActions,
  closeQuickActions,
}) => {
  const { handleActionSelect, quickActionData } = useQuickActions();
  const { currentTheme } = useTheme();

  return (
    <Popover>
      <Popover.Trigger asChild>
        <RButton
          style={{
            flexDirection: 'row',
            backgroundColor: currentTheme.colors.card,
            margin: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialIcons name="add" size={20} />
          <RText style={{ fontWeight: 'bold', fontSize: 18 }}>Create</RText>
        </RButton>
      </Popover.Trigger>
      <Popover.Content elevate bordered size="$2">
        <YStack space="$3">
          {quickActionData.map((action) => (
            <QuickActionButton
              key={action.action}
              onPress={() => handleActionSelect(action.action)}
              iconName={action.iconName}
              text={action.text}
            />
          ))}
        </YStack>
        <Popover.Arrow />
      </Popover.Content>
    </Popover>
  );
};

export default FABWeb;
