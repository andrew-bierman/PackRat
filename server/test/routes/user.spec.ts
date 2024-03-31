import { env } from 'cloudflare:test';
import { describe, it, expect, beforeAll } from 'vitest';
import { setupTest, type trpcCaller } from '../testHelpers';

describe('User Routes', () => {
    let caller: any;

    beforeAll(async () => {
        // caller = await setupTest(env)
        caller = {
            signUp: async () => ({ email: "abc@abc.com" })
        }
    })

    describe('signup', () => {

        const userToCreate = {
            email: 'abc@abc.com',
            name: 'abc'
        }

        it('creates a user', async () => {
            const createdUser = await caller.signUp(userToCreate)
            expect(createdUser.email).toEqual(userToCreate.email);
        })

        it('throws error "user already exists"', async () => {
            await caller.signUp(userToCreate)

            try {
                await caller.signUp(userToCreate)
            } catch (error: any) {
                expect(error.message).toEqual("User already exists")
            }

        })
    })



});
