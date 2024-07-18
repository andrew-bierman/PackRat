import { addToFavoriteService } from '../../services/favorite/favorite.service';
import { protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';

export const addToFavorite = async (c) => {
  try {
    const { packId, userId } = await c.req.parseBody();
    const response = await addToFavoriteService(packId, userId);
    return c.json({ response }, 200);
  } catch (error) {
    return c.json(
      { error: `Failed to add to favorites: ${error.message}` },
      500,
    );
  }
};

export function addToFavoriteRoute() {
  return protectedProcedure
    .input(validator.addToFavorite)
    .mutation(async (opts) => {
      const { packId, userId } = opts.input;
      return await addToFavoriteService(packId, userId);
      // const user = await userClass.findUnique({
      //   where: {
      //     id: userId, // Assuming userId is the user's ID
      //   },
      //   select: {
      //     // Exclude the 'password' field
      //     id: true,
      //     email: true,
      //     name: true, // Include other fields you want
      //   },
      // });

      // // if (!user) throw UserNotFoundError;
      // if (!user) return UserNotFoundError;
      // return user;
    });
}
