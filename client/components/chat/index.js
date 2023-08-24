import React, { useEffect, useState, useRef } from "react";
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
import { Box, VStack, HStack } from "native-base";
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

const ChatSelector = ({ conversation, onSelect, isActive }) => (
  <TouchableOpacity
    key={conversation._id}
    onPress={() => onSelect(conversation._id)}
    style={[styles.chatSelector, isActive && styles.activeChatSelector]}
  >
    <Text style={styles.chatSelectorText}>{conversation._id}</Text>
  </TouchableOpacity>
);

const ChatComponent = ({
  showChatSelector = true,
  defaultChatId = null,
  scrollViewRef,
  scrolltoBottom,
  setIsButtonClicked,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [conversationId, setConversationId] = useState(defaultChatId);
  const conversation = useSelector((state) =>
    selectConversationById(state, conversationId)
  );
  const conversations = useSelector((state) => selectAllConversations(state));
  const [userInput, setUserInput] = useState("");
  const [parsedMessages, setParsedMessages] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    dispatch(getUserChats(user._id));
  }, [dispatch, user._id, conversationId]);

  useEffect(() => {
    if (conversation) {
      setParsedMessages(parseConversationHistory(conversation.history));
    }
  }, [conversation]);

  const handleChatSelection = (id) => {
    setConversationId(id);
    // setShowHistory(false);
    // scrolltoBottom();
    setIsButtonClicked(true);
  };

  const parseConversationHistory = (historyString) => {
    const historyArray = historyString.split("\n");
    return historyArray.reduce((accumulator, current) => {
      const isAI = current.startsWith("AI:");
      const content = isAI ? current.substring(3) : current;
      const role = isAI ? "ai" : "user";
      if (content) {
        accumulator.push({ role, content });
      }
      return accumulator;
    }, []);
  };

  const handleSendMessage = async () => {
    await dispatch(
      getAIResponse({ userId: user._id, conversationId, userInput })
    );
    setUserInput("");
    dispatch(getUserChats(user._id));
  };

  return (
    // <View style={[styles.container, { backgroundColor: "blue" }]}>
    <View style={[styles.container]}>
      {/* <VStack space={2} alignItems="stretch" backgroundColor={"purple.900"}> */}
      <VStack space={2} alignItems="stretch">
        {showChatSelector && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            // style={{ backgroundColor: "red" }}
            contentContainerStyle={{ width: "100%" }}
          >
            <Box
              borderRadius="lg"
              borderColor="coolGray.200"
              borderWidth={1}
              p={3}
              style={{ width: "100%" }}
              // display={"none"}
            >
              <TouchableOpacity
                style={[
                  styles.newChatButton,
                  { marginLeft: 0, paddingVertical: 12 },
                ]}
                onPress={() => {
                  setShowHistory((prev) => !prev);
                }}
              >
                <Text style={styles.newChatButtonText}>
                  {showHistory ? "Close" : "Open"} Chat History
                </Text>
              </TouchableOpacity>
              {showHistory && (
                <FlatList
                  data={conversations}
                  renderItem={({ item }) => (
                    <ChatSelector
                      conversation={item}
                      onSelect={handleChatSelection}
                    />
                  )}
                  keyExtractor={(item) => item._id}
                  contentContainerStyle={[
                    styles.flatList,
                    // { position: "absolute", top: 0 },
                  ]}
                />
              )}
              <TouchableOpacity
                style={[
                  styles.newChatButton,
                  { marginLeft: 0, paddingVertical: 12, marginTop: 10 },
                ]}
                onPress={() => {
                  setConversationId(null);
                  setParsedMessages([]);
                  setShowHistory(false);
                  // scrolltoBottom();
                }}
              >
                <Text style={styles.newChatButtonText}>New Chat</Text>
              </TouchableOpacity>
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const scrollViewRef = useRef(null);

  // This function is capable of scrolling the chat to the bottom on layout
  const scrolltoBottom = () => {
    if (!isButtonClicked) return;
    console.log("Scroll to bottom called");
    console.log(scrollViewRef.current);
    if (scrollViewRef.current.scrollToEnd) {
      return scrollViewRef.current?.scrollToEnd({ animated: true });
    }
    let closestEl = scrollViewRef.current.closest("[class*=r-transform]");
    console.log(closestEl);
    let visibleHeight = closestEl?.getBoundingClientRect().height;
    let scrollHeight = closestEl?.scrollHeight;
    closestEl?.scrollTo({
      x: 0,
      y: scrollHeight - visibleHeight,
      animated: true,
    });
    setIsButtonClicked(false);
  };

  const handleClose = () => {
    document.body.style.overflow = "auto";
    // document.documentElement.scrollBy(0, 200);
    // document.documentElement.scroll(0, 200);
    document.documentElement.scrollTo(0, scrollPosition);
    setScrollPosition(0);
    setIsOpen(false);
  };

  const handleTrigger = (data) => {
    console.log("Triggered");
    setScrollPosition(document.documentElement.scrollTop);
    // document.documentElement.scrollTop = 0;
    document.documentElement.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    setIsOpen(data);
  };

  return (
    <Box style={styles.container}>
      <CustomModal
        title="Chat"
        trigger="Open Chat"
        isActive={isOpen}
        // onTrigger={setIsOpen}
        onTrigger={handleTrigger}
        onCancel={handleClose}
        style={{ height: "100dvh" }}
        bodyRef={scrollViewRef}
        onLayout={scrolltoBottom}
      >
        <ChatComponent
          onClose={handleClose}
          scrollViewRef={scrollViewRef}
          scrolltoBottom={scrolltoBottom}
          setIsButtonClicked={setIsButtonClicked}
        />
      </CustomModal>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerText: { fontSize: 24, fontWeight: "bold" },
  flatList: {
    flexGrow: 1,
    justifyContent: "flex-end",
    // backgroundColor: "green",
    width: "100%",
  },
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
    alignSelf: "flex-start",
    backgroundColor: "blue",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  userBubble: {
    alignSelf: "flex-end",
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
  chatSelectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  newChatButton: {
    backgroundColor: "#3777f0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  newChatButtonText: {
    color: "white",
  },
});

export default ChatModalTrigger;
