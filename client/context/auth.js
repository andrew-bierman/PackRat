import { useRouter, useSegments } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'

const AuthContext = React.createContext(null)

// This hook can be used to access the user info.
export function useAuth () {
  return React.useContext(AuthContext)
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute (user) {
  const segments = useSegments()
  const router = useRouter()

  React.useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)'
    // need to add check for approved pages as well

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign in page.
      router.replace('/sign-in')
    } else if (user && inAuthGroup) {
      // if user is logged in and the route is protected
      // Redirect away from the sign in page.
      router.replace('/')
    }
  }, [user, segments])
}

export function AuthProvider ({ children }) {
  const user = useSelector((state) => state.auth.user)

  useProtectedRoute(user)

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}
