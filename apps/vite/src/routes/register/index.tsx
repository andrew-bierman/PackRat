import React from 'react';
import RegisterScreen from 'app/screens/RegisterScreen';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/register/')({
  component: Register,
});

function Register() {
  return <RegisterScreen />;
}

export default Register;
