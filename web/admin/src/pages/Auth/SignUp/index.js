import React from 'react';

import { AnimatedContainer, Content, Background } from '../styles';
import AuthLayout from "../../_layouts/auth";

import { ReactComponent as Logo } from '../../../assets/truckeria-logo.svg';

function SignUp() {
  return (
    <AuthLayout>
      <Background />

      <AnimatedContainer>
        <span className='link'>Link</span>

        <Content>
          <Logo className="logo" />
          <h1>Welcome back!</h1>
        </Content>

      </ AnimatedContainer>



      </AuthLayout>
  )
}

export default SignUp;
