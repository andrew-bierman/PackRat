import Pack from "../../models/packModel.ts";

/**
 * Retrieves public packs based on the given query parameter.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} - a promise that resolves with the retrieved public packs
 */
export const getPublicPacks = async (req, res) => {
    try {
      const { queryBy } = req.query;
  
      let publicPacksPipeline = [
        {
          $match: { is_public: true },
        },
        {
          $lookup: {
            from: "items", // name of the foreign collection
            localField: "_id",
            foreignField: "packs",
            as: "items",
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
            total_weight: {
              $sum: {
                $map: {
                  input: "$items",
                  as: "item",
                  in: { $multiply: ["$$item.weight", "$$item.quantity"] },
                },
              },
            },
            owner: { $arrayElemAt: ['$owner', 0] },
          },
        },
      ];
  
      if (queryBy === "Favorite") {
        publicPacksPipeline.push({ $sort: { favorites_count: -1 } });
      } else {
        publicPacksPipeline.push({ $sort: { _id: -1 } });
      }
  
      const publicPacks = await Pack.aggregate(publicPacksPipeline);
  
      res.status(200).json(publicPacks);
    } catch (error) {
      res.status(404).json({ msg: "Packs cannot be found" });
    }
  };