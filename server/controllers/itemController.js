import { ItemCategoryModel } from "../models/itemCategory.js";
import Item from "../models/itemModel.js";
import Pack from "../models/packModel.js";
import { ItemCategory, ItemCategoryEnum } from "../utils/itemCategory.js";

export const getItems = async (req, res) => {
  try {
    const { packId } = req.params;

    const items = await Item.find({ packs: packId });

    return res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ msg: "Items cannot be found" });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { _id } = req.body;

    const item = await Item.findById({ _id });

    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ msg: "Item cannot be found" });
  }
};

export const addItem = async (req, res) => {
  try {
    const { name, weight, quantity, unit, packId, type } = req.body;

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
          owners: req.body.ownerId,
        },
      },
      { new: true }
    ).populate("category");

    res.status(200).json({
      msg: "success",
      newItem: updatedItem,
      packId: packId,
    });
  } catch (error) {
    res.status(404).json({ msg: "Unable to add item", error: error.message });
  }
};

export const editItem = async (req, res) => {
  try {
    const { _id, name, weight, unit, quantity, type } = req.body;
    const category = await ItemCategoryModel.findOne({
      name: type,
    });
    let newItem = await Item.findOneAndUpdate(
      { _id },
      {
        name,
        weight,
        unit,
        quantity,
        category: category.id,
      },
      {
        returnOriginal: false,
      }
    ).populate("category", "name");

    res.status(200).json(newItem);
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit item" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    const { packId } = req.body;
    let itemDeleted;

    const item = await Item.findById(itemId);

    if (item.global) {
      // remove the item from pack list
      await Pack.updateOne({ _id: packId }, { $pull: { items: itemId } });
      //update the individual item

      await Item.updateOne(
        {
          _id: itemId,
        },
        {
          $pull: {
            packs: packId,
          },
        }
      );
      itemDeleted = await Item.findById(itemId);
    } else {
      itemDeleted = await Item.findByIdAndDelete({ _id: itemId });
    }

    res.status(200).json(itemDeleted);
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: "Unable to delete item" + error.message });
  }
};

export const deleteGlobalItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const itemDeleted = await Item.findByIdAndDelete(itemId);

    res.status(200).json({
      data: itemDeleted,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: "Unable to delete item " + error.message });
  }
};

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
// need to change the name
export const addItemGlobal = async (req, res) => {
  try {
    const { name, weight, quantity, unit, type } = req.body;

    let category = null;
    let newItem = null;
    // need to look into below logic. open window issue
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
          category: category._id,
          global: true,
        });
        newItem = await Item.findById(newItem.id).populate("category", "name");

        break;
      }
      case ItemCategoryEnum.WATER: {
        category = await ItemCategoryModel.findOne({
          name: ItemCategoryEnum.WATER,
        });
        newItem = await Item.create({
          name,
          weight,
          quantity: 1,
          unit,
          category: category._id,
          global: true,
        });
        newItem = await Item.findById(newItem.id).populate("category", "name");
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
          category: category._id,
          global: true,
        });

        newItem = await Item.findById(newItem.id).populate("category", "name");

        break;
      }
    }

    res.status(200).json({
      msg: "success",
      newItem: newItem,
    });
  } catch (error) {
    res.status(404).json({ msg: "Unable to add item", error: error.message });
  }
};

export const getItemsGlobally = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    const startIndex = (page - 1) * limit;

    const totalItems = await Item.countDocuments({ global: true });
    const totalPages = Math.ceil(totalItems / limit);

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

export const addGlobalItemToPack = async (req, res) => {
  try {
    const { packId } = req.params;
    const { itemId } = req.body;
    const { ownerId } = req.body;

    const item = await Item.findById(itemId);

    await Pack.updateOne({ _id: packId }, { $addToSet: { items: item._id } });

    await Item.findByIdAndUpdate(
      item._id,
      {
        $addToSet: {
          owners: ownerId,
        },
      },
      { new: true }
    );

    await Item.findByIdAndUpdate(
      item._id,
      {
        $addToSet: {
          packs: packId,
        },
      },
      { new: true }
    );

    return res.status(200).json({ message: "succesfully updated", data: item });
  } catch (error) {
    res.status(404).json({ msg: "Items cannot be found" });
  }
};

export const editGlobalItemAsDuplicate = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { packId, name, weight, quantity, unit, type } = req.body;

    let category = await ItemCategoryModel.findOne({
      name: type,
    });
    // duplicate the item with new changes
    let newItem = await Item.create({
      name,
      weight,
      unit,
      quantity,
      category: category._id,
      global: false,
      packs: [packId],
    });
    // add to pack list
    await Pack.updateOne(
      { _id: packId },
      { $addToSet: { items: newItem._id } }
    );
    // remove the already added item from pack list
    await Pack.updateOne({ _id: packId }, { $pull: { items: itemId } });
    //update the individual item

    await Item.updateOne(
      {
        _id: itemId,
      },
      {
        $pull: {
          packs: packId,
        },
      }
    );

    return res.status(200).send("succesfully updated");
  } catch (error) {
    res.status(404).json({ msg: "Items cannot be found" });
  }
};
