import { PackNotFoundError } from "../../helpers/errors";
import { responseHandler } from "../../helpers/responseHandler";
import { getPacksService } from "../../services/pack/pack.service";

/**
 * Retrieves packs associated with a specific owner.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise} - Array of packs.
 */
export const getPacks = async (req, res,next) => {
  try {
    const { ownerId } = req.params;

    const packs = await getPacksService(ownerId);

    res.locals.data = packs;
    responseHandler(res);
  } catch (error) {
    next(PackNotFoundError)
  }
};