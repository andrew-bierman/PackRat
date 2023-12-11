
import { Paragraph, SizableText, Text, XStack, YStack } from 'tamagui'
import React from 'react'

const SizableTextComp = () => {

  
  
    return (
      <YStack space="2$" alignItems="center">
      <SizableText size="$16">SizableText</SizableText>
      <XStack space>
        <SizableText theme="alt1_DialogOverlay" size="$3">
          alt1
        </SizableText>
        <SizableText theme="alt2" size="$3">
          alt2
        </SizableText>
      </XStack>
      <Paragraph size="$2" fontWeight="800">
        Paragraph
      </Paragraph>
    </YStack>
  );
};

export default SizableTextComp;