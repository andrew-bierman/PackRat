import { LabelProps, ParagraphProps, ThemeableStackProps } from 'tamagui';

export type LmFormContainerBaseTypes = {
  label?: string;
  labelProps?: Omit<LabelProps, 'htmlFor' | 'ref'> & {
    color?: string;
    width?: Number;
    justifyContent?: string;
  };
  labelInline?: boolean;
  helperText?: string;
  helperTextProps?: ParagraphProps;
  required?: boolean;
  error?: boolean;
  containerProps?: ThemeableStackProps;
  alignItems?: string;
  flexDirection?: string;
  color?: string;
  width?: string;
  justifyContent?: string;
};
