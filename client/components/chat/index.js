import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserChats,
  getAIResponse,
  selectConversationById,
  selectAllConversations,
} from "../../store/chatStore";
import { HStack, VStack } from "native-base";

const ChatComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [conversationId, setConversationId] = useState(null);
  const conversation = useSelector((state) => selectConversationById(state, conversationId));
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
    const formattedHistory = historyArray.reduce((accumulator, current, index) => {
      const isAI = current.startsWith("AI:");
      const content = isAI ? current.substring(3) : current;
      const role = isAI ? "ai" : "user";
      if (content) {
        accumulator.push({ role, content });
      }
      return accumulator;
    }, []);
    return formattedHistory;
  };

  const handleSendMessage = async () => {
    await dispatch(getAIResponse({ userId: user._id, conversationId, userInput }));
    setUserInput("");
    dispatch(getUserChats(user._id));
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === "user";
    const bubbleStyle = {
      alignSelf: isUser ? "flex-start" : "flex-end",
      backgroundColor: isUser ? "#e0e0e0" : "#3777f0",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginVertical: 4,
      marginHorizontal: 16,
    };
    const textStyle = { color: isUser ? "black" : "white" };

    return (
      <View style={bubbleStyle}>
        <Text style={textStyle}>{item.content}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <VStack justifyContent="center" alignItems="center">
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Chat</Text>
        {conversations.map((conversation) => (
          <TouchableOpacity key={conversation._id} onPress={() => setConversationId(conversation._id)}>
            <Text>{conversation._id}</Text>
          </TouchableOpacity>
        ))}
      </VStack>
      <FlatList
        data={parsedMessages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
      />
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
          }}
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#3777f0",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            marginLeft: 8,
          }}
          onPress={handleSendMessage}
          disabled={!userInput}
        >
          <Text style={{ color: "white" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatComponent;
