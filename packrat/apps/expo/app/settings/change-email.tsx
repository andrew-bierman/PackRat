import { ChangeEmailScreen } from 'app/features/settings/change-email-screen'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Screen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
      <ChangeEmailScreen />
    </SafeAreaView>
  )
}
