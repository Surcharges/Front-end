import { useAuth } from "@shared/model";
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: React.ReactNode
}

export function Protected(props: ProtectedProps) {

  const { user } = useAuth()

  if (!user) {
    return (<Navigate to='/login' />)
  }

  return (props.children)
}