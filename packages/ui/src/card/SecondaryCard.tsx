import React, { type FC } from 'react';
import { type BaseCardProps } from './model';
import { Card, View, XStack, YStack, useTheme } from 'tamagui';
import RText from '../RText';

interface SecondaryCardProps extends Omit<BaseCardProps, 'content'> {
  isFullWidth?: boolean;
}

export const SecondaryCard: FC<SecondaryCardProps> = (props) => {
  const theme = useTheme();

  return (
    <Card
      elevate
      size="$4"
      bordered
      style={{
        height: 120,
        width: props.isFullWidth ? '100%' : 200,
        overflow: 'hidden',
      }}
      {...props}
    >
      <Card.Background>{props.image}</Card.Background>
      <YStack
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginTop: 'auto',
          height: 'auto',
          padding: 10,
          paddingBottom: 5,
          backgroundColor: theme.shadowColorPress.val,
        }}
      >
        <XStack
          style={{
            justifyContent: 'space-between',
            width: '100%',
            flexDirection: 'row',
          }}
        >
          <View style={{ maxWidth: '100%' }}>
            <RText
              style={{ fontWeight: 'bold', fontSize: 16, lineHeight: 24 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.title}
            </RText>
            <RText
              style={{ fontSize: 12, textAlign: 'left', lineHeight: 16 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.subtitle}
            </RText>
          </View>
          {props.actions ? <View>{props.actions}</View> : null}
        </XStack>
      </YStack>
    </Card>
  );
};
