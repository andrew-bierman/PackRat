import { RStack, View, RButton } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import React, { useState, useRef, useEffect } from 'react';
import { Platform, Animated } from 'react-native';
import ChatComponent from 'app/components/chat/ChatComponent';
import SuggestionComponent from 'app/components/chat/SuggestionComponent';
import { X } from '@tamagui/lucide-icons';
import { useChatParams } from 'app/hooks/chat/useChatParams';

export default function ChatNative() {
  const { currentTheme } = useTheme();
  const animationValue = useRef(new Animated.Value(0)).current;

  const { itemTypeId, type } = useChatParams();

  const [currentModal, setCurrentModal] = useState<string | null>(null);

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: currentModal !== null ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [currentModal]);

  return (
    <RStack
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        paddingTop: 24,
        backgroundColor: currentTheme.colors.background,
        flex: 1,
      }}
    >
      <Animated.View
        style={{ width: 370, position: 'absolute', bottom: 90, left: 5 }}
      >
        <RButton
          backgroundColor="$background"
          color="$color"
          size="$4"
          circular
          icon={X}
          onPress={() => setCurrentModal(null)}
          style={{ zIndex: 1001 }}
        />
        {currentModal === 'chat' && (
          <ChatComponent itemTypeId={itemTypeId} type={type} />
        )}
        {currentModal === 'suggestions' && (
          <SuggestionComponent itemTypeId={itemTypeId} type={type} />
        )}
      </Animated.View>

      <RStack
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <RButton onPress={() => setCurrentModal('chat')}>Open Chat</RButton>
        <RButton onPress={() => setCurrentModal('suggestions')}>
          Open Suggestions
        </RButton>
      </RStack>
    </RStack>
  );
}
