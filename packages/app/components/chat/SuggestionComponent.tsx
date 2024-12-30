import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RButton, RStack, RText, XStack } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { loadStyles } from './chat.style';
import { useChat } from 'app/hooks/chat/useChat';
import { SuggestionDescription, SuggestionList } from '../Suggestion';
import useResponsive from 'app/hooks/useResponsive';
import useTheme from 'app/hooks/useTheme';
import { Popover } from 'tamagui';
import { Info } from '@tamagui/lucide-icons';

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

  //   reasoning: [
  //     {
  //       role: 'ai',
  //       content:
  //         'Based on the pack details you provided, I would suggest the following personalized recommendations and optimizations:\n\n1. **Remove Heavy Items**:\n    - Replace the large water container "Youdasdasjdapsdjaspdjasdpas" with a lighter and more efficient hydration option such as a hydration bladder or collapsible water bottles.\n    - Consider switching the heavy food item "odkasdoadskoasdkasodaksdoaskdasodkasdoaskdaosdkasodaskda" to lightweight trail-friendly meals like dehydrated meals or instant soups.\n\n2. **Add Essential Items**:\n    - Include a lightweight and compact first aid kit for safety.\n    - Consider adding a lightweight headlamp with spare batteries for visibility during night hikes.\n    - Bring along a multi-tool for various tasks and emergencies on the trail.\n\n3. **New Lightweight Item**:\n    - Substitute the water filter with a purification straw, which is lightweight, compact, and effective for drinking safely from natural water sources.\n\n4. **Pack Improvement**:\n    - Nut Butter Packets (45.3592lb, 1 pcs, category: Food): Provides quick energy and nutrients.\n    - Dehydrated Meals or Instant Soup Mix (lightweight alternative to heavy canned food).\n    - Purification Straw (lightweight water purification method).\n    - First Aid Kit (essential for emergencies).\n    - Headlamp with Spare Batteries (for visibility).\n    - Multi-Tool (versatile tool for various needs).\n\nFinal Improved Pack:\n- Nut Butter Packets (45.3592lb, 1 pcs, category: Food)\n- Dehydrated Meals or Instant Soup Mix (xx lb, xx pcs, category: Food)\n- Purification Straw (xx lb, 1 pcs, category: Water)\n- First Aid Kit (xx lb, 1 pcs, category: Essentials)\n- Headlamp with Spare Batteries (xx lb, 1 pcs, category: Essentials)\n- Multi-Tool (xx lb, 1 pcs, category: Essentials)',
  //     },
  //   ],
  //   suggestion: {
  //     Items: [
  //       {
  //         name: 'Nut Butter Packets',
  //         weight: 45.3592,
  //         unit: 'lb',
  //         quantity: 1,
  //         ownerId: 'r48aawke429hxmd4tvz8rkzh',
  //         packId: 'nrv1akfdo5iiooxu991rxgjc',
  //         type: 'Food',
  //         id: '5b82aad4-6745-4d50-8919-c60b532d6d1e',
  //       },
  //       {
  //         name: 'Dehydrated Meals',
  //         weight: 0,
  //         unit: 'lb',
  //         quantity: 0,
  //         ownerId: 'r48aawke429hxmd4tvz8rkzh',
  //         packId: 'nrv1akfdo5iiooxu991rxgjc',
  //         type: 'Food',
  //         id: '3233795f-b61b-4715-a08a-18812b14d94e',
  //       },
  //       {
  //         name: 'Purification Straw',
  //         weight: 0,
  //         unit: 'lb',
  //         quantity: 1,
  //         ownerId: 'r48aawke429hxmd4tvz8rkzh',
  //         packId: 'nrv1akfdo5iiooxu991rxgjc',
  //         type: 'Water',
  //         id: '5ad7d35e-2cb2-4eba-9903-02af3da453f0',
  //       },
  //       {
  //         name: 'First Aid Kit',
  //         weight: 0,
  //         unit: 'lb',
  //         quantity: 1,
  //         ownerId: 'r48aawke429hxmd4tvz8rkzh',
  //         packId: 'nrv1akfdo5iiooxu991rxgjc',
  //         type: 'Essentials',
  //         id: 'f8e1f4ed-10e9-4c47-ab63-11c7dea27f9a',
  //       },
  //       {
  //         name: 'Headlamp with Spare Batteries',
  //         weight: 0,
  //         unit: 'lb',
  //         quantity: 1,
  //         ownerId: 'r48aawke429hxmd4tvz8rkzh',
  //         packId: 'nrv1akfdo5iiooxu991rxgjc',
  //         type: 'Essentials',
  //         id: '02d1b17c-d0ff-4a66-9de2-6849a1f612fa',
  //       },
  //       {
  //         name: 'Multi-Tool',
  //         weight: 0,
  //         unit: 'lb',
  //         quantity: 1,
  //         ownerId: 'r48aawke429hxmd4tvz8rkzh',
  //         packId: 'nrv1akfdo5iiooxu991rxgjc',
  //         type: 'Essentials',
  //         id: 'c53f38f4-9f92-4714-91e1-c321480573fe',
  //       },
  //     ],
  //     _meta: {
  //       usage: {
  //         prompt_tokens: 503,
  //         completion_tokens: 149,
  //         total_tokens: 652,
  //         prompt_tokens_details: {
  //           cached_tokens: 0,
  //           audio_tokens: 0,
  //         },
  //         completion_tokens_details: {
  //           reasoning_tokens: 0,
  //           audio_tokens: 0,
  //           accepted_prediction_tokens: 0,
  //           rejected_prediction_tokens: 0,
  //         },
  //       },
  //     },
  //   },
  // };

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
    <RStack
      style={{
        backgroundColor: currentTheme.colors.background,
        flex: 1,
        justifyContent: 'center',
        padding: 16,
      }}
    >
      {!suggestions.suggestion.Items ? (
        <Text style={{ width: 500, color: currentTheme.colors.text }}>
          Allow me to analyze your pack and help!
        </Text>
      ) : (
        <>
          <XStack
            style={{
              justifyContent: 'space-between',
              paddingBottom: 8,
              alignItems: 'center',
            }}
          >
            <RText style={{ fontSize: 16, fontWeight: 600 }}>
              Suggested items
            </RText>
            <Popover>
              <Popover.Trigger>
                <XStack gap={4} style={{ alignItems: 'center' }}>
                  <Info size={16} />
                  <RText
                    style={{
                      fontWeight: 500,
                    }}
                  >
                    Why these items?
                  </RText>
                </XStack>
              </Popover.Trigger>
              <Popover.Content elevation="$1">
                <ScrollView
                  style={{
                    width: 300,
                    height: 300,
                  }}
                >
                  <SuggestionDescription data={suggestions.reasoning} />
                </ScrollView>
              </Popover.Content>
            </Popover>
          </XStack>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <SuggestionList
                suggestion={suggestions.suggestion}
                onAddItem={removeItem}
              />
            </ScrollView>
          </View>
        </>
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
  );
};

export default SuggestionComponent;
