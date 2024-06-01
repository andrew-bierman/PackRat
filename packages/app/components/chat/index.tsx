import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import {
  BaseModal,
  Form,
  FormInput,
  FormSelect,
  RButton,
  RImage,
  RInput,
  RStack,
  SubmitButton,
} from '@packrat/ui';
import { sendMessage } from '@packrat/validations';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useChat } from 'app/hooks/chat/useChat';
import { loadStyles } from './chat.style';
import { Box } from 'native-base';
import { ChatList } from '@packrat/ui/src/Bento/elements/list';
import { Button } from 'tamagui';
import { X } from '@tamagui/lucide-icons';
// import { Select } from "tamagui";

// TODO check if we've fixed the chat screen on another branch
// link: https://github.com/andrew-bierman/PackRat/issues/ ???

interface Message {
  role: string;
  content: string;
}

interface Chat {
  id: string;
}

interface MessageBubbleProps {
  message: Message;
}

interface ChatSelectorProps {
  conversation: Chat;
  onSelect: (id: string) => void;
  isActive: boolean;
}

interface ChatComponentProps {
  showChatSelector?: boolean;
  defaultChatId?: string | null;
  itemTypeId?: string | null;
}

interface ChatModalTriggerProps {
  title: string;
  trigger: string;
  itemTypeId: string | null;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const styles = useCustomStyles(loadStyles);
  const isAI = message.role === 'ai';
  return (
    <View style={isAI ? styles.aiBubble : styles.userBubble}>
      <Text style={isAI ? styles.aiText : styles.userText}>
        {message.content}
      </Text>
    </View>
  );
};

interface MessageListProps {
  messages: any[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <MessageBubble message={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

// const ChatSelector: React.FC<ChatSelectorProps> = ({
//   conversation,
//   onSelect,
//   isActive,
// }) => {
//   const styles = useCustomStyles(loadStyles);
//   return (
//     <TouchableOpacity
//       key={conversation._id}
//       onPress={() => onSelect(conversation._id)}
//       style={[styles.chator, isActive && styles.activeChator]}
//     >
//       <Text style={styles.chatorText}>{conversation._id}</Text>
//     </TouchableOpacity>
//   );
// };

const ChatComponent: React.FC<ChatComponentProps> = ({
  showChatSelector = true,
  defaultChatId = null,
  itemTypeId = null,
}) => {
  const styles = useCustomStyles(loadStyles);
  const {
    conversations,
    typeId,
    parsedMessages,
    userInput,
    handleSendMessage,
    setUserInput,
    setTypeId,
    isLoading,
  } = useChat({ itemTypeId });

  console.log('parsedMessages', parsedMessages);

  const scrollViewRef = useRef<ScrollView>(null);

  const handleLayout = () => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  };

  return (
    <View>
      <RStack style={{ flex: 1 }}>
        {showChatSelector && (
          <>
            {!parsedMessages?.length && (
              <Text>You don't have conversations yet</Text>
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
          <ChatList data={parsedMessages} />
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
            style={{ flex: 1 }} // This will make the input field take up the remaining space
          />
          <RButton
            disabled={!userInput}
            onClick={() => handleSendMessage({ message: userInput })}
            style={{ width: 80 }} // This will make the button take up a fixed amount of space
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

const ChatModalTrigger: React.FC<ChatModalTriggerProps> = ({ itemTypeId }) => {
  const styles = useCustomStyles(loadStyles);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isChatOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isChatOpen]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsChatOpen(!isChatOpen)}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setIsChatOpen(!isChatOpen)}
        >
          <RImage
            source={{
              // TODO: Update this to use the PackRat logo from the assets folder
              uri: 'https://raw.githubusercontent.com/andrew-bierman/PackRat/4ad449702c088e505c4b484219121d365150f971/packages/app/assets/chat-svgrepo-com%20(1).svg',
              width: 50,
              height: 50,
            }}
            width={40}
            height={40}
            style={styles.logo}
            alt="PackRat Logo"
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {isChatOpen && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 50,
            right: 20,
            width: 450,
            // height: 700,
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 4,
            zIndex: 1000,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            transform: [
              {
                translateX: animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [225, 0], // half of your view width
                }),
              },
              {
                translateY: animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [350, 0], // half of your view height
                }),
              },
              {
                scale: animationValue,
              },
            ],
            opacity: animationValue,
          }}
        >
          {/* <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              padding: 10,
              zIndex: 1001,
            }}
            onPress={() => setIsChatOpen(false)}
          > */}
          <Button
            position="absolute"
            backgroundColor="$background"
            top="$3"
            right="$3"
            size="$2"
            circular
            icon={X}
            onPress={() => setIsChatOpen(false)}
            style={{ zIndex: 1001 }}
          />
          {/* </TouchableOpacity> */}
          <ChatComponent itemTypeId={itemTypeId} />
        </Animated.View>
      )}
    </View>
  );
};

export default ChatModalTrigger;
