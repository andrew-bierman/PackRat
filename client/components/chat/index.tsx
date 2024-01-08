import React, {  useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { RStack } from '@packrat/ui';
import { CustomModal } from '../modal';
import useCustomStyles from '~/hooks/useCustomStyles';
import { useChat } from '~/hooks/chat/useChat';
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
      conversations, conversationId, parsedMessages, userInput, handleSendMessage, setUserInput, setConversationId
  } = useChat({defaultChatId})

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
      <FlatList
        data={parsedMessages}
        renderItem={({ item }) => <MessageBubble message={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatList}
      />
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
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const styles = useCustomStyles(loadStyles);

  return (
    <View style={styles.container}>
      <CustomModal
        title="Chat"
        trigger="Open Chat"
        isActive={isOpen}
        onTrigger={setIsOpen}
        onCancel={handleClose}
      >
        <ChatComponent onClose={handleClose} />
      </CustomModal>
    </View>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    container: { flex: 1, padding: 16 },
    headerText: { fontSize: 24, fontWeight: 'bold' },
    flatList: { flexGrow: 1, justifyContent: 'flex-end' },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    input: {
      flex: 1,
      height: 40,
      borderColor: currentTheme.colors.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
    },
    sendButton: {
      backgroundColor: currentTheme.colors.background,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      marginLeft: 8,
    },
    sendText: { color: currentTheme.colors.white },
    aiBubble: {
      alignSelf: 'flex-start',
      backgroundColor: currentTheme.colors.primary,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginVertical: 4,
      marginHorizontal: 16,
    },
    userBubble: {
      alignSelf: 'flex-end',
      backgroundColor: '#e0e0e0',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginVertical: 4,
      marginHorizontal: 16,
    },
    aiText: { color: currentTheme.colors.white },
    userText: { color: 'black' },
    chatSelector: {
      backgroundColor: '#e0e0e0',
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
    },
    chatSelectorText: { fontSize: 16 },
    chatSelectorContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    newChatButton: {
      backgroundColor: currentTheme.colors.background,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      marginLeft: 8,
    },
    newChatButtonText: {
      color: currentTheme.colors.white,
    },
  };
};

export default ChatModalTrigger;
