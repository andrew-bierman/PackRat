import Pack from "../../models/packModel.js";

/**
 * Adds a new pack to the database.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @return {Promise} A promise that resolves to the created pack.
 */
export const addPack = async (req, res) => {
    try {
      const { name, owner_id } = req.body;
  
      const newPack = {
        // ...packBody,
        name: name,
        owner_id: owner_id,
        items: [],
        is_public: false,
        favorited_by: [],
        favorites_count: 0,
        createdAt: new Date(),
        owners: [owner_id],
      };
  
      console.log("newPack", newPack);
  
      const exists = await Pack.find({ name: name });
  
      // if (exists[0]?.name?.toLowerCase() === name.toLowerCase()) {
      //   throw new Error("Pack already exists");
      // }
  
      const createdPack = await Pack.create(newPack);
      res.status(200).json({ msg: "success", createdPack });
    } catch (error) {
      res.status(404).json({ msg: error.msg });
    }
  };