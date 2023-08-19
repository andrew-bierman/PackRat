import Pack from "../../models/packModel";

export async function getPublicPacksService(queryBy: string) {
  try {
    let publicPacksPipeline: any = [
      {
        $match: { is_public: true },
      },
      {
        $lookup: {
          from: "items",
          localField: "_id",
          foreignField: "packs",
          as: "items",
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

    return publicPacks;
  } catch (error) {
    throw new Error("Packs cannot be found: " + error.message);
  }
}
