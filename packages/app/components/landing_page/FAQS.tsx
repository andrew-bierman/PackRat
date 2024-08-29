import { RImage, RText } from '@packrat/ui';
import { View } from 'tamagui';
import PackRatPreview from 'app/assets/PackRat Preview.jpg';
import { StyleSheet } from 'react-native';
import useTheme from 'app/hooks/useTheme';
import useResponsive from 'app/hooks/useResponsive';
import { FaqList } from 'app/constants/FAQS';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

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
        <View>
          {FaqList.map((faq, index) => {
            return (
              <View>
                <View onPress={() => toggleAnswer(index)} style={styles.faqQuestion}>
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
          src={PackRatPreview}
          style={{
            backgroundColor: 'transparent',
            width: 259,
            height: 530,
          }}
          alt="PackRat Logo"
        />
      </View>
    </View>
  );
};

const loadStyles = (currentTheme, xs, sm, md) => {
  return StyleSheet.create({
    faqMainContainer: {
      flexDirection: 'row',
    //   alignItems: 'center',
      justifyContent: 'space-around',
      gap: 10,
      width: '100vw',
      maxWidth: '100vw',
      paddingTop: 20,
      paddingBottom: 20,
    },
    faqFirstContainer: {
    },
    faqMainTitle: {
      fontSize: 26,
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
      gap: 10,

    },
    faqAnswer: {
        marginLeft: 0, 
        width: '30vw',
    },
    faqSecondContainer: {
    },
  });
};
