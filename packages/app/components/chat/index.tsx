import React, { useEffect, useRef, useState } from 'react';
import { View, Animated } from 'react-native';
import { RButton, RIconButton } from '@packrat/ui';
import { X } from '@tamagui/lucide-icons';
import { MessageCircle, Settings } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useTheme from 'app/hooks/useTheme';
import ChatComponent from './ChatComponent';
import SuggestionComponent from './SuggestionComponent';
import { ActionItem } from './ActionItem';
import { loadStyles } from './chat.style';

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
