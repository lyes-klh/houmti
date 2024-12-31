import React from "react";

import PageWrapper from "./PageWrapper";
import { SignupForm } from "../features/authentication";

const Signup = () => {
  return (
    <PageWrapper mt={4}>
      <SignupForm />
    </PageWrapper>
  );
};

export default Signup;
