import { useState } from 'react';
import { useGetUserChats } from './useGetUserChats';
import { useGetAIResponse, useGetAISuggestions } from './useGetAIResponse';
import { useAuthUser } from 'app/modules/auth';
import { v4 as uuidv4 } from 'uuid';

interface Reasoning {
  role: 'user' | 'ai'; // Update role type
  content: string;
}

interface Suggestion {
  name: string;
  weight: number;
  unit: string;
  quantity: number;
  category: {
    id: string;
    name: string;
  };
  id: string;
  ownerId: string;
}

interface Suggestions {
  reasoning: Reasoning[];
  suggestion: Suggestion[];
}

interface TypeId {
  itemTypeId: string | null;
  type: string | null;
}

export const useChat = (itemTypeId: TypeId | null = null) => {
  const user = useAuthUser();

  console.log('user', user);
  const [typeId, setTypeId] = useState<TypeId | null>(itemTypeId);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestions>({
    reasoning: [],
    suggestion: [],
  });

  const [userInput, setUserInput] = useState('');

  const { data: chatsData, refetch } = useGetUserChats(
    user.id,
    typeId?.itemTypeId ?? '',
  );

  const { getAIResponse } = useGetAIResponse();
  const { getAISuggestions } = useGetAISuggestions();

  const conversations = chatsData?.conversations?.history || '';

  /**
   * Parses a conversation history string and returns an array of objects representing each message in the conversation.
   *
   * @param {string} historyString - The string containing the conversation history.
   * @return {Array} An array of objects representing each message in the conversation.
   */
  const parseConversationHistory = (conversation) => {
    if (!conversation) return [];
    const historyArray = conversation.split(/(AI:|User:)/);
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
  const parsedMessages = conversations
    ? parseConversationHistory(conversations)
    : [];

  //

  /**
   * @return {Promise<void>} This function returns nothing.
   */
  const handleSendMessage = async (userMessage) => {
    setIsLoading(true);
    setUserInput('');
    await getAIResponse({
      userId: user.id,
      userInput: userMessage,
      itemTypeId: typeId?.itemTypeId ?? '',
      type: typeId?.type ?? '',
    });
    await refetch();
    setIsLoading(false);
  };

  const handleSubmitAnalysis = async () => {
    try {
      setIsAnalysisLoading(true);
      const response: any = await getAISuggestions({
        userId: user.id,
        itemTypeId: typeId?.itemTypeId ?? '',
        type: typeId?.type ?? '',
      });

      setSuggestions({
        reasoning: [{ role: 'ai', content: response?.aiResponse }],
        suggestion: response?.refined?.Items.map((item) => {
          const modifiedItem = {
            ...item,
            ownerId: user.id, // Set ownerId
            packId: typeId?.itemTypeId ?? '',
            category: {
              id: uuidv4(),
              name: item.category,
            },
            id: uuidv4(),
          };
          return modifiedItem;
        }),
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalysisLoading(false);
    }
  };

  return {
    conversations,
    typeId,
    parsedMessages,
    userInput,
    isLoading,
    handleSendMessage,
    handleSubmitAnalysis,
    setUserInput,
    setTypeId,
    suggestions,
    isAnalysisLoading,
    setSuggestions,
  };
};
