import { PrismaClient } from '@prisma/client/edge';
import type { GeoJSON,User } from '@prisma/client/edge';
import bycrypt from 'bcrypt';
import { JWT_SECRET } from '../config';
import jwt from 'jsonwebtoken';


// Connection URL is not needed since its already assigned in schema.prisma file
const prisma = new PrismaClient()

// Prisma Client extension is used to replace Mongoose Schema static methods
const extendedClient = prisma.$extends({
  // Model level extensions
  model: {
    geoJSON: {
      async saveOne(feature: GeoJSON) {
        return prisma.geoJSON.upsert({
          where: { id: feature.id },
          update: feature,
          create: feature,
        });
      },
      async saveMany(features: GeoJSON[]) {
        return prisma.geoJSON.createMany({
          data: features,
        });
      },
    },
    user: {
        async findByCredentials(email: string, password: string): Promise<User> {
          const user = await prisma.user.findFirst({ where: { email } });
  
          if (!user) throw new Error('Unable to login');
  
          const isMatch = await bycrypt.compare(password, user.password);
  
          if (!isMatch) throw new Error('Unable to login');
  
          return user;
        },
        // should be alreadyRegistered?   
        async alreadyLogin(email: string) {
          const user = prisma.user.findFirst({
            where: {email},
          });
  
          if (user) throw new Error('Already email registered');
        },
        async validateResetToken(token: string): Promise<User> {
          if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
          
          const decoded: any = jwt.verify(token, JWT_SECRET);
          const user = await prisma.user.findFirst({
              where: {id: decoded._id, passwordResetToken: token}
          });
  
          if (!user) throw new Error('User not Found');
  
          return user;
        },
      },
  },
});

export default extendedClient