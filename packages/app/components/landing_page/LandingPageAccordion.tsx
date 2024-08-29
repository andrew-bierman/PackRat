import { View } from 'react-native';
import { RButton as OriginalRButton, RCard, RImage, RText } from '@packrat/ui';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useAccordionState from './useAccordionState';
import loadStyles from './landingpage.style';
import { FAQ_ITEMS } from './constants';
import useTheme from 'app/hooks/useTheme';
import PackRatPreview from 'app/assets/PackRat Preview.jpg';
import { useEffect, useState } from 'react';

const RButton: any = OriginalRButton;

export const LandingPageAccordion = () => {
  const styles = useCustomStyles(loadStyles);
  const { currentTheme } = useTheme();
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(FAQ_ITEMS[index]);
  // const [expanded, toggleExpanded] = useAccordionState();

  useEffect(() => {
    setData(FAQ_ITEMS[index]);
  }, [index]);

  const panDown = async () => {
    if (index < 5) {
      setIndex(index + 1);
    }
    return false;
  };
  const panUp = async () => {
    if (index >= 1) {
      setIndex(index - 1);
    }
    return false;
  };

  const handleTextClick = (item) => {
    setIndex(item.index);
  };
  return (
    // <RCard style={styles.card}>
    //   <View style={styles.cardHeader}>
    //     <MaterialIcons name={iconName} style={styles.icon} />
    //     <RText style={styles.featureText}>{title}</RText>
    //     <RText style={styles.cardContent}>{content}</RText>
    //   </View>
    // </RCard>
    <View style={styles.landingPageAccordionContainer}>
      <View style={styles.landingPageAccordionFirstContainer}>
        <RButton onClick={panUp} style={styles.panButton}>
          <MaterialCommunityIcons
            name="pan-up"
            size={30}
            color={currentTheme.colors.background}
          />
        </RButton>
        <View style={{ width: '100%', padding: 8 }}>
          {FAQ_ITEMS.map((item) => {
            return (
              <RText
                onClick={() => {
                  handleTextClick(item);
                }}
                style={{ textAlign: 'left', cursor: 'pointer', width: 'auto' }}
              >
                {item.title}
              </RText>
            );
          })}
        </View>
        <RButton onClick={panDown} style={styles.panButton}>
          <MaterialCommunityIcons
            name="pan-down"
            size={30}
            color={currentTheme.colors.background}
            style={
              {
                // width: '100%',
              }
            }
          />
        </RButton>
      </View>
      <View style={styles.landingPageAccordationSecondContainer}>
        <RImage
          src={data.frameLink}
          style={{
            backgroundColor: 'transparent',
            width: 259,
            height: 530,
          }}
          alt="PackRat Logo"
        />
        <RText style={styles.cardContent}>{data.content}</RText>
      </View>
    </View>
  );
};
