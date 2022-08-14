import React from 'react';

import PageWrapper from './PageWrapper';
import { LoginForm } from '../features/authentication';

const Login = () => {
  return (
    <PageWrapper>
      <LoginForm />
    </PageWrapper>
  );
};

export default Login;
