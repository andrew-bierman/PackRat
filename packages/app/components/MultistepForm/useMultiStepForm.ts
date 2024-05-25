import { useState } from 'react';

interface Step {
  sidebarData?: any;
}

export const useMultiStepForm = (steps: Step[] = []) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    currentStep,
    currentStepData: steps[currentStep] || {},
    sideBarData: steps?.[currentStep]?.sidebarData || {},
    nextStep,
    prevStep,
    isLastStep: currentStep === steps.length - 1,
    isFirstStep: currentStep === 0,
  };
};
