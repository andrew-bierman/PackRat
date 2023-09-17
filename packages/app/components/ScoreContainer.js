import React from 'react';
import { Platform } from 'react-native';
import { Box, Button, VStack, Text, HStack, View } from 'native-base';
import { theme } from '../theme';
import useTheme from '../hooks/useTheme';
import { useDispatch } from 'react-redux';
import { scorePack } from '../store/packsStore';
import { Svg, Circle, Path, G, Text as SvgText } from 'react-native-svg';
import useCustomStyles from '~/hooks/useCustomStyles';

const ScoreProgressChart = ({ score, size = 150, strokeWidth = 10 }) => {
  if (!score) return null;
  const styles = useCustomStyles(loadStyles);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = score / 100;
  const progressPath = progress * circumference;

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

const GradingPieChart = ({ scores, size = 150, strokeWidth = 10 }) => {
  if (!scores) return null;

  const { weightScore, essentialItemsScore, redundancyAndVersatilityScore } =
    scores;
  const styles = useCustomStyles(loadStyles);

  // pie chart with 3 sections to represent the 3 grades
  // each section is a circle with a different color

  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const total =
    weightScore + essentialItemsScore + redundancyAndVersatilityScore;

  const weightPercentage = (weightScore / total) * 100;
  const essentialItemsPercentage = (essentialItemsScore / total) * 100;
  const redundancyAndVersatilityPercentage =
    (redundancyAndVersatilityScore / total) * 100;

  const weightStrokeDashoffset =
    circleCircumference - (circleCircumference * weightPercentage) / 100;
  const essentialItemsStrokeDashoffset =
    circleCircumference -
    (circleCircumference * essentialItemsPercentage) / 100;
  const redundancyAndVersatilityStrokeDashoffset =
    circleCircumference -
    (circleCircumference * redundancyAndVersatilityPercentage) / 100;

  const essentialItemsAngle = (weightScore / total) * 360;
  const redundancyAndVersatilityAngle =
    essentialItemsAngle + (essentialItemsScore / total) * 360;

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

export default function ScoreContainer({ type, data, isOwner }) {
  const dispatch = useDispatch();
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const id = data._id;
  const totalScore = data.totalScore;
  const grades = data.grades;
  const scores = data.scores;

  const isAlreadyScored = totalScore !== null;

  const textData = {
    pack: {
      title: isAlreadyScored ? 'Pack Score' : 'Score this pack!',
      subheader: 'See how this pack matches up with our scoring system!',
      description:
        'PackRating is our proprietary scoring system that rates packs based on their weight, essential items, and redundancy and versatility. We worked with experts to create a system that is as objective as possible. The higher the score, the better the pack!',
    },
    trip: {
      title: isAlreadyScored ? 'Trip Score' : 'Score this trip!',
      subheader: 'See how this trip matches up with our scoring system!',
      description:
        'PackRating is our proprietary scoring system that rates trips based on their weight, essential items, and redundancy and versatility. We worked with experts to create a system that is as objective as possible. The higher the score, the better the trip!',
    },
  };

  const title = textData[type].title;
  const subheader = textData[type].subheader;
  const description = textData[type].description;

  const handleScoreClick = () => {
    if (type === 'pack') {
      dispatch(scorePack(id));
    } else if (type === 'trip') {
      dispatch(scoreTrip(id));
    }
  };

  return (
    <Box style={styles.box}>
      <HStack style={styles.hStack}>
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
            {/* <GradingPieChart scores={scores} /> */}
          </>
        )}
      </HStack>
    </Box>
  );
}
const loadStyles = (theme) => {
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
