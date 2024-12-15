import React from 'react';
import { Platform } from 'react-native';
import { YStack, XStack, RText, RStack, RButton } from '@packrat/ui';
import useTheme from '../hooks/useTheme';
import { Svg, Circle, Path, G, Text as SvgText, Line } from 'react-native-svg';
import useCustomStyles from 'app/hooks/useCustomStyles';
import {
  useCalculateStore,
  useGradingPie,
  useScoreData,
  useScoreProgress,
} from 'app/hooks/score';
import { View } from 'react-native';
import { useMedia } from 'tamagui';

interface ScoreProgressChartProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

const ScoreProgressChart: React.FC<ScoreProgressChartProps> = ({
  score,
  size = 120,
  strokeWidth = 10,
}) => {
  if (!score) return null;
  const styles = useCustomStyles(loadStyles);

  const { radius, circumference, progressPath } = useScoreProgress(
    score,
    size,
    strokeWidth,
  );
  const { currentTheme } = useTheme();

  return (
    <RStack style={styles.container}>
      <RStack style={styles.graphWrapper}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={currentTheme.colors.text}
            strokeWidth={strokeWidth / 2}
            fill="transparent"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={currentTheme.colors.secondaryBlue}
            strokeWidth={strokeWidth}
            strokeDasharray={`${progressPath} ${circumference - progressPath}`}
            strokeDashoffset={0.25 * circumference}
            strokeLinecap="round"
            fill="transparent"
          />
        </Svg>
        <RText style={styles.label}>{score.toFixed(2)}</RText>
      </RStack>
    </RStack>
  );
};

//     grades: {
//   weight: weightGrade,
//   essentialItems: essentialItemsGrade,
//   redundancyAndVersatility: redundancyAndVersatilityGrade,
// },

interface GradingPieChartProps {
  scores: {
    weight: number;
    essentialItems: number;
    redundancyAndVersatility: number;
  };
  size?: number;
  strokeWidth?: number;
}
const GradingPieChart: React.FC<GradingPieChartProps> = ({
  scores,
  size = 120,
  strokeWidth = 10,
}) => {
  if (!scores) return null;

  const styles = useCustomStyles(loadStyles);

  // pie chart with 3 sections to represent the 3 grades
  // each section is a circle with a different color
  const {
    radius,
    circleCircumference,
    total,
    weightPath,
    essentialItemsPath,
    redundancyAndVersatilityPath,
    weightStrokeDashoffset,
    essentailItemsStrokeDashoffset,
    redundancyAndVersatilityStrokeDashoffset,
  } = useGradingPie(scores);

  const { currentTheme } = useTheme();

  return (
    <RStack style={styles.container}>
      <RStack style={styles.graphWrapper}>
        <Svg height="120" width="120" viewBox="0 0 180 180">
          {total === 0 ? (
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#F1F6F9"
              fill="transparent"
              strokeWidth="10"
            />
          ) : (
            <>
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke={currentTheme.colors.text}
                fill="transparent"
                strokeWidth="10"
                strokeDasharray={`${weightPath} ${circleCircumference - weightPath}`}
                strokeDashoffset={weightStrokeDashoffset}
                strokeLinecap="round"
              />
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke={currentTheme.colors.secondaryBlue}
                fill="transparent"
                strokeWidth="10"
                strokeDasharray={`${essentialItemsPath} ${circleCircumference - essentialItemsPath}`}
                strokeDashoffset={essentailItemsStrokeDashoffset}
                strokeLinecap="round"
              />
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke={currentTheme.colors.tertiaryBlue}
                fill="transparent"
                strokeWidth="10"
                strokeDasharray={`${redundancyAndVersatilityPath} ${circleCircumference - redundancyAndVersatilityPath}`}
                strokeDashoffset={redundancyAndVersatilityStrokeDashoffset}
                strokeLinecap="round"
              />
            </>
          )}
        </Svg>
        <RText style={styles.label}>{total.toFixed(2)}</RText>
      </RStack>
    </RStack>
  );
};

interface ScoreContainerProps {
  type: 'pack' | 'trip';
  data: any;
  isOwner: boolean | undefined | null;
}
export const ScoreContainer: React.FC<ScoreContainerProps> = ({
  type,
  data,
  isOwner,
}) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const {
    id,
    totalScore,
    grades,
    scores,
    isAlreadyScored,
    title,
    subheader,
    description,
  } = useScoreData(type, data);

  const handleScoreClick = useCalculateStore(id, type);
  const media = useMedia();

  return (
    <RStack style={styles.box}>
      <XStack
        style={[
          styles.hStack,
          !media.gtXs && { flexDirection: 'column', gap: 32 },
        ]}
      >
        <YStack style={media.gtXs ? styles.vStack : styles.vStackXS}>
          <RText style={styles.scoreText}>
            {isAlreadyScored ? title : 'Score this pack!'}
          </RText>
          <RText style={{ fontWeight: 500, color: currentTheme.colors.text }}>
            {subheader}
          </RText>
          <RText style={{ fontWeight: 300, color: currentTheme.colors.text }}>
            {description}
          </RText>
          {/* {isOwner && (
            <RButton style={styles.button} onPress={handleScoreClick}>
              <RText style={styles.buttonText}>Calculate Score</RText>
            </RButton>
          )} */}
        </YStack>
        {isAlreadyScored && (
          <View
            style={{
              flex: 1,
              flexDirection: media.gtXs ? 'column' : 'row',
              gap: 15,
            }}
          >
            <ScoreProgressChart score={totalScore} />
            <GradingPieChart scores={scores} />
          </View>
        )}
      </XStack>
    </RStack>
  );
};
const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  return {
    box: {
      paddingHorizontal: 25,
      marginVertical: 15,
      padding: 26,
      marginTop: 25,
      borderColor: currentTheme.colors.cardBorderPrimary,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: currentTheme.colors.background,
    },
    hStack: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
    },
    vStack: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '60%',
    },
    vStackXS: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    scoreText: {
      color: currentTheme.colors.text,
      fontSize: 26,
      fontWeight: 'bold',
      paddingBottom: 15,
    },
    button: {
      backgroundColor: currentTheme.colors.primary,
      marginTop: 15,
      height: 50,
      justifyContent: 'center',
      boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
    },
    buttonText: {
      color: currentTheme.colors.white,
      fontSize: 16,
      fontWeight: '500',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    graphWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    label: {
      position: 'absolute',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 24,
    },
  };
};

export default ScoreContainer;
