import { useState } from 'react';
import { useGetUserChats } from './useGetUserChats';
import { useGetAIResponse } from './useGetAIResponse';
import { useAuthUser } from 'app/auth/hooks';

export const useChat = (defaultChatId = null) => {
  const user = useAuthUser();
  const [conversationId, setConversationId] = useState(defaultChatId);
  const [userInput, setUserInput] = useState('');
  // const [parsedMessages, setParsedMessages] = useState([]);

  const { data: chatsData, refetch } = useGetUserChats(user.id);

  const { getAIResponse } = useGetAIResponse();

  const conversations = chatsData?.conversations;

  /**
   * Parses a conversation history string and returns an array of objects representing each message in the conversation.
   *
   * @param {string} historyString - The string containing the conversation history.
   * @return {Array} An array of objects representing each message in the conversation.
   */
  const parseConversationHistory = (historyString) => {
    const historyArray = historyString.split('\n');
    return historyArray.reduce((accumulator, current) => {
      const isAI = current.startsWith('AI:');
      const content = isAI ? current.substring(3) : current;
      const role = isAI ? 'ai' : 'user';
      if (content) {
        accumulator.push({ role, content });
      }
      return accumulator;
    }, []);
  };

  const conversation = conversations?.find(
    (chat) => chat.id === conversationId,
  );

  // Compute parsedMessages directly
  const parsedMessages = conversation
    ? parseConversationHistory(conversation.history)
    : [];

  console.log('parsedMessages:', parsedMessages);

  /**
   * Handles sending a message.
   *
   * @return {Promise<void>} This function returns nothing.
   */
  const handleSendMessage = async () => {
    await getAIResponse({ userId: user.id, conversationId, userInput });
    refetch();
    setUserInput('');
  };

  return {
    conversations,
    conversationId,
    parsedMessages,
    userInput,
    handleSendMessage,
    setUserInput,
    setConversationId,
  };
};
