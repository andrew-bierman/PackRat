import Item from "../models/itemModel.js";
import Pack from "../models/packModel.js";

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

    const { name, weight, quantity, unit, packId } = req.body;

    const newItem = await Item.create({ name, weight, quantity, unit, packId }); // Create and save the new item

    await Pack.updateOne(
      { _id: req.body.packId },
      { $push: { items: newItem._id } }
    );

    await Item.findByIdAndUpdate(
      newItem._id,
      {
        $addToSet: {
          owners: req.body.ownerId,
          packs: req.body.packId,
        },
      },
      { new: true }
    );

    res.status(200).json({
      msg: "success",
      newItem,
      packId: req.body.packId,
    });
  } catch (error) {
    res.status(404).json({ msg: "Unable to add item" });
  }
};

export const editItem = async (req, res) => {

  try {
    const { _id } = req.body;

    const newItem = await Item.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    });

    res.status(200).json(newItem);
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit item" });
  }
};

export const deleteItem = async (req, res) => {

  try {
    const { itemId } = req.body;

    await Item.findOneAndDelete({ _id: itemId });

    res.status(200).json({ msg: "Item was deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to delete item" });
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
