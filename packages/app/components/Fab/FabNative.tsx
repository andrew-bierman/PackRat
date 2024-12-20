import React from 'react';
import { Popover, YStack } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';
import { useQuickActions } from 'app/modules/dashboard';
import useTheme from 'app/hooks/useTheme';
import { QuickActionButton } from 'app/modules/dashboard/components/QuickActionButton/QuickActionButton';
import { RButton } from '@packrat/ui';

const FABNative = () => {
  const { handleActionSelect, quickActionData } = useQuickActions();
  const { currentTheme } = useTheme();

  return (
    <Popover>
      <Popover.Trigger asChild>
        <RButton
          style={{
            position: 'absolute',
            width: 55,
            height: 55,
            backgroundColor: currentTheme.colors.card,
            borderRadius: 28,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
            elevation: 2,
            bottom: 20,
            alignSelf: 'center',
          }}
        >
          <MaterialIcons
            name="add"
            size={20}
            color={currentTheme.colors.text}
          />
        </RButton>
      </Popover.Trigger>
      <Popover.Content
        elevate
        bordered
        size="$1"
        style={{
          bottom: 158,
          height: 120,
          width: 150,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: currentTheme.colors.background,
        }}
      >
        <YStack space="$1">
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

export default FABNative;
