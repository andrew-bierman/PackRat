import { useSelector } from '../redux/useSelector';
import { useState } from 'react';
import { useGetUserChats } from './useGetUserChats';
import { useGetAIResponse } from './useGetAIResponse';
import { RootState } from 'store/store';

export const useChat = (defaultChatId = null) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [conversationId, setConversationId] = useState(defaultChatId);

  const [userInput, setUserInput] = useState('');

  const { data: chatsData, refetch } = useGetUserChats(user._id);

  const { getAIResponse } = useGetAIResponse();

  const conversations = chatsData?.conversations;

  /**
   * Parses a conversation history string and returns an array of objects representing each message in the conversation.
   *
   * @param {string} historyString - The string containing the conversation history.
   * @return {Array} An array of objects representing each message in the conversation.
   */
  const parseConversationHistory = (historyString: string) => {
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
    (chat) => chat._id === conversationId,
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
    await getAIResponse({ userId: user._id, conversationId, userInput });
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
