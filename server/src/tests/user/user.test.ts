import { inferProcedureInput } from '@trpc/server';
// import { createContextInner } from '@trpc/server/dist/createContext';
import { AppRouter, createCaller } from '../../routes/trpcRouter';
import { generateMock } from '@anatine/zod-mock';
import * as validator from '../../middleware/validators/index';
import mongoose from 'mongoose';


beforeEach(async () => {
  console.log('before all');
  process.env.NODE_ENV = 'test';
  await mongoose.connect(process.env.MONGODB_URI ?? '');
});

afterEach(async () => {
  console.log('after all');
  await mongoose.disconnect();
});

type User = {
  id?       : string
  username? : string
  name?     : string
  email?    : string
  password? : string
  token?    : string
  code?     : string
}

const caller = createCaller({});

let user : User = generateMock(validator.userSignUp)

describe('USER', () => {
  it('Should can register new user', async() =>{
    const signUp = await caller.signUp({
      email    : user.email,
      name     : user.name,
      username : user.username,
      password : user.password,
    });
    expect(signUp.id).toBeDefined();
    expect(signUp.username).toBe(user.username);
    expect(signUp.email).toBe(user.email.toLowerCase());
    user = { ...signUp.toJSON(), password: user.password };
    console.log('registered user', user)
  })

  it('Should can login', async() =>{
    const signIn = await caller.signIn({
      email    : user.email,
      password : user.password
    });
    expect(signIn.id).toEqual(user.id);
    expect(signIn.token).toBeDefined();
  })

  it('Should get a user by his ID', async() =>{
    const result = await caller.getUserById({
      userId : user.id
    }) as any
    expect(result._id.toString()).toEqual(user.id);
  })

  // it('Should can get All user', async() =>{

  //   const users = await caller.getUsers()
  //   expect(users).toBeDefined()
  
  // }, 160000) // Should can get All user (153143 ms) => need 150000+ timeout

  it('Should can edit a user by his ID', async() =>{

    const data = {
      username : `update_${user.username}`
    }

    const update = await caller.editUser({
      userId : user.id,
      ...data
    })

    const updatedUser = update.toJSON()
    expect(updatedUser.id).toEqual(user.id);
    expect(updatedUser.username).toEqual(user.username);

    user = { ...user, username: updatedUser.username };
  
  })

  describe('Update Password', () =>{
    const newPassword = 'hrefdev'

    it('Should can update password', async() => {
      console.log('update password')
      const update = await caller.updatePassword({
        email : user.email,
        password : newPassword
      })

      expect(update).toBeTruthy()
    })

    it('Should can login with new password', async() =>{
      console.log('newPassword', newPassword)
      const signIn = await caller.signIn({
        email    : user.email,
        password : newPassword
      });
      // update password success but Cannot login with new password
      expect(signIn.id).toEqual(user.id);
      expect(signIn.token).toBeDefined();
    })
    
  })


  it('Should can get Google Auth URL', async() =>{

    const auth = await caller.getGoogleAuthURL()

    expect(auth.status).toEqual('success')
    expect(auth.statusCode).toEqual(200)
    expect(auth.googleUrl).toBeDefined()
  
  })

  it('Should can check existing user by Email', async() =>{
    const getUser = await caller.emaileExists({
      email : user.email,
    })

    // emailExists return undefined
    expect(getUser).toBeDefined()
  })

  it('Should can delete a user by his ID', async() =>{
    const remove = await caller.deleteUser({
      userId : user.id,
    })

    expect(remove).toEqual('User deleted successfully');
  })

})

