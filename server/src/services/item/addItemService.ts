import Item from "../../models/itemModel.ts";
import Pack from "../../models/packModel.ts";
import { ItemCategoryModel } from "../../models/itemCategory.ts";
import { ItemCategoryEnum } from "../../utils/itemCategory.ts";

export const addItemService = async (name, weight, quantity, unit, packId, type, ownerId) => {
    let category = null;
    let newItem = null;

    switch (type) {
        case ItemCategoryEnum.FOOD: {
            category = await ItemCategoryModel.findOne({
                name: ItemCategoryEnum.FOOD,
            });

            newItem = await Item.create({
                name,
                weight,
                quantity,
                unit,
                packs: [packId],
                category: category._id,
            });

            break;
        }
        case ItemCategoryEnum.WATER: {
            category = await ItemCategoryModel.findOne({
                name: ItemCategoryEnum.WATER,
            });

            let existingWaterItem = await Item.findOne({
                category: category._id,
                packs: packId,
            });

            if (existingWaterItem) {
                existingWaterItem.weight += Number(weight); // Ensure weight is treated as a number
                await existingWaterItem.save();
                newItem = existingWaterItem;
            } else {
                newItem = await Item.create({
                    name,
                    weight,
                    quantity: 1,
                    unit,
                    packs: [packId],
                    category: category._id,
                });
            }

            break;
        }
        default: {
            category = await ItemCategoryModel.findOne({
                name: ItemCategoryEnum.ESSENTIALS,
            });

            newItem = await Item.create({
                name,
                weight,
                quantity,
                unit,
                packs: [packId],
                category: category._id,
            });

            break;
        }
    }
    await Pack.updateOne(
        { _id: packId },
        { $addToSet: { items: newItem._id } }
    );

    const updatedItem = await Item.findByIdAndUpdate(
        newItem._id,
        {
            $addToSet: {
                owners: ownerId,
            },
        },
        { new: true }
    ).populate("category");

    return { newItem: updatedItem, packId: packId };
};
