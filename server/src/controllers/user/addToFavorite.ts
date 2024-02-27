// import { responseHandler } from '../../helpers/responseHandler';
// import { addToFavoriteService } from '../../services/favorite/addToFavoriteService';

// /**
//  * Adds or removes a pack from a user's favorites list.
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  * @return {Object} The updated user object.
//  */
// export const addToFavorite = async (req, res) => {
//   const { packId, userId } = req.body;

//   const user = await addToFavoriteService(packId, userId);

//   res.locals.data = user;
//   responseHandler(res);
// };
