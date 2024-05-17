import { H1, ScrollView, Text, View, styled } from 'tamagui'

const data = [
  {
    title: 'Your are sending',
    value: '10000 USDT',
  },
  {
    title: 'Transfer fee',
    value: '10 USDT',
  },
  {
    title: 'Google exchange rate',
    value: '1 USDT = 1.21 EUR',
  },
  {
    title: 'Jack london is receiving',
    value: '12100 EUR',
  },
  {
    title: 'Receiver account',
    value: 'DE1234567890',
  },
  {
    title: 'Estimated arrival',
    value: '1-2 business days',
  },
]

/** ---- EXAMPLE ------ */
export function ItemValueList() {
  return (
    <ScrollView
      width="100%"
      height="100%"
      paddingHorizontal="$4"
      $group-window-gtXs={{
        paddingHorizontal: '$8',
      }}
    >
      <View gap="$4">
        <H1
          size="$9"
          $group-window-xxs={{
            size: '$7',
          }}
        >
          Payment Checkout
        </H1>
        <View width="100%">
          {data.map((item, index) => {
            const isLastItem = index === data.length - 1
            return <Row isLastItem={isLastItem} key={index} item={item} />
          })}
        </View>
      </View>
    </ScrollView>
  )
}

ItemValueList.fileName = 'ItemValueList'

const Row = ({ item, isLastItem }: { item: (typeof data)[0]; isLastItem: boolean }) => {
  return (
    <View
      justifyContent="space-between"
      paddingVertical="$4"
      alignItems="center"
      flexDirection="row"
      borderBottomWidth={1}
      borderColor={isLastItem ? 'transparent' : '$borderColor'}
      $group-window-xs={{
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <SizeableText
        size="$4"
        $group-window-xs={{
          color: '$gray11',
        }}
      >
        {item.title}
      </SizeableText>
      <SizeableText
        size="$4"
        color="$gray11"
        $group-window-xs={{
          color: '$color',
        }}
      >
        {item.value}
      </SizeableText>
    </View>
  )
}

const SizeableText = styled(Text, {
  variants: {
    size: {
      '...fontSize': (val, { font }) => {
        if (!font) return {}
        return {
          fontSize: font.size[val],
          lineHeight: font.lineHeight[val],
          fontWeight: font.weight[val],
        }
      },
    },
  },
})
