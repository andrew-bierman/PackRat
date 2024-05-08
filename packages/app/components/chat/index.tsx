import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  BaseModal,
  Form,
  FormInput,
  FormSelect,
  RStack,
  SubmitButton,
} from '@packrat/ui';
import { sendMessage } from '@packrat/validations';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useChat } from 'app/hooks/chat/useChat';
import { loadStyles } from './chat.style';
import { Box } from 'native-base';
// import { Select } from "tamagui";

// TODO check if we've fixed the chat screen on another branch
// link: https://github.com/andrew-bierman/PackRat/issues/ ???

interface Message {
  role: string;
  content: string;
}

interface Chat {
  id: string;
}

interface MessageBubbleProps {
  message: Message;
}

interface ChatSelectorProps {
  conversation: Chat;
  onSelect: (id: string) => void;
  isActive: boolean;
}

interface ChatComponentProps {
  showChatSelector?: boolean;
  defaultChatId?: string | null;
  itemTypeId?: string | null;
}

interface ChatModalTriggerProps {
  title: string;
  trigger: string;
  itemTypeId: string | null;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const styles = useCustomStyles(loadStyles);
  const isAI = message.role === 'ai';
  return (
    <View style={isAI ? styles.aiBubble : styles.userBubble}>
      <Text style={isAI ? styles.aiText : styles.userText}>
        {message.content}
      </Text>
    </View>
  );
};

interface MessageListProps {
  messages: any[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <MessageBubble message={item} />}
      keyExtractor={(item, index) => index.toString()}
      style={{ maxWidth: 500, maxHeight: 500, flex: 1 }}
    />
  );
};

// const ChatSelector: React.FC<ChatSelectorProps> = ({
//   conversation,
//   onSelect,
//   isActive,
// }) => {
//   const styles = useCustomStyles(loadStyles);
//   return (
//     <TouchableOpacity
//       key={conversation._id}
//       onPress={() => onSelect(conversation._id)}
//       style={[styles.chator, isActive && styles.activeChator]}
//     >
//       <Text style={styles.chatorText}>{conversation._id}</Text>
//     </TouchableOpacity>
//   );
// };

const ChatComponent: React.FC<ChatComponentProps> = ({
  showChatSelector = true,
  defaultChatId = null,
  itemTypeId = null,
}) => {
  const styles = useCustomStyles(loadStyles);
  const {
    conversations,
    typeId,
    parsedMessages,
    userInput,
    handleSendMessage,
    setUserInput,
    setTypeId,
  } = useChat({ itemTypeId });

  return (
    <View style={styles.container}>
      <RStack style={{ alignItems: 'center' }}>
        {showChatSelector && (
          <>
            {!parsedMessages?.length && (
              <Text>You don't have conversations yet</Text>
            )}
          </>
        )}
        <ScrollView style={{ maxWidth: 500, maxHeight: 500 }}>
          <MessageList messages={parsedMessages} />
        </ScrollView>
        <Form
        // validationSchema={sendMessage}
        >
          <RStack style={{ marginTop: 16, gap: 8 }}>
            <FormInput
              name="message"
              placeholder="Type a message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onChangeText={(text) => setUserInput(text)}
            />
            <SubmitButton onSubmit={handleSendMessage}>
              <Text style={styles.sendText}>Send</Text>
            </SubmitButton>
          </RStack>
        </Form>
      </RStack>
    </View>
  );
};

const ChatModalTrigger: React.FC<ChatModalTriggerProps> = ({ itemTypeId }) => {
  const styles = useCustomStyles(loadStyles);

  return (
    <View style={styles.container}>
      <BaseModal title="Chat" trigger="Open Chat" footerComponent={undefined}>
        <ChatComponent itemTypeId={itemTypeId} />
      </BaseModal>
    </View>
  );
};

export default ChatModalTrigger;
