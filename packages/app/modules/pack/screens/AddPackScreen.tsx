import React from 'react';
import { AddPackForm } from '../components';

export const AddPackScreen = ({
  isCreatingTrip = false,
  onSuccess = () => {},
}: {
  isCreatingTrip?: boolean;
  onSuccess?: any;
}) => {
  return <AddPackForm isCreatingTrip={isCreatingTrip} onSuccess={onSuccess} />;
};
