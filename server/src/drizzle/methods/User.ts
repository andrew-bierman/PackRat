import * as jwt from 'hono/jwt';
import { verify } from 'hono/jwt';
import { eq, and, SQL } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import {
  type InsertUser,
  user as UserTable,
  refreshTokens,
  userFavoritePacks,
  type User as UserType,
} from '../../db/schema';
import bcrypt from 'bcryptjs';

interface DecodedToken {
  id: string;
}

export class User {
  async save(user: Partial<InsertUser>): Promise<UserType | undefined> {
    if (user.username) {
      return this.getUserByUsername(user.username);
    }

    let generatedUsername = this.generateUsernameFromEmail(user.email);
    while (await this.doesUsernameExist(generatedUsername)) {
      generatedUsername = this.appendNumberToUsername(generatedUsername);
    }

    return this.updateUserWithNewUsername(user, generatedUsername);
  }

  async getUserByUsername(username: string): Promise<UserType | null> {
    return DbClient.instance
      .select()
      .from(UserTable)
      .where(eq(UserTable.username, username))
      .limit(1)
      .get();
  }

  async getAdminId(): Promise<UserType | null> {
    return DbClient.instance
      .select()
      .from(UserTable)
      .where(eq(UserTable.role, 'admin'))
      .limit(1)
      .get();
  }

  generateUsernameFromEmail(email: string | undefined): string {
    return email ? email.split('@')[0] : 'defaultuser';
  }

  async doesUsernameExist(username: string): Promise<boolean> {
    const result: any = await DbClient.instance
      .select()
      .from(UserTable)
      .where(eq(UserTable.username, username))
      .limit(1)
      .get();
    return result.length > 0;
  }

  appendNumberToUsername(username: string): string {
    const match = username.match(/(\d+)$/);
    const number = match ? parseInt(match[1], 10) + 1 : 1;
    return username.replace(/(\d+)?$/, number.toString());
  }

  async updateUserWithNewUsername(
    user: Partial<InsertUser>,
    username: string,
  ): Promise<UserType | null> {
    return DbClient.instance
      .update(UserTable)
      .set({ ...user, username })
      .where(eq(UserTable.id, user.id))
      .returning()
      .get();
  }

