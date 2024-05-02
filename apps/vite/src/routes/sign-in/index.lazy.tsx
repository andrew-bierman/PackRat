import React from 'react';
import LoginScreen from 'app/screens/LoginScreen';
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
