import { X } from '@tamagui/lucide-icons'
import { Toast, useToastState } from '@tamagui/toast'
import { Button, Theme, XStack, YStack, isWeb } from 'tamagui'

export const CustomToast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) {
    return null
  }

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      themeInverse
    >
      <YStack>
        <XStack gap="$3">
          <Toast.Title>{currentToast.title}</Toast.Title>

          {/* <Toast.Close asChild>
            <Button
              chromeless
              icon={X}
              size="$1"
              circular
              style={{ alignItems: 'center', justifyContent: 'center' }}
            ></Button>
          </Toast.Close> */}
        </XStack>
        {!!currentToast.message && <Toast.Description>{currentToast.message}</Toast.Description>}
      </YStack>
    </Toast>
  )
}
