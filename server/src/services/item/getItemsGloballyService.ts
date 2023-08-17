import Item from "../../models/itemModel.ts";

export const getItemsGloballyService = async (req) => {
    const totalItems = await Item.countDocuments({ global: true });
    const limit = Number(req.query.limit) || totalItems;
    const totalPages = Math.ceil(totalItems / limit);
    const page = Number(req.query.page) || 1;
    const startIndex = (page - 1) * limit;
  
    const items = await Item.find({ global: true })
      .populate("category", "name")
      .skip(startIndex)
      .limit(limit)
      .sort({
        createdAt: -1,
      });
  
    return {
      items,
      page,
      totalPages,
    };
  };
  