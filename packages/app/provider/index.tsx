import { Dripsy } from './dripsy'

import { ThemeProvider } from '../context/theme'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
