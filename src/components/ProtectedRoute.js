import { Navigate } from 'react-router-dom';
import useLoginData from '../hooks/useLoginData';

const ProtectedRoute = ({ children }) => {
  const [user] = useLoginData();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
