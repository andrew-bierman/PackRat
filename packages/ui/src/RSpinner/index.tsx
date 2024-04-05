import { Spinner, YStack } from 'tamagui';

function RSpinner({ size = 'small', color = 'blue' }) {
  return (
    <YStack alignItems="center">
      <Spinner size={size} color={color} />
    </YStack>
  );
}

export default RSpinner;
