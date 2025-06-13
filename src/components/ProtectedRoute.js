import { Navigate } from 'react-router-dom';
import { userData } from '../utils/common';

const ProtectedRoute = ({ children }) => {
  const user = userData();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
