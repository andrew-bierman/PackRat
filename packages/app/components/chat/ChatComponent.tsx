import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RIconButton, RInput, RStack } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { ChatList } from '@packrat/ui/src/Bento/elements/list';
import { useChat } from 'app/hooks/chat/useChat';
import { loadStyles } from './chat.style';
import useTheme from 'app/hooks/useTheme';
import useResponsive from 'app/hooks/useResponsive';
import { SendHorizontal } from '@tamagui/lucide-icons';

interface ChatComponentProps {
  showChatSelector?: boolean;
  defaultChatId?: string | null;
  itemTypeId?: string | null;
  type?: string | null;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  showChatSelector = true,
  defaultChatId = null,
  itemTypeId = null,
  type = null,
}) => {
  const styles = useCustomStyles(loadStyles);
  const { currentTheme } = useTheme();
  const { xxs } = useResponsive();

  const {
    parsedMessages,
    userInput,
    handleSendMessage,
    setUserInput,
    isLoading,
  } = useChat({ itemTypeId, type });
  const isSendDisabled = !userInput || isLoading;

  const [messages, setMessages] = useState(parsedMessages);

  useEffect(() => {
    if (parsedMessages.length > messages.length) {
      setMessages(parsedMessages);
    }
  }, [parsedMessages]);

  const scrollViewRef = useRef<ScrollView>(null);

  const handleLayout = () => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  };

  return (
    <RStack
      style={{
        flex: 1,
        backgroundColor: currentTheme.colors.background,
        justifyContent: 'space-between',
        padding: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            width: '100%',
            borderRadius: 10,
          }}
        >
          {!messages?.length && (
            <Text style={{ width: 500, color: currentTheme.colors.text }}>
              You don't have conversations yet
            </Text>
          )}
          <ChatList data={messages} />
        </ScrollView>
      </View>
      <RStack
        style={{
          marginTop: 10,
          gap: 8,
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <RInput
          placeholder="Type a message..."
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
          style={{ flex: 1 }}
        />
        <RIconButton
          icon={<SendHorizontal />}
          disabled={isSendDisabled}
          onPress={() => {
            setMessages((prevMessages) => [
              ...prevMessages,
              { role: 'user', content: userInput },
            ]);
            handleSendMessage({ message: userInput });
          }}
          style={{ width: 80, opacity: isSendDisabled ? 0.5 : 1 }}
        />
      </RStack>
    </RStack>
  );
};

export default ChatComponent;
