import Trip from "../../models/tripModel.ts";

/**
 * Retrieves public trips based on the given query parameter.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The public trips as a JSON response.
 */
export const getPublicTrips = async (req, res) => {
    try {
      const { queryBy } = req.query;
  
      let publicTripsPipeline = [
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
  
      res.status(200).json(publicTrips);
    } catch (error) {
      res.status(404).json({ msg: "Trips cannot be found" });
    }
  };