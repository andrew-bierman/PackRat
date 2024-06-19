import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { RButton, RImage, RInput, RStack } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useChat } from 'app/hooks/chat/useChat';
import { loadStyles } from './chat.style';
import {
  ChatList,
  SuggestionDescription,
  SuggestionList,
} from '@packrat/ui/src/Bento/elements/list';
import { X } from '@tamagui/lucide-icons';
import { MessageCircle, Camera, Settings, Home } from 'lucide-react-native';
import { ActionItem } from './ActionItem';

interface ChatComponentProps {
  showChatSelector?: boolean;
  defaultChatId?: string | null;
  itemTypeId?: string | null;
  type?: string | null;
}

interface ChatModalTriggerProps {
  title: string;
  trigger: string;
  itemTypeId: string | null;
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
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={handleLayout}
          style={{ maxHeight: 620, width: '100%', borderRadius: 10 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        >
          <ChatList data={messages} />
        </ScrollView>
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
            onClick={() => {
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
      <RStack style={{ flex: 1 }}>
        <ScrollView
          onContentSizeChange={handleLayout}
          style={{ maxHeight: 620, width: '100%', borderRadius: 10 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        >
          <SuggestionDescription data={suggestions.reasoning} />
          <SuggestionList
            suggestion={suggestions.suggestion}
            onAddItem={removeItem}
          />
        </ScrollView>
        <RStack
          style={{
            marginTop: 10,
            gap: 8,
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <RButton
            onClick={() => {
              // console.log(groupItemsByCategory(suggestion));
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

  return (
    <View
      style={
        (styles.container,
        {
          position: 'fixed',
          right: 250,
          bottom: 30,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        })
      }
    >
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          if (isChatOpen || isSuggestionsOpen) {
            setIsItemOpen(false);
            setIsChatOpen(false);
            setIsSuggestionsOpen(false);
          } else {
            setIsItemOpen(!isItemOpen);
          }
        }}
      >
        <RImage
          source={{
            // TODO: Update this to use the intended chat logo
            uri: 'https://raw.githubusercontent.com/andrew-bierman/PackRat/4ad449702c088e505c4b484219121d365150f971/packages/app/assets/chat-svgrepo-com%20(1).svg',
            width: 50,
            height: 50,
          }}
          width={40}
          height={40}
          style={{
            ...styles.logo,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.75,
            shadowRadius: 1.24,
            elevation: 3,
          }}
          alt="PackRat Logo"
        />
      </TouchableOpacity>
      {isItemOpen && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 60,
            right: 5,
            width: 308,
            backgroundColor: '#000',
            borderRadius: 10,
            padding: 4,
            zIndex: 1000,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
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
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 60,
            right: 5,
            width: 450,
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 4,
            zIndex: 1000,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
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
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 60,
            right: 5,
            width: 450,
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 4,
            zIndex: 1000,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
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
