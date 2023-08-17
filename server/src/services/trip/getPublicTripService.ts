import Trip from "../../models/tripModel.ts";

/**
 * Retrieves public trips based on the given query parameter.
 * @param {string} queryBy - The query parameter to sort the trips.
 * @return {Promise<object[]>} The public trips.
 */
export const getPublicTripsService = async (queryBy: string): Promise<object[]> => {
  try {
    let publicTripsPipeline: any[] = [
      {
        $match: { is_public: true },
      },
      {
        $lookup: {
          from: "packs", // name of the foreign collection
          localField: "_id",
          foreignField: "trips",
          as: "packs",
        },
      },
      {
        $lookup: {
          from: 'users', // Replace 'users' with the actual name of your 'User' collection
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
    ];

    if (queryBy === "Favorite") {
      publicTripsPipeline.push({ $sort: { favorites_count: -1 } });
    } else {
      publicTripsPipeline.push({ $sort: { _id: -1 } });
    }

    const publicTrips = await Trip.aggregate(publicTripsPipeline);

    return publicTrips;
  } catch (error) {
    console.error(error);
    throw new Error("Trips cannot be found");
  }
};