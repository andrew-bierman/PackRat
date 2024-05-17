import { faker } from '@faker-js/faker'
import { Heart, Minus, Plus, Trash } from '@tamagui/lucide-icons'
import { useEffect, useState } from 'react'
import {
  Button,
  Image,
  Label,
  ScrollView,
  Separator,
  Text,
  View,
  XGroup,
  styled,
  isWeb,
} from 'tamagui'
import { useMedia } from 'tamagui'
import { Dimensions } from 'react-native'

const bagImages = ['bag1.jpg', 'bag2.jpg', 'bag3.webp', 'bag4.webp']
const bagNames = [
  'Leather Bag',
  'Canvas Bag',
  'Shoulder Bag',
  'Backpack',
  'Tote Bag',
  'Crossbody Bag',
  'Satchel',
  'Hobo Bag',
  'Clutch',
  'Duffle Bag',
]

const StyledText = styled(Text, {
  color: '$color',
  fontSize: '$4',
  lineHeight: '$4',
})

const getItems = () => {
  return Array.from({ length: 10 }).map((_, i) => ({
    id: faker.string.uuid(),
    name: bagNames[i % bagNames.length],
    price: faker.commerce.price(),
    count: faker.number.int({ min: 1, max: 10 }),
    attributes: [
      {
        name: 'size',
        value: faker.number.float({ min: 3, max: 8, precision: 0.5 }),
      },
      {
        name: 'material',
        value: faker.commerce.productMaterial(),
      },
    ],
    image: 'http://www.tamagui.dev/bento/images/bag/' + bagImages[i % bagImages.length],
  }))
}

type Items = ReturnType<typeof getItems>

const CartTotal = () => {
  return (
    <View
      flexDirection="row"
      position="relative"
      $group-window-gtMd={{
        position: 'absolute',
        b: 0,
        l: 0,
        r: 0,
        m: 0,
      }}
      borderWidth={2}
      borderColor="$borderColor"
      borderRadius={5}
      $platform-native={{
        position: 'relative',
      }}
    >
      <View
        flexDirection="column"
        padding="$6"
        borderRadius={5}
        gap="$6"
        width="100%"
        backgroundColor="$color1"
        $group-window-md={{
          padding: '$4',
          gap: '$4',
        }}
      >
        <StyledText fontSize="$6" lineHeight="$6">
          Total money
        </StyledText>
        <View flexDirection="column" theme="alt1">
          <View flexDirection="row" justifyContent="space-between">
            <StyledText>Temporary amount</StyledText>
            <StyledText>$78.21</StyledText>
          </View>
          <View flexDirection="row" justifyContent="space-between">
            <StyledText>Shipping</StyledText>
            <StyledText>DHI</StyledText>
          </View>
        </View>
        <Separator />
        <View flexDirection="row" justifyContent="space-between">
          <StyledText>The total amount of</StyledText>
          <StyledText>$89.12</StyledText>
        </View>
        <Button themeInverse>
          <Button.Text>Finalize Checkout</Button.Text>
        </Button>
      </View>
    </View>
  )
}

/** ------ EXAMPLE ------ */
export function Fullpage() {
  const [items, setItems] = useState<Items>([])

  const { sm, xs } = useMedia()

  useEffect(() => {
    setItems(getItems())
  }, [])
  return (
    <View flexDirection="column" maxHeight={910} height={'100%'} width="100%">
      <ScrollView
        contentContainerStyle={{
          // gap: 24,
          padding: sm ? 12 : 24,
          paddingBottom: sm ? 300 : 48,
          flexDirection: 'column',
          minWidth: '100%',
        }}
        $group-window-gtSm={{
          flex: 3,
        }}
      >
        {items.map((item, index) => (
          <View minWidth={'100%'} marginBottom="$2" key={item.id}>
            <Item item={item} />
            {index !== items.length - 1 && <Separator marginVertical="$4" />}
          </View>
        ))}
        {!isWeb && <CartTotal />}
      </ScrollView>
      {isWeb && <CartTotal />}
    </View>
  )
}

