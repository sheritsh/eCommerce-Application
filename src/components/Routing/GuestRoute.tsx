import React from 'react';
import { useSelector } from 'react-redux';
import { RouteProps, Navigate } from 'react-router-dom';
import { IRootState } from '../../store';

const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: IRootState) => state.auth.authData.accessToken !== null);

  return <>{!isAuthenticated ? children : <Navigate to="/dist" />}</>;
};

export default PrivateRoute;
