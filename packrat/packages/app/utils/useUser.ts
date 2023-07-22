import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'solito/router'
import { useSessionContext } from './supabase/useSessionContext'
import { useSupabase } from './supabase/useSupabase'

export const useUser = () => {
  const { session, isLoading: isLoadingSession } = useSessionContext()
  const user = session?.user
  const supabase = useSupabase()
  const {
    data: profile,
    isLoading: isLoadingProfile,
    refetch,
  } = useQuery(['profile'], {
    queryFn: async () => {
      if (!user?.id) return null
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (error) {
        if (error.code === 'PGRST116') {
          await supabase.auth.signOut()
          router.replace('/onboarding')
          return null
        }
        throw new Error(error.message)
      }
      return data
    },
  })
  const router = useRouter()

  const avatarUrl = (function () {
    if (profile?.avatar_url) return profile.avatar_url
    if (typeof user?.user_metadata.avatar_url === 'string') return user.user_metadata.avatar_url

    const params = new URLSearchParams()
    const name = profile?.name || user?.email || ''
    params.append('name', name)
    params.append('size', '256') // will be resized again by NextImage/SolitoImage
    return `https://ui-avatars.com/api.jpg?${params.toString()}`
  })()

  return {
    session,
    user,
    profile,
    avatarUrl,
    updateProfile: () => refetch(),
    isLoadingSession,
    isLoadingProfile,
    isLoading: isLoadingSession || isLoadingProfile,
    logOut: async () => {
      if (session) {
        await supabase.auth.signOut()
        router.replace('/onboarding')
      }
    },
  }
}
