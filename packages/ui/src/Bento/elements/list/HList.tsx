import { faker } from '@faker-js/faker'
import { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View, styled } from 'tamagui'

const getData = () =>
  Array.from({ length: 50 })
    .fill(0)
    .map(() => ({
      name: faker.location.city(),
      image: faker.image.urlPicsumPhotos({
        width: 600,
        height: 600,
      }),
      id: faker.string.uuid(),
    }))

type Data = ReturnType<typeof getData>

export function HList() {
  const [data, setData] = useState<Data>([])
  useEffect(() => {
    setData(getData())
  }, [])
  return (
    <ScrollView horizontal padding="$6">
      <View flexDirection="row" gap="$4">
        {data.map((item) => (
          <HListItem key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  )
}

HList.fileName = 'HList'

function HListItem({ item }: { item: Data[number] }) {
  return (
    <HListFrame>
      <HListInner group="listitem">
        <View flexDirection="column">
          <Image width="100%" height={200} source={{ uri: item.image }} />
        </View>
        <View
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          paddingVertical="$4"
          backgroundColor="rgba(0,0,0,0.25)"
        >
          <Text
            color="#fff"
            marginVertical="auto"
            alignSelf="center"
            y={0}
            textShadowColor="$shadowColor"
            textShadowOffset={{ height: 1, width: 0 }}
            textShadowRadius={0}
          >
            {item.name}
          </Text>
        </View>
      </HListInner>
    </HListFrame>
  )
}

const HListFrame = styled(View, {
  width: 200,
  height: 200,
  borderWidth: 1,
  borderColor: '$color3',
  borderRadius: '$5',
  backgroundColor: '$background',
  shadowColor: '$shadowColor',
  shadowRadius: 3,
})

const HListInner = styled(View, {
  width: 200,
  height: 200,
  ov: 'hidden',
  borderRadius: '$5',
})
