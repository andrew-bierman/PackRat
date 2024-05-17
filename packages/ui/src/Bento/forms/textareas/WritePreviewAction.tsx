import { Paperclip, Send } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { Button, Separator, Text, Tabs, TextArea, View, styled } from 'tamagui';

/** ------ EXAMPLE ------ */
export function WritePreviewAction() {
  const [activeTab, setActiveTab] = useState('write');
  return (
    <Tabs
      width={500}
      maxWidth="100%"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <View
        width="100%"
        overflow="hidden"
        backgroundColor="$background"
        borderColor="$borderColor"
        borderWidth={1}
        borderRadius="$4"
      >
        <View flexDirection="row">
          <Tabs.List width="100%" backgroundColor="$color5" borderRadius={0}>
            <StyledTab
              bblr={0}
              borderBottomRightRadius={0}
              value="write"
              tabSelected={activeTab === 'write'}
            >
              <Text fontSize="$3" lineHeight="$3" fontWeight="$3">
                Write
              </Text>
            </StyledTab>
            <StyledTab
              bblr={0}
              borderBottomRightRadius={0}
              borderTopRightRadius={0}
              value="preview"
              tabSelected={activeTab === 'preview'}
            >
              <Text fontSize="$3" lineHeight="$3" fontWeight="$3">
                Preview
              </Text>
            </StyledTab>
          </Tabs.List>
        </View>
        <Tabs.Content theme="active" value="write" backgroundColor="$color1">
          <StyledTextArea
            size="$4"
            placeholderTextColor="$placeholderColor"
            color="#000"
            backgroundColor="$color1"
            padding="$4"
            numberOfLines={5}
            fontWeight="300"
            height={200}
            placeholder="Your comment here..."
          />
        </Tabs.Content>
        <Tabs.Content theme="active" backgroundColor="$color1" value="preview">
          <Text
            fontSize="$3"
            lineHeight="$3"
            fontWeight="300"
            borderColor="$color1"
            padding="$3"
            height={200}
          >
            Your text preview
          </Text>
        </Tabs.Content>
        <Separator />
        <View
          flexDirection="row"
          paddingHorizontal="$3"
          paddingVertical="$2"
          justifyContent="space-between"
          alignItems="center"
        >
          <View flexDirection="row">
            <Button size="$2" chromeless>
              <Button.Icon>
                <Paperclip color="$gray10" size="$1" />
              </Button.Icon>
            </Button>
          </View>
          <Button
            themeInverse
            alignSelf="flex-end"
            size="$4"
            borderRadius="$10"
          >
            <Button.Icon>
              <Send />
            </Button.Icon>
            <Button.Text>Post</Button.Text>
          </Button>
        </View>
      </View>
    </Tabs>
  );
}

WritePreviewAction.fileName = 'WritePreviewAction';

const StyledTab = styled(Tabs.Tab, {
  unstyled: true,
  borderColor: 'transparent',
  padding: '$2.5',
  paddingHorizontal: '$4.5',

  hoverStyle: {
    backgroundColor: '$background05',
  },

  variants: {
    tabSelected: {
      true: {
        backgroundColor: '$color1',
        borderColor: '$borderColor',
        borderBottomWidth: 0,
        hoverStyle: {
          backgroundColor: '$color1',
        },
      },
      false: {
        opacity: 0.6,
      },
    },
  } as const,
});

const StyledTextArea = styled(TextArea, {
  unstyled: true,
  height: 200,
  padding: '$3',
});
