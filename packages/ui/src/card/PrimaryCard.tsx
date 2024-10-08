import React, { type FC } from 'react';
import { type BaseCardProps } from './model';
import { Card, useTheme, View, XStack, YStack } from 'tamagui';
import { RText } from '@packrat/ui';

interface PrimaryCardProps extends BaseCardProps {}

export const PrimaryCard: FC<PrimaryCardProps> = (props) => {
  const theme = useTheme();
  return (
    <Card elevate size="$4" bordered {...props}>
      <Card.Header>
        <XStack>
          <View
            style={{ width: 100, height: 100, border: '1px solid lightgray' }}
          >
            {props.image}
          </View>
          <YStack
            style={{
              padding: 10,
              alignSelf: 'stretch',
              maxWidth: 560,
              justifyContent: 'space-between',
            }}
          >
            <RText
              style={{ fontWeight: 'bold', fontSize: 18 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.title}
            </RText>
            <RText
              style={{ color: 'CaptionText', fontSize: 14 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.subtitle}
            </RText>
            <View>{props.actions}</View>
          </YStack>
        </XStack>
      </Card.Header>
      {props.content && (
        <View
          style={{
            paddingLeft: 18,
            paddingRight: 18,
            maxWidth: 560,
          }}
        >
          {props.content}
        </View>
      )}
      {props.footer && (
        <Card.Footer padded>
          <View>{props.footer}</View>
        </Card.Footer>
      )}
    </Card>
  );
};
