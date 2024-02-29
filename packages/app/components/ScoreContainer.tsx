import React from 'react';
import { Platform } from 'react-native';
import { View } from 'native-base';
import {
  YStack as VStack,
  XStack as HStack,
  RText as Text,
  RStack as Box,
  RButton as Button,
} from '@packrat/ui';
import { theme } from '../theme';
import useTheme from '../hooks/useTheme';
import { Svg, Circle, Path, G, Text as SvgText } from 'react-native-svg';
import useCustomStyles from 'app/hooks/useCustomStyles';
import {
  useCalculateStore,
  useGradingPie,
  useScoreData,
  useScoreProgress,
} from 'app/hooks/score';

interface ScoreProgressChartProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

const ScoreProgressChart: React.FC<ScoreProgressChartProps> = ({
  score,
  size = 150,
  strokeWidth = 10,
}) => {
  if (!score) return null;
  const styles = useCustomStyles(loadStyles);

  const { radius, circumference, progressPath } = useScoreProgress(
    score,
    size,
    strokeWidth,
  );

  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#EEE"
            strokeWidth={strokeWidth / 2}
            fill="transparent"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#3F51B5"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference - progressPath}
            strokeLinecap="round"
            fill="transparent"
          />
        </Svg>
        <Text style={styles.label}>{score.toFixed(2)}</Text>
      </View>
    </View>
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
  size = 150,
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
    weightStrokeDashoffset,
    essentialItemsStrokeDashoffset,
    redundancyAndVersatilityStrokeDashoffset,
    essentialItemsAngle,
    redundancyAndVersatilityAngle,
  } = useGradingPie(scores);

  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="160" width="160" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            {total === 0 ? (
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#F1F6F9"
                fill="transparent"
                strokeWidth="40"
              />
            ) : (
              <>
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#F05454"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={weightStrokeDashoffset}
                  rotation={0}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#30475E"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={essentialItemsStrokeDashoffset}
                  rotation={essentialItemsAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#222831"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={redundancyAndVersatilityStrokeDashoffset}
                  rotation={redundancyAndVersatilityAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
              </>
            )}
          </G>
        </Svg>
        <Text style={styles.label}>{total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

interface ScoreContainerProps {
  type: 'pack' | 'trip';
  data: any;
  isOwner: boolean;
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

  const isWeb = Platform.OS === 'web';

  return (
    <Box style={styles.box}>
      <HStack
        style={[styles.hStack, !isWeb && { flexDirection: 'column', gap: 10 }]}
      >
        <VStack style={styles.vStack}>
          <Text style={styles.scoreText}>
            {isAlreadyScored ? title : 'Score this pack!'}
          </Text>
          <Text>{subheader}</Text>
          <Text style={{ fontWeight: 300 }}>{description}</Text>
          {isOwner && (
            <Button style={styles.button} onPress={handleScoreClick}>
              <Text>Calculate Score</Text>
            </Button>
          )}
        </VStack>
        {isAlreadyScored && (
          <>
            <ScoreProgressChart score={totalScore} />
            <GradingPieChart scores={scores} />
          </>
        )}
      </HStack>
    </Box>
  );
};
const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  return {
    box: {
      paddingHorizontal: 25,
      marginVertical: 15,
      padding: 26,
      borderColor: currentTheme.colors.border,
      borderWidth: 2,
    },
    hStack: {
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    vStack: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: Platform.OS == 'web' ? '60%' : '100%',
    },
    scoreText: {
      color: currentTheme.colors.textPrimary,
      fontSize: 26,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: currentTheme.colors.primary,
      marginTop: 15,
      height: 50,
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    graphWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
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
