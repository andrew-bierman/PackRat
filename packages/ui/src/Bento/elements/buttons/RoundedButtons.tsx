import { Folder } from '@tamagui/lucide-icons'
import type { SizeTokens } from 'tamagui'
import { Button, View, YStack } from 'tamagui'

const sizes = ['$4', '$5', '$6'] as const

/** ------ EXAMPLE ------ */
export function RoundedButtons() {
  return (
    <YStack gap="$8" $group-window-gtSm={{ flexDirection: 'row' }}>
      <View gap="$2">
        <Button theme="blue" circular>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>

        <Button theme="red" circular>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>

        <Button theme="green" circular>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>

        <Button theme="purple" circular>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>

        <Button theme="pink" circular>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>

        <Button theme="yellow" circular>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>

        <Button theme="orange" circular>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>
      </View>
      <View gap="$2">
        <Button minWidth="100%" circular>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>

        <Button theme="active" circular>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>

        <Button disabled circular opacity={0.5}>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>

        <Button themeInverse circular>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>

        <Button variant="outlined" circular>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>

        <Button chromeless circular>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>
      </View>

      <View gap="$2">
        <Button size={'$3'} circular>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>

        <Button circular>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>

        <Button size={'$6'} circular>
          <Button.Icon>
            <Folder />
          </Button.Icon>
        </Button>
      </View>
    </YStack>
  )
}

RoundedButtons.fileName = 'RoundedButtons'
