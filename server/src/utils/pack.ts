import Pack from "../models/packModel.js";

export const packValidation = async ({
  name,
  items,
  owner_id,
  is_public,
  favorited_by,
  favorites_count,
  createdAt,
}: { name: string, items: string[], owner_id: string, is_public: boolean, favorited_by: string[], favorites_count: number, createdAt: string }) => {
  if (!name || !owner_id) {
    throw new Error("All fields must be filled");
  }

  const pack = await Pack.create({
    name,
    items,
    owner_id,
    is_public,
    favorited_by,
    favorites_count,
    createdAt,
  });

  return pack;
};
