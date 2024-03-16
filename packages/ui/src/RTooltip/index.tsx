import {
  Paragraph as OriginalParagraph,
  Tooltip as OriginalTooltip,
  TooltipProps,
  Button,
  TooltipGroup,
  YStack as OriginalYStack,
} from 'tamagui';

const YStack: any = OriginalYStack;
const Tooltip: any = OriginalTooltip;
const Paragraph: any = OriginalParagraph;

interface RTooltipProps extends TooltipProps {
  Icon?: any;
  Label?: string;
}

function RTooltip({
  Icon,
  Label,
  placement = 'top',
  ...props
}: RTooltipProps & { Icon?: any }) {
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
