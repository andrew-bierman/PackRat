import React, { useEffect, useState } from 'react';
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

  return messages.map((item) => (
    <ChatItem item={item} index={0} key={item.content} />
  ));
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
    <>
      {showMessage && (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: '100%',
            flexShrink: 1,
          }}
          gap="$2"
        >
          <Text fontSize="$3" fontWeight="$3" lineHeight="$3" width="100%">
            {item.content}
          </Text>
        </View>
      )}
    </>
  );
}
