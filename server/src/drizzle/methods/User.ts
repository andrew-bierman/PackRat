import * as jwt from 'hono/jwt';
import { eq } from "drizzle-orm";
import { createDb } from "../../db/client";
import { user as UserTable, userFavoritePacks } from "../../db/schema";
import { getDB } from '../../trpc/context';
import bcrypt from 'bcryptjs'

export class User {
    private dbInstance;

    constructor() {
        this.dbInstance = createDb(getDB());
    }

    async save(user) {
        if (user.username) {
            return this.getUserByUsername(user.username);
        }

        let generatedUsername = this.generateUsernameFromEmail(user.email);
        while (await this.doesUsernameExist(generatedUsername)) {
            generatedUsername = this.appendNumberToUsername(generatedUsername);
        }

        return this.updateUserWithNewUsername(user, generatedUsername);
    }

    async getUserByUsername(username) {
        return this.dbInstance.select().from(UserTable).where(eq(UserTable.username, username)).limit(1).get();
    }

    generateUsernameFromEmail(email) {
        return email ? email.split('@')[0] : 'defaultuser';
    }

    async doesUsernameExist(username) {
        const result = await this.dbInstance.select().from(UserTable).where(eq(UserTable.username, username)).limit(1).get();
        return result.length > 0;
    }

    appendNumberToUsername(username) {
        const match = username.match(/(\d+)$/);
        const number = match ? parseInt(match[1], 10) + 1 : 1;
        return username.replace(/(\d+)?$/, number.toString());
    }

    async updateUserWithNewUsername(user, username) {
        return this.dbInstance.update(UserTable).set({ ...user, username }).where(eq(UserTable.id, user.id)).returning().get();
    }

    async create(user) {
        try {
            return (await createDb(getDB())).insert(UserTable).values(user).returning().get();
        } catch (error) {
            console.log(error);
        }
    }

    async generateAuthToken(jwtSecret: string, id: string): Promise<string> {
        if (!jwtSecret) throw new Error('jwtSecret is not defined');
        const token = await jwt.sign({ id }, jwtSecret);
        await this.dbInstance.update(UserTable).set({ token }).where(eq(UserTable.id, id)).returning().get();
        return token;
    }

    async generateResetToken(jwtSecret: string, clientUrl: string, id: string, passwordResetToken?: string): Promise<string> {
        if (passwordResetToken) {
            const decoded: any = await jwt.verify(passwordResetToken, jwtSecret);
            if (decoded.id) return passwordResetToken;
        }

        if (!jwtSecret) throw new Error('jwtSecret is not defined');
        const resetToken = await jwt.sign({ id: id.toString() }, jwtSecret);
        await this.dbInstance.update(UserTable).set({ passwordResetToken: resetToken }).where(eq(UserTable.id, id)).returning().get();
        return `${clientUrl}/password-reset?token=${resetToken}`;
    }

    async update(data: any, id: string, filter = eq(UserTable.id, id), returning = null) {
        return this.dbInstance.update(UserTable).set(data).where(filter).returning(returning).get();
    }

    async delete(id: string, filter = eq(UserTable.id, id)) {
        return this.dbInstance.delete(UserTable).where(filter).returning().get();
    }

    async findById(id: string, filter = eq(UserTable.id, id)) {
        return this.dbInstance.select().from(UserTable).where(filter).limit(1).get();
    }

    async findByEmail(email: string, filter = eq(UserTable.email, email)) {
        return this.dbInstance.select().from(UserTable).where(filter).limit(1).get();
    }

    async findMany(filter = null) {
        return this.dbInstance.select().from(UserTable).where(filter).get();
    }

    async findUnique(query) {
        return this.dbInstance.query.User.findFirst(query);
    }

    async findByCredentials(email: string, password: string) {
        const user = await this.findByEmail(email);
        if (!user) return null;
        if (await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async findFavorite(userId: string, packId: string) {
        const subQuery = this.dbInstance.select().from(userFavoritePacks).where(eq(userFavoritePacks.packId, packId)).as('subQuery');
        const isFavorite = await this.dbInstance.select().from(UserTable).where(eq(UserTable.id, userId)).select({ favoriteDocuments: subQuery });
        return isFavorite
    }
}
