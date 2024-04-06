import { addToFavoriteService } from '../../services/favorite/favorite.service';
import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';

// import { prisma } from '../../prisma';
/**
 * Adds or removes a pack from a user's favorites list and updates the corresponding pack's favorited_by array.
 * @param {Object} req - The request object containing the packId and userId properties in the body.
 * @param {Object} res - The response object used to send the HTTP response.
 * @return {Object} The updated user object in the response body.
 */
// export const addToFavorite = async (req, res, next) => {
//   const { packId, userId } = req.body;
//   await addToFavoriteService(packId, userId);
//   const user = await prisma.user.findUnique({
//     where: {
//       id: userId, // Assuming userId is the user's ID
//     },
//     select: {
//       // Exclude the 'password' field
//       id: true,
//       email: true,
//       name: true, // Include other fields you want
//     },
//   });
//   if (!user) next(UserNotFoundError);
//   res.locals.data = user;
//   responseHandler(res);
// };

export function addToFavoriteRoute() {
  return publicProcedure
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
