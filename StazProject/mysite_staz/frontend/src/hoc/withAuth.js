// frontend/src/hoc/withAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent, token) => {
  return (props) => {
    if (!token) return <Navigate to="/login" />;
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
