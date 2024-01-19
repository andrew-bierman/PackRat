import { useEffect } from 'react';

export const useInputFocus = (inputRef, isFocused) => {
  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);
};
