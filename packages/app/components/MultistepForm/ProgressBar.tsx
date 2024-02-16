import useCustomStyles from 'app/hooks/useCustomStyles';
import { Svg, Line, Circle } from 'react-native-svg';
import { View } from 'react-native';

interface ProgressBarProps {
  steps: any[];
  currentStep: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStep,
}) => {
  const percentage = ((currentStep + 1) / steps.length) * 100;
  const styles = useCustomStyles(loadStyles);

  return (
    <View style={styles.progressBar}>
      <Svg style={styles.svg}>
        <Line x1="0" y1="15" x2="100%" y2="15" stroke="grey" strokeWidth="10" />
        <Line
          x1="0"
          y1="15"
          x2={`${percentage}%`}
          y2="15"
          stroke="green"
          strokeWidth="10"
        />
        {steps.map((_, i) => (
          <Circle
            key={i}
            cx={`${(i / (steps.length - 1)) * 100}%`}
            cy="15"
            r="10"
            fill={i <= currentStep ? 'green' : 'grey'}
          />
        ))}
      </Svg>
    </View>
  );
};

const loadStyles = () => {
  return {
    progressBar: {
      width: '100%',
      marginBottom: 20,
    },
    svg: {
      width: '100%',
      height: 50,
    },
  };
};
