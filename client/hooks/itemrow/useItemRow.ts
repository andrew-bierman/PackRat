import { useState } from 'react';

export const useItemRow = () => {
  const [isChecked, setChecked] = useState(false);
  const handleChange = (value: boolean) => {
    setChecked(value);
  };
  return { isChecked, handleChange };
};
