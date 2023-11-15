import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Svg, Line, Circle } from 'react-native-svg';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';

const ProgressBar = ({ steps, currentStep }) => {
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

const Sidebar = ({ stepsData, currentStep }) => {
  // Get the data for the current step and all previous steps
  const displayData = Object.values(stepsData).slice(0, currentStep + 1);
  const styles = useCustomStyles(loadStyles);

  if (displayData.length === 0) return null;

  return (
    <View style={styles.sidebar}>
      {/* Display your data here */}
      {displayData.map((data, index) => {
        if (!data) return null;
        const { title, subtext } = data;
        return (
          <View key={index}>
            {title && <Text>{title}</Text>}
            {subtext && <Text>{subtext}</Text>}
          </View>
        );
      })}
    </View>
  );
};

/**
 * Renders a multi-step form component.
 *
 * @param {Object[]} steps - An array of steps to be rendered in the form.
 * @param {number} steps[].component - The component to be rendered for each step.
 * @param {Object} steps[].props - The props to be passed to the component.
 *
 * @return {JSX.Element} The rendered multi-step form component.
 */
const MultiStepForm = ({ steps = [] }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepsData, setStepsData] = useState({});
  const styles = useCustomStyles(loadStyles);

  /**
   * Updates the current step and saves the data of the current step before moving.
   *
   * @param {any} newStep - The new step to set as the current step.
   * @return {undefined} This function does not have a return value.
   */
  const updateStep = (newStep) => {
    // Save data of the current step before moving
    setStepsData({
      ...stepsData,
      [currentStep]: steps[currentStep].sidebarData,
    });
    setCurrentStep(newStep);
  };

  /**
   * Executes the next step in the process.
   *
   * @return {void}
   */
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      updateStep(currentStep + 1);
    }
  };

  /**
   * Decrements the current step and updates the step if the current step is greater than 0.
   *
   * @return {undefined} No return value
   */
  /**
   * Decrements the current step and updates the step if the current step is greater than 0.
   *
   * @return {undefined} No return value
   */
  const prevStep = () => {
    if (currentStep > 0) {
      updateStep(currentStep - 1);
    }
  };

  const { component: CurrentComponent, props } = steps[currentStep] || {};

  if (!steps.length) return null;

  return (
    <View style={styles.container}>
      <ProgressBar steps={steps} currentStep={currentStep} />

      <Sidebar stepsData={stepsData} currentStep={currentStep} />

      {CurrentComponent && <CurrentComponent {...props} />}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={prevStep} disabled={currentStep === 0}>
          <Text style={styles.button}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={nextStep}
          disabled={currentStep === steps.length - 1}
        >
          <Text style={styles.button}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    container: {
      // flex: 1,
      height: '800px',
      backgroundColor: currentTheme.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    progressBar: {
      width: '100%',
      marginBottom: 20,
    },
    svg: {
      width: '100%',
      height: 50,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 20,
      width: '60%',
    },
    button: {
      padding: 15,
      backgroundColor: currentTheme.colors.background,
      color: currentTheme.colors.white,
      borderRadius: 20,
      width: 100,
      textAlign: 'center',
    },
    sidebar: {
      width: '20%', // adjust as necessary
      padding: 10,
      backgroundColor: currentTheme.colors.white, // adjust as necessary
    },
  };
};

export default MultiStepForm;
