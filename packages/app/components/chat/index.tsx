import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
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
// import { Select } from "tamagui";

// TODO check if we fixed chat screen on another branch

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
}

interface ChatModalTriggerProps {
  title: string;
  trigger: string;
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
    />
  );
};

const Chator: React.FC<ChatSelectorProps> = ({
  conversation,
  onSelect,
  isActive,
}) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <TouchableOpacity
      key={conversation.id}
      onPress={() => onSelect(conversation.id)}
      style={[styles.chator, isActive && styles.activeChator]}
    >
      <Text style={styles.chatorText}>{conversation.id}</Text>
    </TouchableOpacity>
  );
};

const ChatComponent: React.FC<ChatComponentProps> = ({
  showChatSelector = true,
  defaultChatId = null,
}) => {
  const styles = useCustomStyles(loadStyles);
  const {
    conversations,
    conversationId,
    parsedMessages,
    userInput,
    handleSendMessage,
    setUserInput,
    setConversationId,
  } = useChat({ defaultChatId });

  const options = Array.isArray(conversations)
    ? conversations.map((conversation) => conversation.id)
    : [];

  console.log(options);

  return (
    <View style={styles.container}>
      <RStack style={{ alignItems: 'center' }}>
        {showChatSelector && (
          <Form>
            <>
              {options?.length ? (
                <>
                  <FormSelect
                    options={options}
                    style={{ width: '100%' }}
                    placeholder="Select conversation ..."
                    name="conversation"
                  />
                </>
              ) : (
                <Text>You don't have conversations yet</Text>
              )}
            </>
          </Form>
          // <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          //   <Box
          //     borderRadius="lg"
          //     borderColor="coolGray.200"
          //     borderWidth={1}
          //     p={3}
          //   >
          //     <FlatList
          //       data={conversations}
          //       renderItem={({ item }) => (
          //         <ChatSelector
          //           conversation={item}
          //           onSelect={setConversationId}
          //         />
          //       )}
          //       keyExtractor={(item) => item.id}
          //       contentContainerStyle={styles.flatList}
          //     />
          //     <TouchableOpacity
          //       style={styles.newChatButton}
          //       onPress={() => {
          //         setConversationId(null);
          //         setParsedMessages([]);
          //       }}
          //     >
          //       <Text style={styles.newChatButtonText}>New Chat</Text>
          //     </TouchableOpacity>
          //   </Box>
          // </ScrollView>
        )}
        <MessageList messages={parsedMessages} />
        <Form validationSchema={sendMessage}>
          <RStack style={{ marginTop: 16, gap: 8 }}>
            <FormInput name="message" placeholder="Type a message..." />
            <SubmitButton onSubmit={handleSendMessage}>
              <Text style={styles.sendText}>Send</Text>
            </SubmitButton>
          </RStack>
        </Form>
      </RStack>
    </View>
  );
};

const ChatModalTrigger: React.FC<ChatModalTriggerProps> = () => {
  const styles = useCustomStyles(loadStyles);

  return (
    <View style={styles.container}>
      <BaseModal title="Chat" trigger="Open Chat" footerComponent={undefined}>
        <ChatComponent />
      </BaseModal>
    </View>
  );
};

export default ChatModalTrigger;
