import { Spinner, YStack } from 'tamagui'

export const FullscreenSpinner = () => {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center">
      <Spinner />
    </YStack>
  )
}
