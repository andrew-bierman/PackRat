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
import { BasicTable } from '@packrat/ui/src/Bento/elements/tables';

const chatteer = [
  {
    role: 'ai',
    content: `Based on the details of your pack titled qwerty, there are some optimizations and essential items that can be added to improve safety, comfort, and efficiency while reducing excessive weight:

1. Water (12oz, 12 pcs, category: Water):
    - While it's essential to stay hydrated, carrying 12 bottles at 12oz each might be excessive weight-wise. Consider replacing some bottles with a hydration reservoir or collapsible water bottles to save weight.
    - Add a lightweight water purification method like a purification straw or portable water filter to ensure access to clean water along the way.

2. Chocolate (123oz, 213 pcs, category: Food):
    - While chocolate can be a tasty treat, consider opting for trail-friendly snacks that are more lightweight and provide sustained energy such as energy bars, dried fruits, or nuts.
    - Include trail mix or energy bars in your pack for quick and easy snacks while hiking.

3. Jacket (4kg, 23 pcs, category: Essentials):
    - Carrying a 4kg jacket is quite heavy and may not be suitable for hiking. Consider replacing it with a lightweight and packable waterproof jacket for weather protection. 
    - Essential clothing items like quick-dry layers, extra socks, and a hat can provide more versatility and comfort without the excessive weight.

New Item Suggestions:
- Lightweight backpacking stove and dehydrated meals for quick and easy hot meals on the trail.
- Compact first aid kit with essential supplies for emergencies.
- Multi-tool with knife for various tasks while hiking.

Suggested and Improved Pack for qwerty:
1. Water (12oz, 6 pcs, category: Water)
2. Trail Mix (8oz, 1 pcs, category: Food)
3. Energy Bars (6oz, 2 pcs, category: Food)
4. Lightweight Backpacking Stove (8oz, 1 pcs, category: Essentials)
5. Dehydrated Meals (6oz, 2 pcs, category: Food)
6. Lightweight Waterproof Jacket (1kg, 1 pcs, category: Essentials)
7. Quick-Dry Layers (500g, 2 pcs, category: Essentials)
8. Extra Socks (100g, 3 pairs, category: Essentials)
9. Hat (100g, 1 pcs, category: Essentials)
10. First Aid Kit (200g, 1 pcs, category: Essentials)
11. Multi-Tool with Knife (150g, 1 pcs, category: Essentials)
12. Hydration Reservoir (empty) or Lightweight Collapsible Water Bottles (category: Water)
13. Purification Straw (category: Water)

Total Estimated Weight: Reduced from 838810.8785g to a more manageable and efficient weight.

ALWAYS be mindful of weight optimization to ensure a comfortable and safe hiking experience.`,
  },
];

const suggestion = {
  Items: [
    {
      name: 'Water',
      weight: 340.19449,
      unit: 'g',
      quantity: 6,
      category: 'Water',
    },
    {
      name: 'Trail Mix',
      weight: 226.796185,
      unit: 'g',
      quantity: 1,
      category: 'Food',
    },
    {
      name: 'Energy Bars',
      weight: 170.097139,
      unit: 'g',
      quantity: 2,
      category: 'Food',
    },
    {
      name: 'Lightweight Backpacking Stove',
      weight: 226.796185,
      unit: 'g',
      quantity: 1,
      category: 'Essentials',
    },
    {
      name: 'Dehydrated Meals',
      weight: 170.097139,
      unit: 'g',
      quantity: 2,
      category: 'Food',
    },
    {
      name: 'Lightweight Waterproof Jacket',
      weight: 1000,
      unit: 'g',
      quantity: 1,
      category: 'Essentials',
    },
    {
      name: 'Quick-Dry Layers',
      weight: 500,
      unit: 'g',
      quantity: 2,
      category: 'Essentials',
    },
    {
      name: 'Extra Socks',
      weight: 100,
      unit: 'g',
      quantity: 3,
      category: 'Essentials',
    },
    {
      name: 'Hat',
      weight: 100,
      unit: 'g',
      quantity: 1,
      category: 'Essentials',
    },
    {
      name: 'First Aid Kit',
      weight: 200,
      unit: 'g',
      quantity: 1,
      category: 'Essentials',
    },
    {
      name: 'Multi-Tool with Knife',
      weight: 150,
      unit: 'g',
      quantity: 1,
      category: 'Essentials',
    },
    {
      name: 'Hydration Reservoir',
      weight: 0,
      unit: 'g',
      quantity: 1,
      category: 'Water',
    },
    {
      name: 'Purification Straw',
      weight: 0,
      unit: 'g',
      quantity: 1,
      category: 'Water',
    },
  ],
};

function groupItemsByCategory(suggestion) {
  return suggestion.Items.reduce((acc, item, index) => {
    const itemWithId = {
      ...item,
      id: `item${index}`,
      category: { name: item.category },
    };
    (acc[item.category] = acc[item.category] || []).push(itemWithId);
    return acc;
  }, {});
}

// TODO check if we've fixed the chat screen on another branch
// link: https://github.com/andrew-bierman/PackRat/issues/ ???

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
    conversations,
    typeId,
    parsedMessages,
    userInput,
    handleSendMessage,
    handleSubmitAnalysis,
    setUserInput,
    setTypeId,
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
  const { handleSubmitAnalysis } = useChat({ itemTypeId, type });
  const styles = useCustomStyles(loadStyles);

  const scrollViewRef = useRef<ScrollView>(null);

  const handleLayout = () => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  };

  return (
    <View>
      <RStack style={{ flex: 1 }}>
        {/* <Text style={{ width: '100%', textAlign: 'center', padding: 8 }}>
          Allow me to suggest some improvements to your pack!
        </Text> */}
        <ScrollView
          // ref={scrollViewRef}
          onContentSizeChange={handleLayout}
          style={{ maxHeight: 620, width: '100%', borderRadius: 10 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        >
          <SuggestionDescription data={chatteer} />
          <SuggestionList suggestion={suggestion} />
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
              console.log(groupItemsByCategory(suggestion));
              // handleSubmitAnalysis();
            }}
            style={{ width: '100%' }}
          >
            <Text style={styles.sendText}>Analyze</Text>
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
          position: 'absolute',
          right: 50,
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
