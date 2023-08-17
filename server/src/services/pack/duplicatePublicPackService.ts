import Pack from "../../models/packModel.ts";

export const duplicatePublicPackService = async (packId, ownerId, items) => {
  let pack = await Pack.findById(packId);
  if (!pack) {
    throw new Error("Pack not found");
  }

  pack = await Pack.create({
    name: pack.name,
    items: items,
    owner_id: pack.owner_id,
    is_public: false,
    favorited_by: pack.favorited_by,
    favorites_count: pack.favorites_count,
    createdAt: new Date().toISOString(),
    owners: [...pack.owners, ownerId],
    grades: { ...pack.grades },
    scores: { ...pack.scores },
    type: pack.type,
  });

  return { pack };
};