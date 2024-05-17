import { Button, Theme } from 'tamagui'

/** ------ EXAMPLE ------ */
export function ButtonPulse() {
  return (
    <Theme name="red">
      <Button
        themeInverse
        animation="100ms"
        elevation={15}
        pressStyle={{
          elevation: 7,
          scale: 0.95,
        }}
      >
        <Button.Text>Press me</Button.Text>
      </Button>
    </Theme>
  )
}

ButtonPulse.fileName = 'ButtonPulse'
