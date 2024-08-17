import { RegisterScreen } from 'app/modules/auth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/register/')({
  component: Register,
});

function Register() {
  return <RegisterScreen />;
}

export default Register;
