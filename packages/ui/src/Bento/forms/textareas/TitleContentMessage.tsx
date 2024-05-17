import { Info } from '@tamagui/lucide-icons'
import { Label, Text, TextArea, View } from 'tamagui'

/** ------ EXAMPLE ------ */
export function TitleContentMessage() {
  return (
    <View flexDirection="column" width={400} maxWidth="100%" gap="$1">
      <Label htmlFor="title-content" size="$3">
        Title of Text Area
      </Label>
      <TextArea
        id="title-content"
        size="$3"
        fontWeight="300"
        height={180}
        placeholder="Your text here"
      />
      <View
        flexDirection="row"
        theme="alt1"
        marginTop="$2.5"
        alignItems="center"
        gap="$2"
      >
        <Info size={14} />
        <Text fontWeight="300" theme="alt2" fontSize="$2">
          some hints or info about text area
        </Text>
      </View>
    </View>
  )
}

TitleContentMessage.fileName = 'TitleContentMessage'
