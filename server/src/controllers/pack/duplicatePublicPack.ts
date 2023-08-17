import Pack from "../../models/packModel.ts";

/**
 * Duplicates a public pack.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} - a promise that resolves with the duplicated pack
 */
export const duplicatePublicPack = async (req, res) => {
    try {
      const { packId, ownerId, items } = req.body;
  
      let pack = await Pack.findById(packId);
      if (!pack) {
        // Pack with specified ID not found
        return res.status(404).json({ error: "Pack not found" });
      }
  
      pack = await Pack.create({
        name: pack.name,
        items: items,
        owner_id: pack.owner_id,
        is_public: false,
        favorited_by: pack.favorited_by,
        favorites_count: pack.favorites_count,
        createdAt: new Date().toISOString(),
        owners: [pack.owners, ownerId],
        grades: { ...pack.grades },
        scores: { ...pack.scores },
        type: pack.type,
      });
      res
        .status(200)
        .json({ msg: "pack was duplicated successfully", data: pack });
    } catch (error) {
      res.status(404).json({ msg: "Unable to duplicate pack" + error });
    }
  };
