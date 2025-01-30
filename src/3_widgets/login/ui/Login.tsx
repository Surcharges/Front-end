import { useAuth } from "@shared/model"
import { Button } from "@mui/material"
import { Navigate } from "react-router-dom"

export function Login() {

  const { googleSignIn, user } = useAuth()

  if (user) {
    return ( <Navigate to='/admin' /> )
  }

  const handleSignIn = async () => {
    try {
      await googleSignIn()
    } catch {
      console.error('Google sign-in error')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Button onClick={handleSignIn}>Sign in with Google</Button>
    </div>
  )
}