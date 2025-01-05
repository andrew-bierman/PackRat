import { RImage as OriginalRImage, RText } from '@packrat/ui';
import { View } from 'tamagui';
import { ImageSourcePropType } from 'react-native';
import PakRat_FAQS from 'app/assets/PakRat_FAQS.png';
import { StyleSheet } from 'react-native';
import useTheme from 'app/hooks/useTheme';
import useResponsive from 'app/hooks/useResponsive';
import { FaqList } from 'app/constants/FAQS';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';

const RImage: any = OriginalRImage;

export const FAQS = () => {
  const { currentTheme } = useTheme();
  const { xs, sm, md } = useResponsive();
  const styles = StyleSheet.create(loadStyles(currentTheme, xs, sm, md));

  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswer = (index) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <View style={styles.faqMainContainer}>
      <View style={styles.faqFirstContainer}>
        <RText style={styles.faqMainTitle}>Frequently Asked Questions</RText>
        <View style={{ width: '100%' }}>
          {FaqList.map((faq, index) => {
            return (
              <View key={index} style={styles.faqBox}>
                <View
                  onPress={() => toggleAnswer(index)}
                  style={styles.faqQuestion}
                >
                  <RText>{faq.question}</RText>
                  <MaterialCommunityIcons
                    name={visibleAnswers[index] ? 'minus' : 'plus'}
                    size={20}
                    color={currentTheme.colors.textPrimary}
                  />
                </View>
                {/* <View style={styles.faqAnswer}>
                    <RText>{faq.answer}</RText>
                </View> */}
                {visibleAnswers[index] && (
                  <View style={styles.faqAnswer}>
                    <RText>{faq.answer}</RText>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.faqSecondContainer}>
        <RImage
          source={PakRat_FAQS as ImageSourcePropType}
          style={{
            backgroundColor: 'transparent',
            width: xs || sm || md ? 359 : 650,
            height: xs || sm || md ? 250 : 541,
          }}
          alt="PackRat Frequently Asked Questions"
        />
      </View>
    </View>
  );
};

const loadStyles = (currentTheme, xs, sm, md) =>
  StyleSheet.create({
    faqMainContainer: {
      flexDirection: xs || sm || md ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      gap: 10,
      width: '100vw',
      maxWidth: '100vw',
      paddingTop: 20,
      paddingBottom: 20,
    } as any,
    faqFirstContainer: {
      alignItems: 'center',
    },
    faqBox: {
      width: xs || sm || md ? '100%' : '24vw',
    } as any,
    faqMainTitle: {
      fontSize: xs || sm || md ? 20 : 26,
      textAlign: xs || sm || md ? 'center' : 'auto',
      fontWeight: 'bold',
      color: currentTheme.colors.textPrimary,
      marginBottom: 30,
    },
    faqQuestion: {
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.colors.textPrimary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 4,
      marginBottom: 4,
      marginLeft: xs || sm || md ? 10 : 0,
      marginRight: xs || sm || md ? 10 : 0,
      gap: xs || sm || md ? 2 : 10,
    },
    faqAnswer: {
      width: xs || sm || md ? '100%' : '24vw',
      marginLeft: xs || sm || md ? 10 : 0,
      marginRight: xs || sm || md ? 10 : 0,
    } as any,
    faqSecondContainer: {},
  });
