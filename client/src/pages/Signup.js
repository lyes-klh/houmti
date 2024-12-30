import React from "react";

import PageWrapper from "./PageWrapper";
import { SignupForm } from "../features/authentication";

const Login = () => {
  return (
    <PageWrapper mt={4}>
      <SignupForm />
    </PageWrapper>
  );
};

export default Login;
