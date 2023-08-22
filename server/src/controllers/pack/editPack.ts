import { UnableToEditPackError } from "../../helpers/errors";
import { editPackService } from "../../services/pack/pack.service";

/**
 * Edits a pack in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated pack.
 */

export const editPack = async (req, res,next) => {
  try {
    const { _id } = req.body;

    const newPack = await editPackService(_id, req.body);

    console.log("newPack", newPack);

    res.status(200).json(newPack);
  } catch (error) {
    next(UnableToEditPackError)
  }
};