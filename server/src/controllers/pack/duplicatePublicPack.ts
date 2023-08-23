import { UnableToDuplicatePackError } from "../../helpers/errors";
import { responseHandler } from "../../helpers/responseHandler";
import { duplicatePublicPackService } from "../../services/pack/pack.service";

/**
 * Duplicates a public pack.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} - a promise that resolves with the duplicated pack
 */
export const duplicatePublicPack = async (req, res,next) => {
  try {
    const { packId, ownerId, items } = req.body;

    const result = await duplicatePublicPackService(packId, ownerId, items);

    res.locals.data = {
      msg: "pack was duplicated successfully",
      data: result.pack,
    }
    responseHandler(res);
  } catch (error) {
    next(UnableToDuplicatePackError)
  }
};