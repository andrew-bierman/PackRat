import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { Svg, Line, Circle } from 'react-native-svg';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';

const { height, width } = Dimensions.get('window');

const ProgressBar = ({ steps, currentStep }) => {
  const percentage = ((currentStep + 1) / steps.length) * 100;
  const styles = useCustomStyles(loadStyles);

  return (
    <View
      style={{
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width="100%" height="30">
        <Line
          x1="0"
          y1="15"
          x2="100%"
          y2="15"
          stroke="#c7c7c7"
          strokeWidth="10"
        />
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
            fill={i <= currentStep ? 'green' : '#c7c7c7'}
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

  if (!displayData.length) return null;

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

  const scrollViewRef = useRef(null);

  const scrollToItem = (index) => {
    if (scrollViewRef.current) {
      const xOffset = index * (width * 0.25); // Replace ITEM_WIDTH with the actual width of your items
      scrollViewRef.current.scrollTo({ x: xOffset, animated: true });
    }
  };

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
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        scrollToItem(currentStep);
      }
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
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        scrollToItem(currentStep - 1);
      }
    }
  };

  const { component: CurrentComponent, props } = steps[currentStep] || {};

  if (!steps.length) return null;

  return (
    <View style={styles.container}>
      {/* <View style={{ height: 50, width: '100%', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
        <Sidebar stepsData={stepsData} currentStep={currentStep} />
	</View> */}
			<ProgressBar steps={steps} currentStep={currentStep} />
			<View style={{ height: 80, }} >
				<ScrollView
					ref={scrollViewRef}
					horizontal
					showsHorizontalScrollIndicator={false}
					bounces={false}
					style={{ height: 80, }}
				>
					{steps.map((item, index) => {
						return (
							<View
								style={[styles.stepperButtons, { backgroundColor: currentStep >= index ? 'rgba(0,0,0,0.1)' : 'white', }]}
							>
								<View style={{ height: '100%', width: '90%', justifyContent: 'space-around' }} >
									<View style={{ justifyContent: 'center', alignItems: 'center', height: '90%' }} >
										{item?.sidebarData?.Icon()}
										<Text style={{ marginTop: 10, textAlign: 'center' }}>{item?.sidebarData?.title}</Text>
									</View>
									<View style={{
										width: '50%',
										backgroundColor: currentStep >= index ? 'green' : 'transparent',
										height: '3%',
										alignSelf: 'center'
									}} />
								</View>
							</View>
						)
					})}
				</ScrollView>
			</View>
			<ScrollView
				nestedScrollEnabled
				style={styles.scrollViewContainer}
				contentContainerStyle={{ justifyContent: 'space-between' }}
			>
				{CurrentComponent && <CurrentComponent {...props} />}

			</ScrollView>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={prevStep}
					disabled={currentStep === 0}
					style={styles.button}
				>
					<Text style={styles.buttonsText}>Previous</Text>
				</TouchableOpacity>
				{currentStep != steps.length - 1 ? (
					<TouchableOpacity
						onPress={nextStep}
						disabled={currentStep === steps.length - 1}
						style={styles.button}
					>
						<Text style={styles.buttonsText}>{currentStep === steps.length - 1 ? 'Save' : 'Next'}</Text>
					</TouchableOpacity>

				) : <></>}
			</View>
		</View >
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  scrollViewContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
    width: Platform.OS == 'web' ? '50%' : '100%',
    paddingVertical: Platform.OS === 'web' ? 0 : 20,
    backgroundColor: '#f4f5f6',
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#007AFF',
    width: 100,
  },
  buttonsText: {
    padding: 15,
    color: 'white',
    textAlign: 'center',
  },
  sidebar: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
  stepperButtons: {
    width: Platform.OS === 'web' ? 100 : width * 0.28,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'green',
  },
});

export default MultiStepForm;
