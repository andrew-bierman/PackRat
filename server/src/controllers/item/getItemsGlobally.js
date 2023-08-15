import Item from "../../models/itemModel.js";

/**
 * Retrieves globally available items.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The items, page, and total pages.
 */
export const getItemsGlobally = async (req, res) => {
    try {
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
  
      return res.status(200).json({
        items,
        page,
        totalPages,
      });
    } catch (error) {
      res.status(404).json({ msg: "Items cannot be found" });
    }
  };