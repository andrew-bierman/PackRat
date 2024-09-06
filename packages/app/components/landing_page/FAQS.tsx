import { RImage, RText } from '@packrat/ui';
import { View } from 'tamagui';
import PakRat_FAQS from 'app/assets/PakRat_FAQS.png';
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
          src={PakRat_FAQS}
          style={{
            backgroundColor: 'transparent',
            width: xs || sm || md ?  359 : 659,
            height: xs || sm || md ?  250 : 550,
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
      flexDirection: xs || sm || md ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      gap: 10,
      width: '100vw',
      maxWidth: '100vw',
      paddingTop: 20,
      paddingBottom: 20,
    },
    faqFirstContainer: {},
    faqMainTitle: {
      fontSize: xs || sm || md ?  20 : 26,
      textAlign : xs || sm || md ? 'center' : 'auto',
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
      // marginLeft: 0,
      width: xs || sm || md ? '100%' : '24vw',
      marginLeft: xs || sm || md ? 10 : 0,
      marginRight: xs || sm || md ? 10 : 0,
    },
    faqSecondContainer: {},
  });
};
