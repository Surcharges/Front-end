import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  // signInWithRedirect,
  User,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { auth } from "@shared/api";

interface AuthContextType {
  googleSignIn: () => Promise<void>
  logout: () => Promise<void>
  user: User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null)

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()
      // signInWithRedirect(auth, provider)
      signInWithPopup(auth, provider)

    } catch (error) {
      console.error("Google sign-in error:", error)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ googleSignIn, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider")
  }
  return context
}
