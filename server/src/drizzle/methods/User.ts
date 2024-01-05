import * as jwt from 'hono/jwt';
import { eq } from "drizzle-orm";
import { createDb } from "../../db/client";
import { user as UserTable, userFavoritePacks } from "../../db/schema";
import { getDB } from '../../trpc/context';
import bcrypt from 'bcryptjs'

export class User {

    async createInstance() {
        const dbInstance = await createDb(getDB());
        return dbInstance
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
        return (await this.createInstance()).select().from(UserTable).where(eq(UserTable.username, username)).limit(1).get();
    }

    generateUsernameFromEmail(email) {
        return email ? email.split('@')[0] : 'defaultuser';
    }

    async doesUsernameExist(username) {
        const result: any = await (await this.createInstance()).select().from(UserTable).where(eq(UserTable.username, username)).limit(1).get();
        return result.length > 0;
    }

    appendNumberToUsername(username) {
        const match = username.match(/(\d+)$/);
        const number = match ? parseInt(match[1], 10) + 1 : 1;
        return username.replace(/(\d+)?$/, number.toString());
    }

    async updateUserWithNewUsername(user, username) {
        return (await this.createInstance()).update(UserTable).set({ ...user, username }).where(eq(UserTable.id, user.id)).returning().get();
    }

    async create(user) {
        try {
            console.log(user)
            return (await this.createInstance()).insert(UserTable).values(user).returning().get();
        } catch (error) {
            console.log("Error creating user", error);
        }
    }

    async generateAuthToken(jwtSecret: string, id: string): Promise<string> {
        if (!jwtSecret) throw new Error('jwtSecret is not defined');
        const token = await jwt.sign({ id }, jwtSecret);
        await (await this.createInstance()).update(UserTable).set({ token }).where(eq(UserTable.id, id)).returning().get();
        return token;
    }

    async generateResetToken(jwtSecret: string, clientUrl: string, id: string, passwordResetToken?: string): Promise<string> {
        if (passwordResetToken) {
            const decoded: any = await jwt.verify(passwordResetToken, jwtSecret);
            if (decoded.id) return passwordResetToken;
        }

        if (!jwtSecret) throw new Error('jwtSecret is not defined');
        const resetToken = await jwt.sign({ id: id.toString() }, jwtSecret);
        await (await this.createInstance()).update(UserTable).set({ passwordResetToken: resetToken }).where(eq(UserTable.id, id)).returning().get();
        return `${clientUrl}/password-reset?token=${resetToken}`;
    }

    async update(data: any, id: string, filter = eq(UserTable.id, id), returning = null) {
        return (await this.createInstance()).update(UserTable).set(data).where(filter).returning(returning).get();
    }

    async delete(id: string, filter = eq(UserTable.id, id)) {
        return (await this.createInstance()).delete(UserTable).where(filter).returning().get();
    }

    async findById(id: string, filter = eq(UserTable.id, id)) {
        return (await this.createInstance()).select().from(UserTable).where(filter).limit(1).get();
    }

    async findByEmail(email: string, filter = eq(UserTable.email, email)) {
        return (await this.createInstance()).select().from(UserTable).where(filter).limit(1).get();
    }

    async findMany(filter = null) {
        return (await this.createInstance()).select().from(UserTable).where(filter).get();
    }

    async findUnique(query) {
        return (await this.createInstance()).query.user.findFirst(query);
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
        const subQuery = (await this.createInstance()).select().from(userFavoritePacks).where(eq(userFavoritePacks.packId, packId)).as('subQuery');
        const isFavorite = (await (await this.createInstance()).select().from(UserTable).where(eq(UserTable.id, userId)) as any).select({ favoriteDocuments: subQuery });
        return isFavorite
    }
}
