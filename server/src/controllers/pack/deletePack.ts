import { UnableToDeletePackError } from "../../helpers/errors";
import { responseHandler } from "../../helpers/responseHandler";
import { deletePackService } from "../../services/pack/pack.service";

/**
 * Deletes a pack.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with the deletion result.
 */
export const deletePack = async (req, res,next) => {
  try {
    const { packId } = req.body;

    await deletePackService(packId);

    res.locals.data = {message: "Pack deleted"};
    responseHandler(res);
  } catch (error) {
    next(UnableToDeletePackError)
  }
};