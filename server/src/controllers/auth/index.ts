import { Application, Request, Response } from 'express';
import Base from '../Base';
import { checkCode } from './checkCode';
import {
    deleteUser,
    editUser,
    getGoogleAuthURL,
    getMe,
    getUserById,
    getUsers,
    googleSignin,
    resetPassword,
    sentEmail,
    userSignIn,
    userSignup
}
    from '../user';
import * as validator from "../../middleware/validators/index";
import { signInGoogle } from '../passport';
import { updatePassword } from './updatePassword';
import { emailExists } from './emailExists';
import auth from "../../middleware/auth";
import { REDIRECT_URL } from "../../config";

export default class AuthController extends Base {

    constructor(express: Application) {
        super();
        this.register(express);
    }

    public register(express: Application): void {
        express.use('/user', this.router);
        express.use("/api/user", this.router);
        /**
         * @swagger
         * tags:
         *   name: User
         *   description: User routes
         */

        /**
         * @swagger
         * /user:
         *   get:
         *     summary: Get all users
         *     tags: [User]
         *     responses:
         *       '200':
         *         description: Successful response with all users
         *       '500':
         *         description: Error retrieving users
         */
        this.router.get("/", getUsers);

        /**
         * @swagger
         * /user/{userId}:
         *   get:
         *     summary: Get user by ID
         *     tags: [User]
         *     parameters:
         *       - in: path
         *         name: userId
         *         schema:
         *           type: string
         *         required: true
         *         description: ID of the user
         *     responses:
         *       '200':
         *         description: Successful response with the user
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error retrieving the user
         */
        this.router.get("/:userId", validator.getUserById, getUserById);

        // router.post("/", addUser);

        /**
         * @swagger
         * /user/signin:
         *   post:
         *     summary: User sign-in
         *     tags: [User]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *     responses:
         *       '200':
         *         description: Successful sign-in
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error signing in
         */
        this.router.post("/signin", validator.userSignIn, userSignIn);

        /**
         * @swagger
         * /user/signup:
         *   post:
         *     summary: User sign-up
         *     tags: [User]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *     responses:
         *       '200':
         *         description: Successful sign-up
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error signing up
         */
        this.router.post("/signup", validator.userSignUp, userSignup);

        /**
         * @swagger
         * /user/reset-password-email:
         *   post:
         *     summary: Send reset password email
         *     tags: [User]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *     responses:
         *       '200':
         *         description: Successful email sent
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error sending the email
         */
        this.router.post("/reset-password-email", validator.sentEmail, sentEmail);

        /**
         * @swagger
         * /user/reset-password:
         *   post:
         *     summary: Reset password
         *     tags: [User]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               resetToken:
         *                 type: string
         *               password:
         *                 type: string
         *     responses:
         *       '200':
         *         description: Successful password reset
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error resetting the password
         */
        this.router.post("/reset-password", validator.resetPassword, resetPassword);

        /**
         * @swagger
         * /user/me/info:
         *   get:
         *     summary: Get user information
         *     tags: [User]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       '200':
         *         description: Successful response with user information
         *       '401':
         *         description: Unauthorized - Invalid or missing authentication token
         *       '500':
         *         description: Error retrieving user information
         */
        this.router.get("/me/info", auth, getMe);

        /**
         * @swagger
         * /user/google/url:
         *   get:
         *     summary: Get Google authentication URL
         *     tags: [User]
         *     responses:
         *       '200':
         *         description: Successful response with Google authentication URL
         *       '500':
         *         description: Error retrieving Google authentication URL
         */
        this.router.get("/google/url", getGoogleAuthURL);

        this.router.get(`/${REDIRECT_URL}`, googleSignin);

        /**
         * @swagger
         * /user/google:
         *   post:
         *     summary: Sign in with Google
         *     tags: [User]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               id_token:
         *                 type: string
         *     responses:
         *       '200':
         *         description: Successful sign-in with Google
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error signing in with Google
         */
        this.router.post("/google", signInGoogle);

        /**
         * @swagger
         * /user:
         *   put:
         *     summary: Edit user
         *     tags: [User]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               userId:
         *                 type: string
         *     responses:
         *       '200':
         *         description: Successful response editing the user
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error editing the user
         */
        this.router.put("/", validator.editUser, editUser);

        /**
         * @swagger
         * /user:
         *   delete:
         *     summary: Delete user
         *     tags: [User]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               userId:
         *                 type: string
         *     responses:
         *       '200':
         *         description: Successful response deleting the user
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error deleting the user
         */
        this.router.delete("/", validator.deleteUser, deleteUser);
        this.router.post("/checkcode", validator.checkCode, checkCode);
        this.router.post("/updatepassword", validator.updatePassword, updatePassword);
        this.router.post("/emailexists", validator.emailExists, emailExists);
    }
}
