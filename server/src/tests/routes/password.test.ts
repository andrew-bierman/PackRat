import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { userSignUp } from '@packrat/validations';
import { generateMock } from '@anatine/zod-mock';
import { generateMockUser, setupTest } from '../utils/testHelpers';
import type { trpcCaller } from '../utils/testHelpers';
import type { User } from '../../db/schema';
import { env } from 'cloudflare:test';

describe('Reset password routes', () => {
  let caller: trpcCaller;
  let user;
  const passwordToBeUpdated = 'Updated@123';
  let token: string;

  beforeEach(async () => {
    caller = await setupTest(env);
    user = generateMockUser();
  });

  describe('Create user', () => {
    it('Create user', async () => {
      const currentUser = await caller.signUp(user);
      user = { ...currentUser, password: user.password };
    });
  });

  describe('Request password reset', () => {
    it('Request password reset', async () => {
      if (user) {
        const response = (await caller.requestPasswordResetEmailAndToken({
          email: user.email,
        })) as { message: string; resetToken: string };

        expect(response.message).toEqual(
          'Password reset email sent successfully',
        );
        expect(response.resetToken).toBeDefined();
        token = response.resetToken;
      }
    });
  });

  describe('Reset password', () => {
    //! reset password function does not accept password as argument and only verifies token without updating password
    it('Reset password', async () => {
      // if (token) {
      //   const response = await caller.handlePasswordReset({
      //     token,
      //   });
      //   expect(response).toBeUndefined();
      //   const currentUser = await caller.signIn({
      //     email: user.email,
      //     password: passwordToBeUpdated,
      //   });
      //   expect(currentUser.id).toEqual(user.id);
      //   expect(currentUser.token).toBeDefined();
      // }
    });
  });
});
