import { Session } from '@supabase/supabase-js'
import { SafeAreaProvider } from './safe-area'
import { AuthProvider } from './auth'
import { QueryClientProvider } from './react-query'
import { TamaguiProvider } from './tamagui'
import { UniversalThemeProvider } from './theme'
import { ToastProvider } from './toast'
import React from 'react'

export function Provider({
  initialSession,
  children,
}: {
  initialSession?: Session | null
  children: React.ReactNode
}) {
  return (
    <AuthProvider initialSession={initialSession}>
      <Providers>{children}</Providers>
    </AuthProvider>
  )
}

const compose = (providers: React.FC<{ children: React.ReactNode }>[]) =>
  providers.reduce(
    (Prev, Curr) =>
      ({ children }) =>
        Prev ? (
          <Prev>
            <Curr>{children}</Curr>
          </Prev>
        ) : (
          <Curr>{children}</Curr>
        )
  )

const Providers = compose([
  UniversalThemeProvider,
  SafeAreaProvider,
  TamaguiProvider,
  ToastProvider,
  QueryClientProvider,
])
