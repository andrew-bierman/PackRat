import { useId, useState } from 'react';
import { H2, Label, RadioGroup, Text, View } from 'tamagui';
import { Card } from './components/radioParts';

const items = ['PayPal', 'Mastercard', 'Visa'];

/** ------ EXAMPLE ------ */
export function Horizontal() {
  const uniqueId = useId();
  const [value, setValue] = useState('hor-visa');
  return (
    <View flexDirection="column" width="100%" maxWidth={600} gap="$4">
      <View flexDirection="column">
        <H2>Payment</H2>
        <Text fos="$4" lh="$4" fontWeight="300" color="$gray10">
          Select your payment method
        </Text>
      </View>
      <RadioGroup
        flexWrap="wrap"
        gap="$4"
        rowGap="$2"
        flexDirection="row"
        value={value}
        onValueChange={setValue}
      >
        {items.map((item) => (
          <Card
            key={item}
            flexDirection="row"
            flex={1}
            flexBasis={150}
            alignItems="center"
            gap="$3"
            padding={0}
            minWidth="100%"
            active={value === item}
            paddingHorizontal="$2.5"
            cursor="pointer"
            onPress={() => setValue(item)}
            $group-window-gtXs={{
              minWidth: 'auto',
            }}
          >
            <View onPress={(e) => e.stopPropagation()}>
              <RadioGroup.Item id={uniqueId + item} value={item}>
                <RadioGroup.Indicator />
              </RadioGroup.Item>
            </View>

            <Label cursor="pointer" htmlFor={uniqueId + item}>
              {item}
            </Label>
          </Card>
        ))}
      </RadioGroup>
    </View>
  );
}

Horizontal.fileName = 'Horizontal';
