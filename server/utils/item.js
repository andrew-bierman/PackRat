import Item from "../models/itemModel.js";

export const itemValidation = async ({ name, weight, quantity, unit, packId }) => {

    if (!name || !weight || !quantity || !unit || !packId) {
        throw new Error("All fields must be filled");
    }

    const item = await Item.create({
        name,
        weight,
        quantity,
        unit,
        packId
    });

    return item;
};