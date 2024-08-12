import React from 'react';
import { Menu } from '@tamagui/lucide-icons';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from '../../hooks/useTheme';

import { Adapt, Button, Popover as OriginalPopover } from 'tamagui';
import { NavigationList } from './NavigationList';

const Popover: any = OriginalPopover;

export function Drawer() {
  const { currentTheme, isDark, isLight } = useTheme();
  const styles = useCustomStyles(loadStyles);

  return (
    <Popover size="$5" allowFlip placement="bottom" hoverable>
      <Popover.Trigger asChild>
        <Button
          icon={<Menu strokeWidth={3} />}
          bg="transparent"
          outlineColor="transparent"
          color="#315173"
          fontWeight="bold"
          focusStyle={{
            bg: 'transparent',
            outlineColor: 'transparent',
          }}
          hoverStyle={{
            outlineColor: 'white',
            bg: 'transparent',
          }}
        >
        </Button>
      </Popover.Trigger>
      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$1">
            <Adapt.Contents />
          </Popover.Sheet.Frame>

          <Popover.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Popover.Sheet>
      </Adapt>
      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        style={styles.popover}
        bg={isDark ? currentTheme.colors.background : '#f0f2f5'}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow
          borderWidth={1}
          borderColor="$borderColor"
          bg={isDark ? currentTheme.colors.background : '#f0f2f5'}
        />
        <NavigationList
          itemStyle={styles.navigationItem}
          onItemSelect={() => {}}
        />
        <Popover.Close asChild />
      </Popover.Content>
    </Popover>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    modalOverlay: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    fullScreenTouchable: {
      flex: 1,
    },
    drawerContainer: {
      backgroundColor: currentTheme.colors.background,
      width: '70%',
      height: '100%',
      padding: 16,
    },
    drawerWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    navigationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    popover: {
      alignItems: 'flex-start',
      boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.29)'
    },
  };
};
