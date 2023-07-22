import { useFormState } from 'react-hook-form'
import { AnimatePresence, Button, ButtonProps, Spinner } from 'tamagui'

/**
 * created to be used in forms
 * will show loading spinners and disable submission when already submitting
 */
export const SubmitButton = (props: ButtonProps) => {
  const { isSubmitting } = useFormState()
  return (
    <Button
      iconAfter={
        isSubmitting ? (
          <AnimatePresence>
            {isSubmitting && (
              <Spinner
                color="$color"
                key="loading-spinner"
                opacity={1}
                y={0}
                animation="quick"
                enterStyle={{
                  opacity: 0,
                  y: 4,
                }}
                exitStyle={{
                  opacity: 0,
                  y: 4,
                }}
              />
            )}
          </AnimatePresence>
        ) : undefined
      }
      disabled={isSubmitting}
      {...props}
    />
  )
}
