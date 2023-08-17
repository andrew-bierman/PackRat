import Pack from "../../models/packModel.ts";

export const addPackService = async (name, owner_id) => {
  const newPack = {
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

  const createdPack = await Pack.create(newPack);

  return { createdPack };
};