import Trip from '../../models/tripModel';
import { convertCursorToObjectId } from '../../helpers/objectId';

/**
 * Retrieves public trips based on the given query parameter.
 * @param {string} queryBy - The query parameter to sort the trips.
 * @return {Promise<object[]>} The public trips.
 */
export const getPublicTripsService = async (
  queryBy: string,
  type: string,
  pageSize: number,
  cursor: number
): Promise<object[]> => {
  try {
    const publicTripsPipeline: any[] = [
      {
        $match: { is_public: true },
      },
      {
        $lookup: {
          from: 'packs',
          localField: '_id',
          foreignField: 'trips',
          as: 'packs',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner_id',
          foreignField: '_id',
          as: 'owner',
        },
      },
      {
        $addFields: {
          owner: { $arrayElemAt: ['$owner', 0] },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          duration: 1,
          weather: 1,
          start_date: 1,
          end_date: 1,
          destination: 1,
          'owner._id': 1,
          'owner.username': 1,
          'packs._id': 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ];

    if (queryBy === 'Favorite') {
      publicTripsPipeline.push({ $sort: { favorites_count: -1 } });
    } else if (type === 'pagination') {
      const objectIdCursor = convertCursorToObjectId(cursor)
      publicTripsPipeline.push({
        $match: {
          _id: { $gt: objectIdCursor },
        },
      });
      publicTripsPipeline.push({ $limit: pageSize });
    }
    else {
      publicTripsPipeline.push({ $sort: { _id: -1 } });
    }

    const publicTrips = await Trip.aggregate(publicTripsPipeline);

    return publicTrips;
  } catch (error) {
    console.error(error);
    throw new Error('Trips cannot be found');
  }
};
