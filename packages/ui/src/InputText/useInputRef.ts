import { useRef, useImperativeHandle } from 'react';
import { type TextInput } from 'react-native';

export const useInputRef = (ref) => {
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return inputRef;
};
