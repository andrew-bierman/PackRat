import React, { type FC } from 'react';
import { type BaseCardProps } from './model';
import { Card, View, XStack, YStack } from 'tamagui';
import RText from '../RText';

interface SecondaryCardProps extends Omit<BaseCardProps, 'content'> {}

export const SecondaryCard: FC<SecondaryCardProps> = (props) => {
  return (
    <Card
      elevate
      size="$4"
      bordered
      style={{ height: 120, width: 200 }}
      {...props}
    >
      <Card.Background>{props.image}</Card.Background>
      <YStack
        style={{
          justifyContent: 'flex-end',
          height: '100%',
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <XStack
          style={{
            justifyContent: 'space-between',
            width: '100%',
            flexDirection: 'row',
          }}
        >
          <View style={{ maxWidth: 120 }}>
            <RText
              style={{ fontWeight: 'bold', fontSize: 16 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.title}
            </RText>
            <RText
              style={{ color: 'CaptionText', fontSize: 12 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.subtitle}
            </RText>
          </View>
          <View>{props.actions}</View>
        </XStack>
      </YStack>
    </Card>
  );
};
