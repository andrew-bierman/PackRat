import * as jwt from 'hono/jwt'
import { eq } from "drizzle-orm";
import { createDb } from "../../db/client";
import { User as UserTable } from "../../db/schema";

export class User {
    constructor() {
    }
    async save(user) {
        // Early return if user already has a username
        if (user.username) {
            return await this.getUserByUsername(user.username);
        }

        // Generate a unique username
        let generatedUsername = this.generateUsernameFromEmail(user.email);
        while (await this.doesUsernameExist(generatedUsername)) {
            generatedUsername = this.appendNumberToUsername(generatedUsername);
        }

        // Update and save the user with the new username
        return await this.updateUserWithNewUsername(user, generatedUsername);
    }

    async getUserByUsername(username) {
        return createDb(db).select().from(UserTable).where(eq(UserTable.username, username)).limit(1).get();
    }

    generateUsernameFromEmail(email) {
        return email ? email.split('@')[0] : 'packratuser';
    }

    async doesUsernameExist(username) {
        return createDb(db).select().from(UserTable).where(eq(UserTable.username, username)).limit(1).get();
    }

    appendNumberToUsername(username) {
        const match = username.match(/(\d+)$/);
        const number = match ? parseInt(match[1], 10) + 1 : 1;
        return username.replace(/(\d+)?$/, number.toString());
    }

    async updateUserWithNewUsername(user, username) {
        const { save, toJSON, generateAuthToken, generateResetToken, ...userObject } = user;
        return createDb(db).update(UserTable).set({ ...userObject, username: username }).where(eq(UserTable.username, username)).returning().get();
    }

    async generateAuthToken(jwtSecret: string, id: string): Promise<string> {
        if (!jwtSecret) throw new Error('jwtSecret is not defined');
        const token = await jwt.sign({ id }, jwtSecret);
        await createDb(db).update(UserTable).set({ token }).where(eq(UserTable.id, id)).returning().get();
        return token;
    }

    async generateResetToken(
        jwtSecret: string,
        clinetUrl: string,
        id: string,
        passwordResetToken?: string,
    ): Promise<string> {
        if (passwordResetToken) {
            if (!jwtSecret) throw new Error('jwtSecret is not defined');
            const decoded: any = await jwt.verify(
                passwordResetToken,
                jwtSecret,
            );
            if (decoded.id) return passwordResetToken;
        }

        if (!jwtSecret) throw new Error('jwtSecret is not defined');
        const resetToken = await jwt.sign({ id: id.toString() }, jwtSecret);
        passwordResetToken = resetToken;
        await createDb(db).update(UserTable).set({ passwordResetToken }).where(eq(UserTable.id, id)).returning().get();
        return `${clinetUrl}/password-reset?token=${resetToken}`;
    }
}