import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../constants/api";
import { getUserChats, getAIResponse, selectConversationById, selectAllConversations } from "../../store/chatStore";

const ChatComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const conversationId = "your_conversation_id";
  const conversation = useSelector((state) => selectConversationById(state, conversationId));
  const conversations= useSelector((state) => selectAllConversations(state));
  const loading = useSelector((state) => state.chat.loading);
  const error = useSelector((state) => state.chat.error);

  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    dispatch(getUserChats(user._id));
  }, []);

  const handleUserInput = (text) => {
    setUserInput(text);
  };

  const handleSendMessage = () => {
    dispatch(
      getAIResponse({
        userId: user._id,
        conversationId,
        userInput,
      })
    );
    setUserInput("");
  };

  const renderMessage = ({ item }) => {
    const bubbleStyle =
      item.role === "user"
        ? { alignSelf: "flex-start", backgroundColor: "#e0e0e0" }
        : { alignSelf: "flex-end", backgroundColor: "#3777f0" };

    const textStyle =
      item.role === "user" ? { color: "black" } : { color: "white" };

    return (
      <View
        style={{
          ...bubbleStyle,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          marginVertical: 4,
          marginHorizontal: 16,
        }}
      >
        <Text style={textStyle}>{item.content}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
        <Text>{JSON.stringify(conversations)}</Text>
      <FlatList
        data={conversation ? conversation.history : []}
        renderItem={renderMessage}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 8,
        }}
      >
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
          onChangeText={handleUserInput}
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
