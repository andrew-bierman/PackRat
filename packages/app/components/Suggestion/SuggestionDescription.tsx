import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { AnimatePresence, Text, Theme, View, styled } from 'tamagui';

import useTheme from 'app/hooks/useTheme';

const List = styled(FlatList<Message>, {
  // backgroundColor: '$background',
  gap: '$3',
});

const getMessages = (data: Message[]) => data;

type Message = {
  role: 'user' | 'ai';
  content: string;
};

const renderItem = ({
  item: message,
  index,
}: {
  item: Message;
  index: number;
}) => {
  return <ChatItem index={index + 1} key={index} item={message} />;
};
export function SuggestionDescription({ data }: { data: Message[] }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages(getMessages(data)); // Reverse the messages array
  }, [data]);

  return (
    <View
      style={{ flexDirection: 'column', height: '100%', minWidth: '100%' }}
      $group-window-gtXs={{ height: 700 }}
    >
      <List
        $group-window-gtXs={{
          padding: '$10',
        }}
        data={messages}
        renderItem={renderItem}
        windowSize={2}
        style={{ backgroundColor: '$background' }}
      />
    </View>
  );
}

SuggestionDescription.fileName = 'ChatList';

function ChatItem({ item, index }: { item: Message; index: number }) {
  const [showMessage, setShowMessage] = useState(false);
  const showDelay = 10;
  const [start, setStart] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    // run animations after initial render calms down
    (globalThis.requestIdleCallback || setTimeout)(() => {
      setStart(true);
    });
  }, []);

  useEffect(() => {
    if (!start) return;
    const timeout = setTimeout(() => {
      setShowMessage((prev) => !prev);
    }, showDelay);
    return () => clearTimeout(timeout);
  }, [start, showDelay]);

  return (
    <AnimatePresence>
      {showMessage && (
        <View
          style={{
            padding: '5px 5px',
            background: isDark ? '#333' : 'white',
            flexDirection: 'row',
            alignItems: 'flex-start',
            alignSelf: 'self-start',
            maxWidth: '100%',
            minWidth: '100%'
          }}
          gap="$4"
        >
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              flexShrink: '1'
            }}
            gap="$2"
            // maxWidth={400}
          >
            <Theme name={'blue'}>
              <View
                backgroundColor="$color2"
                padding="$4"
                paddingVertical="$3"
                borderRadius="$5"
                flexShrink={1}
              >
                <Text
                  fontSize="$3"
                  fontWeight="$3"
                  lineHeight="$3"
                  flexShrink={1}
                >
                  {item.content}
                </Text>
              </View>
            </Theme>
          </View>
        </View>
      )}
    </AnimatePresence>
  );
}
