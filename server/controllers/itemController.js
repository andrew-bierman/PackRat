import Item from "../models/itemModel.js";
import Pack from "../models/packModel.js";

export const getItems = async (req, res) => {
  const { packId } = req.params;

  try {
    const items = await Item.find({ packId });

    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ msg: "Items cannot be found" });
  }
};

export const getItemById = async (req, res) => {
  const { _id } = req.body;

  try {
    const item = await Item.findById({ _id });

    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ msg: "Item cannot be found" });
  }
};

export const addItem = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);

    await Pack.updateOne(
      { _id: req.body.packId },
      { $push: { items: newItem._id } }
    );
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to add item" });
  }
};

export const editItem = async (req, res) => {
  const { _id } = req.body;

  try {
    const newItem = await Item.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    });

    res.status(200).json(newItem);
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit item" });
  }
};

export const deleteItem = async (req, res) => {
  const { itemId } = req.body;
  try {
    await Item.findOneAndDelete({ _id: itemId });

    res.status(200).json({ msg: "Item was deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to delete item" });
  }
};
