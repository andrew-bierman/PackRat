import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import { RButton, RIconButton, RImage, RInput, RStack } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useChat } from 'app/hooks/chat/useChat';
import { loadStyles } from './chat.style';
import { ChatList } from '@packrat/ui/src/Bento/elements/list';
import { X } from '@tamagui/lucide-icons';
import { MessageCircle, Camera, Settings, Home } from 'lucide-react-native';
import { ActionItem } from './ActionItem';
import { Ionicons } from '@expo/vector-icons';
import {
  SuggestionDescription,
  SuggestionList,
} from '../../components/Suggestion';
import useTheme from 'app/hooks/useTheme';

interface ChatComponentProps {
  showChatSelector?: boolean;
  defaultChatId?: string | null;
  itemTypeId?: string | null;
  type?: string | null;
}

interface ChatModalTriggerProps {
  title: string;
  trigger: string;
  itemTypeId: string | undefined | null;
  type: string;
}

const actionItems = [
  {
    icon: MessageCircle,
    color: 'orange',
    title: 'Message',
    description: 'Interact with our AI-powered chatbot.',
    type: 'chat',
  },
  {
    icon: Settings,
    color: 'teal',
    title: 'Suggestions',
    description: 'See how you can improve your pack.',
    type: 'suggestion',
  },
];

const ChatComponent: React.FC<ChatComponentProps> = ({
  showChatSelector = true,
  defaultChatId = null,
  itemTypeId = null,
  type = null,
}) => {
  const styles = useCustomStyles(loadStyles);
  const {
    parsedMessages,
    userInput,
    handleSendMessage,
    setUserInput,
    isLoading,
  } = useChat({ itemTypeId, type });

  const [messages, setMessages] = useState(parsedMessages);

  useEffect(() => {
    if (parsedMessages.length > messages.length) {
      setMessages(parsedMessages);
    }
  }, [parsedMessages]);

  const scrollViewRef = useRef<ScrollView>(null);

  const handleLayout = () => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  };

  return (
    <View>
      <RStack style={{ flex: 1 }}>
        {showChatSelector && (
          <>
            {!messages?.length && (
              <Text style={{ width: '100%', textAlign: 'center', padding: 8 }}>
                You don't have conversations yet
              </Text>
            )}
          </>
        )}
        <View style={{ maxHeight: 450, width: '100%', borderRadius: 10 }}>
          <ChatList data={messages} />
        </View>
        <RStack
          style={{
            marginTop: 10,
            gap: 8,
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <RInput
            placeholder="Type a message..."
            value={userInput}
            onChangeText={(text) => setUserInput(text)}
            style={{ flex: 1 }}
          />
          <RButton
            disabled={!userInput}
            onPress={() => {
              setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'user', content: userInput },
              ]);
              handleSendMessage({ message: userInput });
            }}
            style={{ width: 80 }}
          >
            <Text style={styles.sendText}>
              {isLoading ? 'Loading...' : 'Send'}
            </Text>
          </RButton>
        </RStack>
      </RStack>
    </View>
  );
};

const SuggestionComponent = ({ itemTypeId = null, type = null }) => {
  const [dots, setDots] = useState('.');
  const {
    handleSubmitAnalysis,
    suggestions,
    isAnalysisLoading,
    setSuggestions,
  } = useChat({
    itemTypeId,
    type,
  });

  useEffect(() => {
    console.log(suggestions);
  }, [suggestions]);

  useEffect(() => {
    if (isAnalysisLoading) {
      const interval = setInterval(() => {
        setDots((dots) => (dots.length < 3 ? dots + '.' : '.'));
      }, 500); // Change dots every 500ms
      return () => clearInterval(interval); // Clean up on component unmount
    }
  }, [isAnalysisLoading]);

  const styles = useCustomStyles(loadStyles);

  const scrollViewRef = useRef<ScrollView>(null);

  const handleLayout = () => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  };

  const removeItem = (id) => {
    console.log('remove item', id);
    setSuggestions((prevSuggestion) => {
      if (
        prevSuggestion &&
        prevSuggestion.suggestion &&
        prevSuggestion.suggestion.Items
      ) {
        return {
          ...prevSuggestion,
          suggestion: {
            Items: prevSuggestion.suggestion.Items.filter(
              (item) => String(item.id) !== String(id),
            ),
          },
        };
      } else {
        return prevSuggestion;
      }
    });
  };

  return (
    <View>
      <RStack>
        {!suggestions.suggestion.Items ? (
          <Text style={{ width: 500 }}>
            Allow me to analyze your pack and help!
          </Text>
        ) : (
          <View style={{ maxHeight: 450, width: '100%', borderRadius: 10 }}>
            <SuggestionDescription data={suggestions.reasoning} />
            <SuggestionList
              suggestion={suggestions.suggestion}
              onAddItem={removeItem}
            />
          </View>
        )}
        <RStack
          style={{
            marginTop: 10,
            gap: 8,
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <RButton
            onPress={() => {
              handleSubmitAnalysis();
            }}
            disabled={isAnalysisLoading}
            style={{ width: '100%' }}
          >
            <Text style={styles.sendText}>
              {isAnalysisLoading ? 'Loading' + dots : 'Analyze'}
            </Text>
          </RButton>
        </RStack>
      </RStack>
    </View>
  );
};

const ChatModalTrigger: React.FC<ChatModalTriggerProps> = ({
  itemTypeId,
  type,
}) => {
  const styles = useCustomStyles(loadStyles);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isChatOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isChatOpen]);
  const { currentTheme } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={{
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <RIconButton
          backgroundColor="transparent"
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
          }}
          icon={
            <Ionicons
              name="chatbubble-ellipses-sharp"
              size={50}
              color={currentTheme.colors.iconColor}
            />
          }
          onPress={() => {
            if (isChatOpen || isSuggestionsOpen) {
              setIsItemOpen(false);
              setIsChatOpen(false);
              setIsSuggestionsOpen(false);
            } else {
              setIsItemOpen(!isItemOpen);
            }
          }}
        />
      </View>

      {isItemOpen && (
        <Animated.View style={{ ...styles.animatedView, width: 308 }}>
          <View style={{ width: 300 }}>
            {actionItems.map((item, index) => {
              const { icon, color, title, description, type } = item;
              return (
                <ActionItem
                  key={index}
                  icon={icon}
                  color={color}
                  title={title}
                  type={type}
                  description={description}
                  setIsChatOpen={setIsChatOpen}
                  setIsItemOpen={setIsItemOpen}
                  setIsSuggestionOpen={setIsSuggestionsOpen}
                />
              );
            })}
          </View>
        </Animated.View>
      )}
      {isChatOpen && (
        <Animated.View style={{ ...styles.animatedView, width: 450 }}>
          <RButton
            position="absolute"
            backgroundColor="$background"
            color="$color"
            top="$2"
            right="$2"
            size="$2"
            circular
            icon={X}
            onPress={() => setIsChatOpen(false)}
            style={{ zIndex: 1001 }}
          />
          <ChatComponent itemTypeId={itemTypeId} type={type} />
        </Animated.View>
      )}
      {isSuggestionsOpen && (
        <Animated.View style={styles.animatedView}>
          <RButton
            position="absolute"
            backgroundColor="$background"
            color="$color"
            top="$2"
            right="$2"
            size="$2"
            circular
            icon={X}
            onPress={() => setIsSuggestionsOpen(false)}
            style={{ zIndex: 1001 }}
          />
          <SuggestionComponent itemTypeId={itemTypeId} type={type} />
        </Animated.View>
      )}
    </View>
  );
};

export default ChatModalTrigger;
