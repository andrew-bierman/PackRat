import React from 'react';
import { View } from 'react-native';
import { useRenderDetails } from './useRenderDetails';

interface DetailsComponentProps {
  type: string;
  data: any; // Need type for this
  isLoading: boolean;
  error: Error;
  additionalComps: React.JSX.Element;
  link: string;
}

export const DetailsComponent = (props: DetailsComponentProps) => {
  const details = useRenderDetails(props);
  return <View>{details}</View>;
};
