import React from 'react';
import { LoginScreen } from 'app/modules/auth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/sign-in/')({
  component: Login,
});

function Login() {
  return (
    <div>
      <LoginScreen />
    </div>
  );
}

export default Login;
