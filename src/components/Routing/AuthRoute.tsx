import React from 'react';
import { useSelector } from 'react-redux';
import { RouteProps, Navigate } from 'react-router-dom';
import { IRootState } from '../../store';

type IAuthRouteProps = RouteProps & {
  isPrivate?: boolean;
  isGuest?: boolean;
};

const AuthRoute: React.FC<IAuthRouteProps> = ({ children, isPrivate, isGuest }) => {
  const isAuthenticated = useSelector((state: IRootState) => state.auth.authData.accessToken !== null);

  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isGuest && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthRoute;
