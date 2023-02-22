import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useCurrentUserContext } from '../contexts/user';

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useCurrentUserContext();

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children ? children : <Outlet />;
};