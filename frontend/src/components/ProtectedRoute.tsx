import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react'; 

interface ProtectedRouteProps {
  children: ReactNode; 
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user || user.admin !== 1) {
    return <Navigate to="/auth/signin" />;
  }

  return children;
};

export default ProtectedRoute;
