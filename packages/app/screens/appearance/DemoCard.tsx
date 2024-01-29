import React from 'react';
import { Card, H2, Paragraph, XStack, Button } from 'tamagui';

const DemoCard = ({ isEnabled }) => (
  <Card elevate size="$4" bordered>
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
