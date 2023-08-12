import Item from "../../models/itemModel.js";

/**
 * Searches for items by name.
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query string parameters.
 * @param {string} req.query.name - The name to search for.
 * @param {Object} res - The response object.
 * @return {Array} An array of items matching the search criteria.
 */
export const searchItemsByName = async (req, res) => {
    console.log(req.query.name);
    try {
      const items = await Item.find({
        name: { $regex: `.*${req.query.name}.*`, $options: "i" },
      });
      res.status(200).json(items);
    } catch (error) {
      res
        .status(404)
        .json({ msg: "Items cannot be found", "req.query": req.query });
    }
  };