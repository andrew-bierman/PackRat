import { generateMock } from '@anatine/zod-mock';
import { userSignUp } from '../../middleware/validators';
import {
  setupTest,
  teardownTest,
  createTRPCClient,
} from '../utils/testHelpers';
import { type Miniflare } from 'miniflare';
import { expect } from '@jest/globals';

let miniflare: Miniflare;
let caller: ReturnType<typeof createTRPCClient>;

beforeEach(async () => {
  const testSetup = await setupTest();
  miniflare = testSetup.miniflare;
  caller = createTRPCClient({ miniflare });
});

afterEach(async () => {
  await teardownTest({ miniflare });
});

describe('Test tests', () => {
  test('Test test', async () => {
    // const mf = new Miniflare({
    //   script:
    //     'addEventListener("fetch", (e) => e.respondWith(new Response("Hello, world!")));',
    // //   bindings: {
    // //     D1Database: ["DB"]
    // //   }
    // // d1Databases: {
    // //     "DB": "DB"
    // // }
    // // d1Databases: {
    // //     DB: "3f9677cd-7dd9-4a2c-92c6-be5dbbf47baa"
    // // }
    // });

    // const response = await mf.dispatchFetch('https://example.com');
    // expect(await response.text()).toBe('Hello, world!');

    // const bindings = await mf.getBindings();

    // expect(bindings).toBeTruthy();

    // console.log({ bindings });

    expect(true).toBe(true);
  });
});

let user: any = generateMock(userSignUp);

//* Wrapped each test suit with describe to execute them sequentially
describe('User routes', () => {
  describe('User Sing Up', () => {
    test('User Sing Up', async () => {
      const currentUser = await caller.signUp(user);

      // SendGrid is not working in test environment, but otherwise this test passes. Short term solution is to comment out the sendWelcomeEmail function in userSignUp.ts.

      expect(currentUser.id).toBeDefined();
      expect(currentUser.password).toBeDefined();
      expect(currentUser.role).toBeDefined();
      expect(currentUser.token).toBeDefined();
      expect(currentUser.username).toEqual(user.username);
      expect(currentUser.email).toEqual(user.email.toLowerCase());

      user = { ...currentUser.toJSON(), password: user.password };
    });
  });
});

// describe('Delete user', () => {
//   let userToBeDeleted: any = generateMock(userSignUp);

//   describe('Create user', () => {
//     test('Create user', async () => {
//       const currentUser = await caller.signUp(userToBeDeleted);

//       expect(currentUser.id).toBeDefined();
//       expect(currentUser.email).toEqual(userToBeDeleted.email.toLowerCase());

//       userToBeDeleted = {
//         ...currentUser.toJSON(),
//         password: userToBeDeleted.password,
//       };
//     });
//   });

//   describe('Delete user', () => {
//     test('Delete user', async () => {
//       const response = await caller.deleteUser({
//         userId: userToBeDeleted.id,
//       });

//       expect(response).toEqual('User deleted successfully');
//     });
//   });

//   describe('Get user by Id', () => {
//     test('Get user by Id', async () => {
//       const deletedUser = await caller.getUserById({
//         userId: userToBeDeleted.id,
//       });

//       expect(deletedUser).toBeNull();
//     });
//   });
// });

// //! it's failing sometimes with timeout error as getUsers service takes too long to respond
// test('Get all users', async () => {
//   const users = await caller.getUsers();

//   expect(users).toBeDefined();
// }, 20000);
