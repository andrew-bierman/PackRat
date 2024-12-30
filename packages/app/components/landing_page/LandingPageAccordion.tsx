import { View } from 'react-native';
import { RButton as OriginalRButton, RCard, RImage, RText } from '@packrat/ui';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useAccordionState from './useAccordionState';
import loadStyles from './landingpage.style';
import { FAQ_ITEMS } from './constants';
import useTheme from 'app/hooks/useTheme';
import PackRatPreview from 'app/assets/PackRat Preview.jpg';
import React, { useEffect, useState } from 'react';
import useResponsive from 'app/hooks/useResponsive';
import { Platform } from 'react-native';

const RButton: any = OriginalRButton;

interface LandingPageAccordionProps {
  title: string;
  content: string;
  iconName: string;
}

export const LandingPageAccordion = ({
  title,
  content,
  iconName,
}: LandingPageAccordionProps) => {
  const styles = useCustomStyles(loadStyles);
  const { currentTheme } = useTheme();
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(FAQ_ITEMS[index]);
  const { xxs, xs, xxl, sm, lg, md } = useResponsive();
  const [expanded, toggleExpanded] = useAccordionState();

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
    <View>
      {Platform.OS === 'web' ? (
        <View style={styles.landingPageAccordionContainer}>
          <View style={styles.landingPageAccordationSecondContainer}>
            <View>
              <RButton onClick={panUp} style={styles.panButton}>
                <MaterialCommunityIcons
                  name="arrow-left-thin"
                  size={30}
                  color={currentTheme.colors.textPrimary}
                />
              </RButton>
            </View>
            <View
              style={{
                flexDirection: xs || sm || md ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <RText style={styles.cardContent}>{data.content}</RText>
              <RImage
                src={data.frameLink}
                style={{
                  backgroundColor: 'transparent',
                  width: 330,
                  height: 600,
                }}
              />
            </View>
            <View>
              <RButton onClick={panDown} style={styles.panButton}>
                <MaterialCommunityIcons
                  name="arrow-right-thin"
                  size={30}
                  color={currentTheme.colors.textPrimary}
                  style={
                    {
                      // width: '100%',
                    }
                  }
                />
              </RButton>
            </View>
          </View>
        </View>
      ) : (
        <RCard style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name={iconName} style={styles.icon} />
            <View style={{ flex: 1 }}>
              <RText style={styles.featureText}>{title}</RText>
            </View>
            <RButton
              backgroundColor="transparent"
              style={styles.transparentButton}
              onPress={toggleExpanded}
            >
              <MaterialIcons
                name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                style={styles.icon}
              />
            </RButton>
          </View>
          {expanded && (
            <RCard.Header>
              <RText style={styles.cardContent}>{content}</RText>
            </RCard.Header>
          )}
        </RCard>
      )}
    </View>
  );
};