  async create(user: InsertUser): Promise<UserType | null> {
    try {
      const createdUser = DbClient.instance
        .insert(UserTable)
        .values(user)
        .returning()
        .get();
      return createdUser;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async generateAccessToken(jwtSecret: string, id: string): Promise<string> {
    if (!jwtSecret) throw new Error('jwtSecret is not defined');
    try {
      const token = await jwt.sign(
        { id, exp: Math.floor(Date.now() / 1000) + 60 * 30 }, // 30 mins expiry
        jwtSecret,
      );
      return token;
    } catch (error) {
      throw new Error(`Failed to generate access token: ${error.message}`);
    }
  }

  async generateRefreshToken(jwtSecret: string, id: string): Promise<string> {
    if (!jwtSecret) throw new Error('jwtSecret is not defined');
    try {
      const token = await jwt.sign(
        { id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14 }, // 14 days expiry
        jwtSecret,
      );
      await DbClient.instance
        .insert(refreshTokens)
        .values({ token, userId: id });
      return token;
    } catch (error) {
      throw new Error(`Failed to generate refresh token: ${error.message}`);
    }
  }

  async deleteRefreshToken(token: string): Promise<void> {
    await DbClient.instance
      .delete(refreshTokens)
      .where(eq(refreshTokens.token, token));
  }

  async generateResetToken(
    jwtSecret: string,
    clientUrl: string,
    id: string,
    passwordResetToken?: string,
  ): Promise<string> {
    if (passwordResetToken) {
      const decoded = await jwt.verify(passwordResetToken, jwtSecret);
      if (decoded.id) return passwordResetToken;
    }

    if (!jwtSecret) throw new Error('jwtSecret is not defined');
    const resetToken = await jwt.sign({ id }, jwtSecret);
    const filter = eq(UserTable.id, id);
    await DbClient.instance
      .update(UserTable)
      .set({
        passwordResetToken: resetToken,
        passwordResetTokenExpiration: new Date(
          Date.now() + 24 * 60 * 60 * 1000,
        ),
      })
      .where(filter)
      .returning()
      .get();
    return `${clientUrl}/password-reset?token=${resetToken}`;
  }

  async update(
    data: Partial<InsertUser>,
    filter = data.id ? eq(UserTable.id, data.id) : undefined,
  ): Promise<UserType[]> {
    try {
      const updatedUser = DbClient.instance
        .update(UserTable)
        .set(data)
        .where(filter)
        .returning();
      return updatedUser;
    } catch (error) {
      throw new Error(`Failed to update template: ${error.message}`);
    }
  }

  async delete(id: string, filter = eq(UserTable.id, id)): Promise<UserType[]> {
    try {
      return DbClient.instance.delete(UserTable).where(filter).returning();
    } catch (error) {
      throw new Error(`Failed to delete a user: ${error.message}`);
    }
  }

  async findMany(): Promise<UserType[]> {
    try {
      const users = await DbClient.instance.query.user.findMany();
      return users.map((user) => ({
        id: user.id,
        name: user.name,
        password: user.password,
        email: user.email,
        googleId: user.googleId,
        code: user.code,
        is_certified_guide: user.is_certified_guide,
        passwordResetToken: user.passwordResetToken,
        passwordResetTokenExpiration: user.passwordResetTokenExpiration,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })) as UserType[];
    } catch (error) {
      throw new Error(`Failed to get users: ${error.message}`);
    }
  }

  async findUser({
    userId,
    email,
    code,
    includeFavorites = false,
  }: {
    userId?: string;
    email?: string;
    code?: string;
    includeFavorites?: boolean;
  }): Promise<UserType | null> {
    try {
      let filter: any = null;
      if (userId) {
        filter = eq(UserTable.id, userId);
      } else if (email && code) {
        filter = and(eq(UserTable.email, email), eq(UserTable.code, code));
      } else if (email) {
        filter = eq(UserTable.email, email);
      }
      const user = await DbClient.instance.query.user.findFirst({
        where: filter,
        ...(includeFavorites && {
          with: {
            userFavoritePacks: {
              columns: { packId: true },
              with: {
                pack: {
                  with: {
                    itemPacks: {
                      columns: {},
                      with: {
                        item: {
                          columns: {
                            id: true,
                            name: true,
                            weight: true,
                            unit: true,
                            quantity: true,
                          } as any,
                        },
                      },
                    },
                    userFavoritePacks: { columns: { userId: true } },
                  },
                },
              },
            },
          },
        }),
      });

      return user as UserType | null;
    } catch (error) {
      throw new Error(`Failed finding user: ${error.message}`);
    }
  }

  async findByCredentials(
    email: string,
    password: string,
  ): Promise<UserType | null> {
    try {
      const user = await this.findUser({ email });
      if (!user) return null;
      if (await bcrypt.compare(password, user.password)) {
        return user;
      }
      return null;
    } catch (error) {
      throw new Error(`Failed to find user by credentials: ${error.message}`);
    }
  }

  async findFavorite(userId: string, packId: string): Promise<any> {
    const subQuery = DbClient.instance
      .select()
      .from(userFavoritePacks)
      .where(eq(userFavoritePacks.packId, packId))
      .as('subQuery');
    const isFavorite = (
      (await DbClient.instance
        .select()
        .from(UserTable)
        .where(eq(UserTable.id, userId))) as any
    ).select({ favoriteDocuments: subQuery });
    return isFavorite;
  }

  async validateResetToken(
    token: string,
    jwtSecret: string,
  ): Promise<UserType | null> {
    try {
      if (!jwtSecret) throw new Error('JwtSecret is not defined');
      const decoded = (await verify(
        token,
        jwtSecret,
      )) as unknown as DecodedToken;
      const user = await DbClient.instance
        .select()
        .from(UserTable)
        .where(
          and(
            eq(UserTable.id, decoded.id),
            eq(UserTable.passwordResetToken, token),
          ),
        )
        .get();
      if (!user) {
        throw new Error('User not found');
      }
      return user as UserType;
    } catch (error) {
      throw new Error(`Failed to validate reset token: ${error.message}`);
    }
  }

  async findUnique(query: {
    where: {
      email?: string;
      googleId?: string;
      id?: string;
      token?: string;
    };
    with?: { favoriteDocuments?: boolean; id?: boolean; username?: boolean };
  }): Promise<UserType | null> {
    try {
      const conditions: any[] = [];
      if (query.where.email) {
        conditions.push(eq(UserTable.email, query.where.email));
      }
      if (query.where.googleId) {
        conditions.push(eq(UserTable.googleId, query.where.googleId));
      }
      if (query.where.id && query.where.token) {
        conditions.push(
          eq(UserTable.id, query.where.id),
          eq(UserTable.passwordResetToken, query.where.token),
        );
      }
      if (query.where.token) {
        conditions.push(eq(UserTable.passwordResetToken, query.where.token));
      }
      const user = await DbClient.instance
        .select()
        .from(UserTable)
        .where(and(...conditions))
        .limit(1)
        .get();
      return user || null;
    } catch (error) {
      throw new Error(`Failed to find user: ${error.message}`);
    }
  }
}
