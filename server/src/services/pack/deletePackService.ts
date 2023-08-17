import Pack from "../../models/packModel.ts";

export const deletePackService = async (packId) => {
  await Pack.findOneAndDelete({ _id: packId });

  return { message: "pack was deleted successfully" };
};