import React, { useEffect } from 'react';
import {
  enGB,
  registerTranslation,
} from 'react-native-paper-dates';

const useTripDateRange = ({ setDateRange }) => {

  const [open, setOpen] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setDateRange({ startDate, endDate });
    },
    [setOpen],
  );

  useEffect(() => {
    registerTranslation('en', enGB);
  }, []);

  return {
    open,
    setOpen,
    onDismiss,
    onConfirm
  }

}

export default useTripDateRange