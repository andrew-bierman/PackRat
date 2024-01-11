import { type UseControllerProps } from 'react-hook-form';
import { Regex } from '~/utils/regex';

type ruleProps = UseControllerProps['rules'];

interface Props {
  email: ruleProps;
  password: ruleProps;
  name: ruleProps;
  username: ruleProps;
}

export const InputTextRules: Props = {
  email: {
    required: 'Email is required',
    pattern: { value: Regex.email, message: 'Email is invalid' },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 3,
      message: 'Password should be minimum 3 characters long',
    },
  },
  name: {
    required: 'Name is required',
    minLength: {
      value: 3,
      message: 'Name should be at least 3 characters long',
    },
    maxLength: {
      value: 24,
      message: 'Name should be max 24 characters long',
    },
  },
  username: {
    required: 'Username is required',
    pattern: {
      value: Regex.username,
      message: 'Username should be alphanumeric',
    },
    minLength: {
      value: 3,
      message: 'Username should be at least 3 characters long',
    },
    maxLength: {
      value: 24,
      message: 'Username should be max 24 characters long',
    },
  },
};
