import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { BaseModal, RStack, RSelect } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useChat } from 'app/hooks/chat/useChat';
import { loadStyles } from './chat.style';
// import { Select } from "tamagui";

interface Message {
  role: string;
  content: string;
}

interface Chat {
  _id: string;
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

const Chator: React.FC<ChatorProps> = ({
  conversation,
  on,
  isActive,
}) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <TouchableOpacity
      key={conversation._id}
      onPress={() => on(conversation._id)}
      style={[styles.chator, isActive && styles.activeChator]}
    >
      <Text style={styles.chatorText}>{conversation._id}</Text>
    </TouchableOpacity>
  );
};

const ChatComponent: React.FC<ChatComponentProps> = ({
  showChator = true,
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

  return (
    <View style={styles.container}>
      <RStack style={{ alignItems: 'center' }}>
        {showChator && (
          <RSelect
            selectedValue={conversationId}
            minWidth="200px" // Adjust width as needed
            accessibilityLabel="Select a conversation"
            placeholder="Select a conversation"
            onValueChange={(itemValue) => setConversationId(itemValue)}
            width="200px" // Adjust width as needed
          >
            {conversations?.map((conversation) => (
              <RSelect.Item
                key={conversation._id}
                label={conversation._id}
                value={conversation._id}
              />
            ))}
          </RSelect>
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
          //       keyExtractor={(item) => item._id}
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
      </RStack>
      <MessageList messages={parsedMessages} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setUserInput}
          value={userInput}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
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
