import React from 'react';
import LoginScreen from 'app/screens/LoginScreen';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sign-in/')({
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
