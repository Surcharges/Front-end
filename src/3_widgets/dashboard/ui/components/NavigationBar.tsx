import { useAuth } from '@shared/model'
import { Button } from '@mui/material'

export function NavigationBar() {

  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      console.error('Sign out error')
    }
  }
  
  return (
    <div className='fixed top-0 right-0 m-4'>
        <div className='flex items-center'>
          <p>Hello, {user?.displayName}</p>
          <Button onClick={handleLogout}>Sign out</Button>
        </div>
      </div>
  )
}