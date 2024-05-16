import { type ZodSchema } from '@packrat/validations';
import { useCallback, useState } from 'react';

export const useValidateSchema = (
  ValidationSchema: ZodSchema,
  formatBeforeValidate?: (values: any) => typeof values,
) => {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validate = useCallback(
    (values: any) => {
      (async () => {
        try {
          setIsValidating(true);
          const finalValues =
            typeof formatBeforeValidate === 'function'
              ? formatBeforeValidate(values)
              : values;
          
          await ValidationSchema.parseAsync(finalValues);
          setIsValid(true);
        } catch (e) {
          
          setIsValid(false);
        } finally {
          setIsValidating(false);
        }
      })();
    },
    [ValidationSchema],
  );

  return { isValid: !isValidating && isValid, validate };
};
