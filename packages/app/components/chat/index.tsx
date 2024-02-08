import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import useTheme from '../../hooks/useTheme';
import { BaseModal, RStack } from '@packrat/ui';
// import {
//   getUserChats,
//   getAIResponse,
//   selectConversationById,
//   selectAllConversations,
// } from '../../store/chatStore';
import { Box, VStack, HStack, Select } from 'native-base';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useChat } from 'app/hooks/chat/useChat';
import { loadStyles } from './chatStyles';
// import { Select } from "tamagui";

const MessageBubble = ({ message }) => {
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

const ChatSelector = ({ conversation, onSelect, isActive }) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <TouchableOpacity
      key={conversation._id}
      onPress={() => onSelect(conversation._id)}
      style={[styles.chatSelector, isActive && styles.activeChatSelector]}
    >
      <Text style={styles.chatSelectorText}>{conversation._id}</Text>
    </TouchableOpacity>
  );
};

const ChatComponent = ({ showChatSelector = true, defaultChatId = null }) => {
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
        {showChatSelector && (
          <Select
            selectedValue={conversationId}
            minWidth="200px" // Adjust width as needed
            accessibilityLabel="Select a conversation"
            placeholder="Select a conversation"
            onValueChange={(itemValue) => setConversationId(itemValue)}
            width="200px" // Adjust width as needed
          >
            {conversations?.map((conversation) => (
              <Select.Item
                key={conversation._id}
                label={conversation._id}
                value={conversation._id}
              />
            ))}
          </Select>
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

const ChatModalTrigger = () => {
  const styles = useCustomStyles(loadStyles);

  return (
    <View style={styles.container}>
      <BaseModal title="Chat" trigger="Open Chat">
        <ChatComponent />
      </BaseModal>
    </View>
  );
};

export default ChatModalTrigger;
