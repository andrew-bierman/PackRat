import { Spinner as OriginalSpinner, YStack as OriginalYStack } from 'tamagui';

const YStack: any = OriginalYStack;
const Spinner: any = OriginalSpinner;

function RSpinner({ size = 'small', color = 'blue' }) {
function RSpinner({ size = 'small', color = 'blue' }) {
  return (
    <YStack alignItems="center">
      <Spinner size={size} color={color} />
    </YStack>
  );
}

export default RSpinner;
