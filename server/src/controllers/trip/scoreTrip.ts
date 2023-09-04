import { UnableToScoreTripError } from "../../helpers/errors";
import { scoreTripService } from "../../services/trip/scoreTripService";

/**
 * Scores a trip by calculating its score and updating the pack object in the database.
 * @param {Object} req - The request object containing the tripId parameter.
 * @param {Object} res - The response object used to send the response.
 * @return {Promise} A promise that resolves to the updated pack object or an error message.
 */
export const scoreTrip = async (req, res, next) => {
    try {

        const { tripId } = req.params;

        const UpdatedTrip = await scoreTripService(tripId)

        res.status(200).json({ msg: 'Pack was scored successfully',UpdatedTrip });
        
    } catch (error) {
        next(UnableToScoreTripError);
    }
}