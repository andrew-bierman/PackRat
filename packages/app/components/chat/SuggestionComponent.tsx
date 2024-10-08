import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RButton, RStack } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { loadStyles } from './chat.style';
import { useChat } from 'app/hooks/chat/useChat';
import { SuggestionDescription, SuggestionList } from '../Suggestion';
import useResponsive from 'app/hooks/useResponsive';
import useTheme from 'app/hooks/useTheme';

interface SuggestionComponentProps {
  itemTypeId?: string | null;
  type?: string | null;
}

const SuggestionComponent: React.FC<SuggestionComponentProps> = ({
  itemTypeId = null,
  type = null,
}) => {
  const [dots, setDots] = useState('.');
  const { xxs } = useResponsive();
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
  const { currentTheme } = useTheme();

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
      <RStack style={{ backgroundColor: currentTheme.colors.background }}>
        {!suggestions.suggestion.Items ? (
          <Text style={{ width: 500, color: currentTheme.colors.text }}>
            Allow me to analyze your pack and help!
          </Text>
        ) : (
          <View
            style={{
              maxHeight: xxs ? 350 : 500,
              width: '100%',
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'column',
              minHeight: xxs ? 420 : 450,
            }}
          >
            <View style={{ flex: 1 }}>
              <SuggestionDescription data={suggestions.reasoning} />
            </View>
            <View style={{ flex: 1 }}>
              <SuggestionList
                suggestion={suggestions.suggestion}
                onAddItem={removeItem}
              />
            </View>
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

export default SuggestionComponent;
