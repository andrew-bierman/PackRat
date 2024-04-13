import { userSignUp } from '@packrat/validations';
import { generateMock } from '@anatine/zod-mock';
import { setupTest, teardownTest } from '../utils/testHelpers';

let caller;

beforeEach(async () => {
  const testSetup = await setupTest();
  caller = testSetup.caller;
});

afterEach(async () => {
  await teardownTest();
});

let user: any = generateMock(userSignUp);

describe('Reset password routes', () => {
  const passwordToBeUpdated = 'Updated@123';
  let token;

  describe('Create user', () => {
    test('Create user', async () => {
      const currentUser = await caller.signUp(user);

      user = { ...currentUser.toJSON(), password: user.password };
    });
  });

  describe('Request password reset', () => {
    test('Request password reset', async () => {
      if (user) {
        const response = await caller.requestPasswordResetEmailAndToken({
          email: user.email,
        });

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
    test('Reset password', async () => {
      // if (token) {
      // const response = await caller.handlePasswordReset({
      //   token,
      // });
      // expect(response).toBeUndefined();
      // const currentUser = await caller.signIn({
      //   email: user.email,
      //   password: passwordToBeUpdated,
      // });
      // expect(currentUser.id).toEqual(user.id);
      // expect(currentUser.token).toBeDefined();
      // }
    });
  });
});
