import React from 'react';
import RegisterScreen from 'app/screens/RegisterScreen';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/register/')({
  component: Register,
});

function Register() {
  return <RegisterScreen />;
}

export default Register;
