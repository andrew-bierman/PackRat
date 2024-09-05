import * as jwt from 'hono/jwt';
import { eq, and } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import {
  type InsertUser,
  user as UserTable,
  refreshTokens,
  userFavoritePacks,
} from '../../db/schema';
import bcrypt from 'bcryptjs';

export class User {
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
    return DbClient.instance
      .select()
      .from(UserTable)
      .where(eq(UserTable.username, username))
      .limit(1)
      .get();
  }

  async getAdminId() {
    return DbClient.instance
      .select()
      .from(UserTable)
      .where(eq(UserTable.role, 'admin'))
      .limit(1)
      .get();
  }

  generateUsernameFromEmail(email) {
    return email ? email.split('@')[0] : 'defaultuser';
  }

  async doesUsernameExist(username) {
    const result: any = await DbClient.instance
      .select()
      .from(UserTable)
      .where(eq(UserTable.username, username))
      .limit(1)
      .get();
    return result.length > 0;
  }

  appendNumberToUsername(username) {
    const match = username.match(/(\d+)$/);
    const number = match ? parseInt(match[1], 10) + 1 : 1;
    return username.replace(/(\d+)?$/, number.toString());
  }

  async updateUserWithNewUsername(user, username) {
    return DbClient.instance
      .update(UserTable)
      .set({ ...user, username })
      .where(eq(UserTable.id, user.id))
      .returning()
      .get();
  }

  async create(user: InsertUser) {
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

  async generateAccessToken(jwtSecret: string, id: string) {
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

  async generateRefreshToken(jwtSecret: string, id: string) {
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
  ) {
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

  async delete(id: string, filter = eq(UserTable.id, id)) {
    try {
      return DbClient.instance.delete(UserTable).where(filter).returning();
    } catch (error) {
      throw new Error(`Failed to delete a user: ${error.message}`);
    }
  }

  async findMany() {
    try {
      const users = DbClient.instance.query.user.findMany({});
      return users;
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
  }) {
    try {
      let filter: any = null;
      if (userId) {
        filter = eq(UserTable.id, userId);
      } else if (email && code) {
        filter = and(eq(UserTable.email, email), eq(UserTable.code, code));
      } else if (email) {
        filter = eq(UserTable.email, email);
      }
      const user = DbClient.instance.query.user.findFirst({
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
                            quantity: true,
                            unit: true,
                          },
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

      return user;
    } catch (error) {
      throw new Error(`Failed finding user: ${error.message}`);
    }
  }

  async findByCredentials(email: string, password: string) {
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

  async findFavorite(userId: string, packId: string) {
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

  async validateResetToken(token: string, jwtSecret: string) {
    try {
      if (!jwtSecret) throw new Error('JwtSecret is not defined');
      const decoded = await jwt.verify(token, jwtSecret);
      const user = DbClient.instance
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
      return user;
    } catch (error) {
      throw new Error(`Failed to validate reset token: ${error.message}`);
    }
  }

  async findUnique(query: {
    where: { email?: string; googleId?: string; id?: string; token?: string };
    with?: { favoriteDocuments?: boolean; id?: boolean; username?: boolean };
  }) {
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
          eq(UserTable.token, query.where.token),
        );
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
