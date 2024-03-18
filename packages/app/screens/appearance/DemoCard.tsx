import React from 'react';
import {
  Card,
  H2,
  Paragraph,
  XStack as OriginalXStack,
  Button as OriginalButton,
} from 'tamagui';

const XStack: any = OriginalXStack;
const Button: any = OriginalButton;

const DemoCard = () => (
  <Card
    elevate
    size="$4"
    bordered
    width={250}
    height={300}
    scale={0.9}
    hoverStyle={{ scale: 0.925 }}
    pressStyle={{ scale: 0.875 }}
  >
    <Card.Header padded>
      <H2>Sony A7IV</H2>
      <Paragraph theme="alt2">Now available</Paragraph>
    </Card.Header>
    <Card.Footer padded>
      <XStack flex={1} />
      <Button borderRadius="$10">Purchase</Button>
    </Card.Footer>
  </Card>
);

export default DemoCard;