Fullpage.fileName = 'Fullpage'

const Item = ({ item }: { item: Items[number] }) => {
  const { sm, xxs, xs } = useMedia()
  const [layoutWidth, setLayoutWidth] = useState(0)

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout
    setLayoutWidth(width)
  }

  return (
    <View
      flexDirection="row"
      flexWrap="wrap"
      gap="$6"
      $sm={{
        minWidth: '100%',
      }}
      onLayout={onLayout}
    >
      <View
        flexGrow={xxs ? 1 : 0}
        flexBasis={150}
        gap="$4"
        flexDirection="column"
        borderRadius="$4"
      >
        <Image
          borderRadius={5}
          backgroundColor="$color1"
          resizeMode="cover"
          $platform-native={{
            minWidth: layoutWidth,
          }}
          $group-window-gtMd={{
            minWidth: 'inherit',
          }}
          height={200}
          source={{ uri: item.image }}
        />
        {/* {xs && <ItemCounter justifyContent={xxs ? 'center' : 'space-between'} />} */}
      </View>
      <View
        flexBasis={150}
        minWidth={'100%'}
        $group-window-gtSm={{
          minWidth: 'inherit',
        }}
        gap="$3"
        alignItems="flex-start"
        flex={1}
        jc="space-between"
      >
        <View width="100%" gap="$2">
          <Text fontSize="$5" lineHeight="$5" fontWeight="600">
            {item.name}
          </Text>
          <Separator />
        </View>

        <View
          flexDirection="row"
          theme="alt1"
          alignItems="center"
          justifyContent="space-between"
          gap="$2"
          minWidth="100%"
          $group-window-gtSm={{
            minWidth: 'inherit',
          }}
        >
          <Button
            flexGrow={1}
            icon={Trash}
            id={'remove-product' + item.id}
            size="$3"
            borderRadius="$12"
            theme="green"
          >
            <Text htmlFor={'remove-product' + item.id}>Remove</Text>
          </Button>
          <Button
            flexGrow={1}
            icon={Heart}
            theme="red"
            id="add-favorite"
            size="$3"
            borderRadius="$12"
          >
            <Text htmlFor="add-favorite">Favorite</Text>
          </Button>
        </View>
      </View>
      <View
        flexDirection="column"
        gap="$2"
        $group-window-gtSm={{
          gap: '$4',
          paddingRight: 48,
          marginLeft: 'auto',
        }}
      >
        <ItemCounter />
        <View flexDirection="row" gap="$2">
          <Text fontSize="$8" lineHeight="$8">
            ${item.price}
          </Text>
          <Text
            textDecorationLine="line-through"
            color="$color10"
            fontSize="$3"
            lineHeight="$3"
          >
            ${Math.round(Number(item.price) + 10)}
          </Text>
        </View>

        <Text color="$red8" fontSize="$3" lineHeight="$3">
          Saving 15%
        </Text>
      </View>
    </View>
  )
}

const ItemCounter = View.styleable((props, ref) => {
  const [count, setCount] = useState(1)

  return (
    <XGroup ref={ref} {...props}>
      <XGroup.Item>
        <Button
          theme="alt2"
          size="$3"
          onPress={() => setCount(count > 1 ? count - 1 : 1)}
        >
          <Button.Icon>
            <Minus />
          </Button.Icon>
        </Button>
      </XGroup.Item>
      <XGroup.Item>
        <View
          flexBasis={40}
          justifyContent="center"
          alignItems="center"
          borderRadius="$4"
          borderWidth={1}
          borderColor="$borderColor"
        >
          <StyledText>{count}</StyledText>
        </View>
      </XGroup.Item>
      <XGroup.Item>
        <Button
          theme="alt2"
          size="$3"
          onPress={() => setCount(count < 10 ? count + 1 : 10)}
          icon={Plus}
        />
      </XGroup.Item>
    </XGroup>
  )
})
