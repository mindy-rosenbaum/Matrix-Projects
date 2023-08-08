import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useActiveUserAuth } from './AuthContext';

export interface PrivateRouteProps {
  path: string;
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<PrivateRouteProps> = ({ path, children }) => {
  const { isLoggedIn } = useActiveUserAuth();

  return <>{isLoggedIn ? <div>{children}</div> : <Navigate to={path} />}</>;
};

export default ProtectedRoute;