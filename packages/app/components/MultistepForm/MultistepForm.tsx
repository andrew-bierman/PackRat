import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useMultiStepForm } from './useMultiStepForm';
import { ProgressBar } from './ProgressBar';
import { Sidebar } from './Sidebar';

interface StepData {
  component?: React.ComponentType;
  [key: string]: any;
}

// TODO move to packages, we need to inject styles in this component, need to think what is the best way to do it

export const MultiStepForm = ({ steps = [] }) => {
  const styles = useCustomStyles(loadStyles);
  const {
    currentStep,
    currentStepData,
    sideBarData,
    nextStep,
    prevStep,
    isLastStep,
    isFirstStep,
  } = useMultiStepForm(steps);

  const { component: CurrentComponent, ...props } = currentStepData as StepData;

  if (!steps.length) return null;

  return (
    <View style={styles.container}>
      <ProgressBar steps={steps} currentStep={currentStep} />
      <Sidebar data={sideBarData} currentStep={currentStep} />
      {CurrentComponent && <CurrentComponent {...props} />}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={prevStep} disabled={isFirstStep}>
          <Text style={styles.button}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextStep} disabled={isLastStep}>
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
      height: 800,
      backgroundColor: currentTheme.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
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
  };
};
