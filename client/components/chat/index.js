import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserChats,
  getAIResponse,
  selectConversationById,
  selectAllConversations,
} from "../../store/chatStore";
import { Box, VStack } from "native-base";
// import {CustomModal} from "../modal";
import { CustomModal } from "../modal";

const MessageBubble = ({ message }) => {
  const isAI = message.role === "ai";
  return (
    <View style={isAI ? styles.aiBubble : styles.userBubble}>
      <Text style={isAI ? styles.aiText : styles.userText}>
        {message.content}
      </Text>
    </View>
  );
};

const ChatSelector = ({ conversation, onSelect }) => (
  <TouchableOpacity
    key={conversation._id}
    onPress={() => onSelect(conversation._id)}
    style={styles.chatSelector}
  >
    <Text style={styles.chatSelectorText}>{conversation._id}</Text>
  </TouchableOpacity>
);

const ChatComponent = ({ showChatSelector = true, defaultChatId = null }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [conversationId, setConversationId] = useState(defaultChatId);
  const conversation = useSelector((state) =>
    selectConversationById(state, conversationId)
  );
  const conversations = useSelector((state) => selectAllConversations(state));

  const [userInput, setUserInput] = useState("");
  const [parsedMessages, setParsedMessages] = useState([]);

  useEffect(() => {
    dispatch(getUserChats(user._id));
  }, [dispatch, user._id, conversationId]);

  useEffect(() => {
    if (conversation) {
      setParsedMessages(parseConversationHistory(conversation.history));
    }
  }, [conversation]);

  const parseConversationHistory = (historyString) => {
    const historyArray = historyString.split("\n");
    const formattedHistory = historyArray.reduce(
      (accumulator, current, index) => {
        const isAI = current.startsWith("AI:");
        const content = isAI ? current.substring(3) : current;
        const role = isAI ? "ai" : "user";
        if (content) {
          accumulator.push({ role, content });
        }
        return accumulator;
      },
      []
    );
    return formattedHistory;
  };

  const handleSendMessage = async () => {
    await dispatch(
      getAIResponse({ userId: user._id, conversationId, userInput })
    );
    setUserInput("");
    dispatch(getUserChats(user._id));
  };

  return (
    <View style={styles.container}>
      <VStack space={2} alignItems="center">
        <Text style={styles.headerText}>Chat</Text>
        {showChatSelector && (
          <ScrollView horizontal>
            <Box
              borderRadius="lg"
              borderColor="coolGray.200"
              borderWidth={1}
              p={3}
            >
              <FlatList
                data={conversations}
                renderItem={({ item }) => (
                  <ChatSelector
                    conversation={item}
                    onSelect={setConversationId}
                  />
                )}
                keyExtractor={(item) => item._id}
              />
            </Box>
          </ScrollView>
        )}
      </VStack>
      <FlatList
        data={parsedMessages}
        renderItem={({ item }) => <MessageBubble message={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

export const ChatModalTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSendMessage = () => {
    // Call send message function from ChatComponent and clear userInput
    setIsOpen(false);
  };

  return (
    <Box style={styles.container}>
      <CustomModal
        title="Chat"
        trigger="Open Chat"
        isActive={isOpen}
        onTrigger={setIsOpen}
        onCancel={handleClose}
        buttonText="Send"
        onSave={handleSendMessage}
        footerButtons={[
          {
            label: "Send",
            color: "primary",
            disabled: !userInput,
            onClick: handleSendMessage,
          },
        ]}
      >
        <ChatComponent onClose={handleClose} />
      </CustomModal>
    </Box>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerText: { fontSize: 24, fontWeight: "bold" },
  flatList: { flexGrow: 1, justifyContent: "flex-end" },
  inputContainer: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  sendButton: {
    backgroundColor: "#3777f0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  sendText: { color: "white" },
  aiBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#3777f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  userBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  aiText: { color: "white" },
  userText: { color: "black" },
  chatSelector: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  chatSelectorText: { fontSize: 16 },
});

export default ChatModalTrigger;
