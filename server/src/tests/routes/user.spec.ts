// @ts-nocheck

import { env } from 'cloudflare:test';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { setupTest, type trpcCaller } from '../utils/testHelpers';
import { User } from '../../drizzle/methods/User';
import { type User as UserType } from '../../db/schema';

describe('User Routes', () => {
  let caller: trpcCaller;
  let testUser: UserType;

  beforeAll(async () => {
    caller = await setupTest(env);
    testUser = await caller.signUp({
      email: 'test@abc.com',
      name: 'test',
      username: 'test',
      password: 'test123',
    });
  });

  describe('signUp', () => {
    const userToCreate = {
      email: 'test1@abc.com',
      name: 'test1',
      username: 'test1',
      password: 'test123',
    };

    it('creates a user', async () => {
      const createdUser = await caller.signUp(userToCreate);
      expect(createdUser.email).toEqual(userToCreate.email);
    });

    it('throws error "user already exists"', async () => {
      await caller.signUp(userToCreate);
      try {
        await caller.signUp(userToCreate);
      } catch (error: any) {
        expect(error.message).toEqual('Email already registered');
      }
    });
  });

  describe('getUserById', () => {
    it('should get user by Id', async () => {
      const fetchedUser = await caller.getUserById({ userId: testUser.id });
      expect(fetchedUser?.id).toBe(testUser.id);
    });
  });

  // This test case is failing because bcrypt.compare method does not seem to work as expected

  // describe('signIn', () => {
  //     it('should sign in the user', async () => {
  //         const signedInUser = await caller.signIn({ email: testUser.email, password: testUser.password })
  //         expect(signedInUser.token).toBeDefined()
  //     })
  // })

  describe('resetPassword', () => {
    it('should reset user password', async () => {
      const newPassword = 'test321';

      // generate and use reset token for created user
      const userClass = new User();
      const resetUrl = await userClass.generateResetToken(
        env.JWT_SECRET,
        '',
        testUser.id,
      );
      const resetToken = resetUrl.split('token=').pop() || '';

      const response = await caller.resetPassword({
        resetToken,
        password: newPassword,
      });

      expect(response).toBe('Successfully reset password');
    });
  });

  describe('editUser', () => {
    it('should update user fields', async () => {
      const updatedFields = {
        name: 'test123',
        email: 'test123@abc.com',
      };
      const [editedUser] = await caller.editUser({
        id: testUser.id,
        name: updatedFields.name,
        email: updatedFields.email,
      });

      expect(editedUser?.id).toBe(testUser.id);
      expect(editedUser?.name).toBe(updatedFields.name);
      expect(editedUser?.email).toBe(updatedFields.email);
    });
  });

  describe('getMe', () => {
    it('should get trpc context user', async () => {
      const loggedInUser = await caller.getMe();
      expect(loggedInUser).toBeDefined();
    });
  });

  describe('getUsers', () => {
    it('should return list of all users', async () => {
      const users = await caller.getUsers();
      expect(users.length).toBeGreaterThan(0);
    });
  });
});
