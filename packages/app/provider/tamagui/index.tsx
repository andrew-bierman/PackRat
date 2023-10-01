import config from '../../tamagui.config'
import { TamaguiProvider as TamaguiProviderOG } from '@packrat/ui'
import { useRootTheme } from '../theme'

export const TamaguiProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const [currentTheme] = useRootTheme()

  return (
    <TamaguiProviderOG
      config={config}
      disableInjectCSS
      disableRootThemeClass
      defaultTheme={currentTheme}
    >
      {children}
    </TamaguiProviderOG>
  )
}
