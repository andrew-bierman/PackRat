import { Card, Checkbox, CheckboxProps, Label, Paragraph, Theme, XStack, YStack } from 'tamagui'
import { Check } from '@tamagui/lucide-icons'
import { useId } from 'react'

export const TodoCard = ({
  id: _id,
  label,
  ...props
}: {
  label: string
} & CheckboxProps) => {
  const reactId = useId()
  const id = _id || reactId
  return (
    <Theme name={props.checked ? 'green' : undefined} forceClassName>
      <Card backgroundColor="$backgroundStrong" borderRadius="$0">
        <Card.Header padded>
          <Label htmlFor={id}>
            <XStack gap="$4">
              <Checkbox {...props} id={id}>
                <Checkbox.Indicator>
                  <Check />
                </Checkbox.Indicator>
              </Checkbox>
              <YStack>
                <Paragraph textDecorationLine={props.checked ? 'line-through' : 'none'} size="$3">
                  {label}
                </Paragraph>
                <Paragraph size="$1" theme="alt2">
                  {props.checked ? "Completed" : "To do"}
                </Paragraph>
              </YStack>
            </XStack>
          </Label>
        </Card.Header>
      </Card>
    </Theme>
  )
}
