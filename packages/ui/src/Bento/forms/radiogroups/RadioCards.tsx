import { Clock, Dot } from '@tamagui/lucide-icons'
import { useState } from 'react'
import type { ThemeName } from 'tamagui'
import { Card } from './components/radioParts'
import { H2, RadioGroup, Text, View, useEvent } from 'tamagui'

const packages = [
  {
    title: 'Toys',
    description: 'A package of toys',
    itemsCounts: 621,
    color: 'green',
  },
  {
    title: 'Books',
    description: 'A package of books',
    itemsCounts: 621,
    color: 'purple',
  },
  {
    title: 'Clothes',
    description: 'A package of clothes',
    itemsCounts: 621,
    color: 'orange',
  },
  {
    title: 'Electronics',
    description: 'A package of electronics',
    itemsCounts: 621,
    color: 'blue',
  },
]

type Item = (typeof packages)[number]

/** ------ EXAMPLE ------ */
export function RadioCards() {
  const [value, setValue] = useState<string>()

  return (
    <View
      flexDirection="column"
      gap="$4"
      width="100%"
      $group-window-sm={{
        padding: 0,
      }}
    >
      <H2>Select your gift</H2>
      <RadioGroup value={value} onValueChange={(next) => setValue(next)}>
        <View flexDirection="row" flexWrap="wrap" gap="$3">
          {packages.map((item) => (
            <Item
              item={item}
              key={item.title}
              selected={value === item.title}
              setValue={(next) => setValue(next)}
            />
          ))}
        </View>
      </RadioGroup>
    </View>
  )
}

RadioCards.fileName = 'RadioCards'

function Item({
  selected,
  setValue,
  item,
}: {
  selected: boolean
  setValue: (value: string) => void
  item: Item
}) {
  const { title, description, color } = item
  const onPress = useEvent(() => setValue(title))
  return (
    <Card
      onPress={onPress}
      flex={1}
      flexBasis={300}
      flexShrink={1}
      height={150}
      borderRadius="$5"
      padding="$3"
      active={selected}
    >
      <View flexDirection="column" gap="$2">
        <View flexDirection="row" justifyContent="space-between">
          <View
            flexDirection="row"
            theme={color as ThemeName}
            paddingLeft="$0.5"
            paddingRight="$2.5"
            paddingVertical="$1"
            backgroundColor="$color6"
            borderRadius="$3"
            alignItems="center"
          >
            <Dot color="$color10" />
            <Text col="$color9" fontSize="$5">
              {item.title}
            </Text>
          </View>
          <View onPress={(e) => e.stopPropagation()}>
            <RadioGroup.Item id={title} value={title}>
              <RadioGroup.Indicator />
            </RadioGroup.Item>
          </View>
        </View>
        <Text fontWeight="300" theme="alt1" fontSize="$4">
          {description}
        </Text>
      </View>
      <View flexDirection="row" gap="$2" marginTop="auto" alignItems="center">
        <Clock color="$color7" size={14} />
        <Text fontSize="$true" fontWeight="300" theme="alt2">
          last bought 2 hr ago
        </Text>
      </View>
    </Card>
  )
}
