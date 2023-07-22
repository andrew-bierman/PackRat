import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, SessionContextProviderProps } from '@supabase/auth-helpers-react'
import { useState } from 'react'

export type AuthProviderProps = {
  /**
   * web-only - pass `pageProps.initialSession` to this
   */
  initialSession?: SessionContextProviderProps['initialSession']
  children?: React.ReactNode
}

export const AuthProvider = ({ initialSession, children }: AuthProviderProps) => {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
      {children}
    </SessionContextProvider>
  )
}
