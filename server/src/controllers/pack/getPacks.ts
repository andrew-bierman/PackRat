<<<<<<< andrew_testing
import { getPacksService } from '../../services/pack/pack.service';
=======
import { PackNotFoundError } from "../../helpers/errors";
import { getPacksService } from "../../services/pack/pack.service";
>>>>>>> Error Handling : - More Dynamic error handling - The error handling is broken down into these steps : - The middleware errorHandler inside helpers folder is responsible for handling all sort of errors during execution of the code - The errorHandler function comes with built in set of errors so that the error message shown on the frontend are more user friendly - If you want to send error response then you just need to call next express function with the statusCode and message properties inside a object - If you want the errorHandler to determine the sort of the error then just pass in error:Error instance to the next function - The error.ts file is written so that the error messages are used in multiple places and to make code cleaner and eradicate redundancy in the code - The tryCatchWrapper is written so that whenever a route function is called we have to nest the function inside this wrapper so that it handles errors - Changed all the route files with errorCodes and new type of error handling is done

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

    res.status(200).json(packs);
  } catch (error) {
<<<<<<< andrew_testing
    console.log('error', error);
    res.status(404).json({ msg: 'Packs cannot be found ' + error.message });
=======
    next(PackNotFoundError)
>>>>>>> Error Handling : - More Dynamic error handling - The error handling is broken down into these steps : - The middleware errorHandler inside helpers folder is responsible for handling all sort of errors during execution of the code - The errorHandler function comes with built in set of errors so that the error message shown on the frontend are more user friendly - If you want to send error response then you just need to call next express function with the statusCode and message properties inside a object - If you want the errorHandler to determine the sort of the error then just pass in error:Error instance to the next function - The error.ts file is written so that the error messages are used in multiple places and to make code cleaner and eradicate redundancy in the code - The tryCatchWrapper is written so that whenever a route function is called we have to nest the function inside this wrapper so that it handles errors - Changed all the route files with errorCodes and new type of error handling is done
  }
};
