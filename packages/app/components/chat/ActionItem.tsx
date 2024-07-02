import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn,
} from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ActionItemProps {
  icon: LucideIcon;
  color: string;
  title: string;
  description: string;
  type: string;
  setIsChatOpen: (value: boolean) => void;
  setIsSuggestionOpen: (value: boolean) => void;
  setIsItemOpen: (value: boolean) => void;
}

export const ActionItem: React.FC<ActionItemProps> = ({
  icon: Icon,
  color,
  title,
  type,
  description,
  setIsChatOpen,
  setIsSuggestionOpen,
  setIsItemOpen,
}) => {
  const [scale, setScale] = useState(1);

  const actionItemAStyle = {
    transform: [{ scale: scale }],
  };

  const handlePressOut = () => {
    setScale(0.95);
    switch (type) {
      case 'chat':
        setIsItemOpen(false);
        setIsChatOpen(true);
        break;
      case 'suggestion':
        setIsItemOpen(false);
        setIsSuggestionOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <AnimatedPressable
      entering={FadeIn.duration(100)}
      onPressIn={() => {
        setScale(0.95);
      }}
      onPressOut={handlePressOut}
      style={[styles.actionItem, actionItemAStyle]}
    >
      <View
        style={{
          ...styles.iconContainer,
          backgroundColor: color,
        }}
      >
        <Icon size={24} color="white" />
      </View>
      <View style={styles.actionTextContainer}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(44, 44, 46, 0.6)',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1.3, // Adding border
    borderColor: '#3a3a3c', // Slightly lighter border color
    height: 80,
    width: 300,
    marginBottom: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTextContainer: {
    marginLeft: 6,
    paddingRight: 10,
    rowGap: 4,
    width: '90%',
  },
  actionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionDescription: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: 'rgba(224, 224, 224, 0.9)',
  },
});
