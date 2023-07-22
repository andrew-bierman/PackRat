import {
  GroupProps,
  H2,
  Separator,
  TamaguiElement,
  XStack,
  YGroup,
  HeadingProps,
  YStack,
  YStackProps,
  isWeb,
  withStaticProperties,
} from 'tamagui'
import { forwardRef } from 'react'
import { SettingItem } from './SettingItem'

const Wrapper = forwardRef<TamaguiElement, YStackProps>((props, ref) => (
  <YStack
    ref={ref}
    // borderTopWidth="$0.25"
    // borderBottomWidth="$0.25"
    borderColor="$color4"
    gap="$5"
    f={1}
    {...props}
  />
))

const Items = forwardRef<TamaguiElement, YStackProps>((props, ref) => (
  <YStack
    {...(isWeb
      ? {
          separator: <Separator borderColor="$color3" mx="$-4" borderWidth="$0.25" />,
          gap: '$4',
          m: '$4',
        }
      : {
          gap: '$4',
          m: '$4',
        })}
    ref={ref}
    {...props}
  />
))

const Group = (props: GroupProps) => (
  <YGroup
    backgroundColor="transparent"
    // borderRadius="$4"
    disablePassBorderRadius={isWeb}
    separator={
      !isWeb ? (
        <XStack>
          <YStack width={20} backgroundColor="$color2" />
          <Separator borderColor="$color4" borderWidth="$0.25" />
        </XStack>
      ) : undefined
    }
    {...props}
  />
)

const Title = forwardRef<TamaguiElement, HeadingProps>((props, ref) => (
  <H2 mx={isWeb ? '$6' : '$4'} py="$4" ref={ref} {...props} />
))

export const Settings = withStaticProperties(Wrapper, {
  Item: SettingItem,
  Items,
  Group,
  Title,
})
