import {
  Paragraph,
  Tooltip,
  TooltipProps,
  Button,
  TooltipGroup,
  YStack,
} from 'tamagui';
import { View } from 'react-native';

function RTooltip({
  Icon,
  Label,
  placement = 'top',
  ...props
}: TooltipProps & { Icon?: any }) {
  return (
    <TooltipGroup delay={{ open: 3000, close: 100 }}>
      <YStack space="$2" alignSelf="center">
        <Tooltip placement={placement} {...props}>
          <Tooltip.Trigger>
            <Button icon={Icon} circular />
          </Tooltip.Trigger>
          <Tooltip.Content
            enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
            scale={1}
            x={0}
            y={0}
            opacity={1}
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
          >
            <Tooltip.Arrow />
            <Paragraph size="$2" lineHeight="$1">
              {Label}
            </Paragraph>
          </Tooltip.Content>
        </Tooltip>
      </YStack>
    </TooltipGroup>
  );
}

export default RTooltip;
