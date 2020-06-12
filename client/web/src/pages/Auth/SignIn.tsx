import React from 'react';

import { Container, Content, Background } from './styles';

export interface SignInProps {}

const SignIn: React.SFC<SignInProps> = () => {
  return (
    <Container>
      <Content>
        <h1 className="text-4xl">Logo</h1>

        <form action="">
          <h1>Login</h1>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit"></button>
          <a href="">Forgot my password</a>
        </form>

        <a href="">Register</a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
