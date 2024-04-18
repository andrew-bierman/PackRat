import { useEffect, useState } from 'react';
import { useGetUserChats } from './useGetUserChats';
import { useGetAIResponse } from './useGetAIResponse';
import { useAuthUser } from 'app/auth/hooks';

export const useChat = (itemTypeId = null) => {
  const user = useAuthUser();
  const [typeId, setTypeId] = useState(itemTypeId);

  const [userInput, setUserInput] = useState('');
  // const [parsedMessages, setParsedMessages] = useState([]);

  const { data: chatsData, refetch } = useGetUserChats(
    user.id,
    typeId.itemTypeId,
  );

  // console.log('chatsData:', chatsData.conversations);

  const { getAIResponse } = useGetAIResponse();

  const conversations = chatsData?.conversations;

  /**
   * Parses a conversation history string and returns an array of objects representing each message in the conversation.
   *
   * @param {string} historyString - The string containing the conversation history.
   * @return {Array} An array of objects representing each message in the conversation.
   */
  const parseConversationHistory = (conversation) => {
    if (!conversation) return [];
    const historyArray = conversation.history.split(/(AI:|User:)/);
    return historyArray.reduce((accumulator, current, index) => {
      if (index % 2 === 0) return accumulator; // Skip the empty strings from split
      const isAI = current === 'AI:';
      const content = historyArray[index + 1]; // Content is the next item
      const role = isAI ? 'ai' : 'user';
      if (content.trim()) {
        // Check if content is not just whitespace
        accumulator.push({ role, content: content.trim() });
      }
      return accumulator;
    }, []);
  };

  // const conversation = conversations?.find(
  //   (chat) => chat._id === conversationId,
  // );

  // useEffect(() => {
  //   console.log('conversation:', conversation);
  //   setParsedMessages(
  //     conversation ? parseConversationHistory(conversation.history) : [],
  //   );
  // }, [conversationId]);

  // console.log('parsedMessages:', parsedMessages);/

  // Compute parsedMessages directly
  const parsedMessages = conversations
    ? parseConversationHistory(conversations)
    : [];

  // console.log('parsedMessages:', parsedMessages);

  /**
   * Handles sending a message.
   *
   * @return {Promise<void>} This function returns nothing.
   */
  const handleSendMessage = async (userMessage) => {
    await getAIResponse({
      userId: user.id,
      userInput: userMessage,
      itemTypeId: typeId.itemTypeId,
    });
    refetch();
    setUserInput('');
  };

  return {
    conversations,
    typeId,
    parsedMessages,
    userInput,
    handleSendMessage,
    setUserInput,
    setTypeId,
  };
};
