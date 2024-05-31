import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
<<<<<<< HEAD

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user || user.admin !== 1) {
        return <Navigate to="/auth/signin" />;
    }

    return children;
=======
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
>>>>>>> master
};

export default ProtectedRoute;
