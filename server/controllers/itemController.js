import Item from "../models/itemModel.js";
import Pack from "../models/packModel.js";
import Joi from "joi";
import { JoiObjectId } from "../utils/validator.js"

export const getItems = async (req, res) => {
  try {
    // console.log(1, req.query, 2, req.params, 3, req.body);
    const { packId } = req.params;

    // validate data
    const bodySchema = Joi.object({
      packId: JoiObjectId().required(),
    });
    const { error } = bodySchema.validate(req.params);
    if (error) {
      // return error if validation failed
      return res.status(400).send(error.details[0].message);
    }

    const items = await Item.find({ packs: packId });

    return res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ msg: "Items cannot be found" });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { _id } = req.body;

    const bodySchema = Joi.object({
      _id: JoiObjectId().required(),
    });
    const { error } = bodySchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const item = await Item.findById({ _id });

    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ msg: "Item cannot be found" });
  }
};

export const addItem = async (req, res) => {
  try {
    const { name, weight, quantity, unit, packId } = req.body;

    const bodySchema = Joi.object({
      name: Joi.string.required(),
      weight: Joi.string.required(),
      quantity: Joi.string.required(),
      unit: Joi.string.required(),
      packId: JoiObjectId().required(),
    });
    const { error } = bodySchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

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

    const bodySchema = Joi.object({
      _id: JoiObjectId().required(),
    });
    const { error } = bodySchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

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

    const bodySchema = Joi.object({
      itemId: JoiObjectId().required(),
    });
    const { error } = bodySchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    await Item.findOneAndDelete({ _id: itemId });

    res.status(200).json({ msg: "Item was deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to delete item" });
  }
};

export const searchItemsByName = async (req, res) => {
  console.log(req.query.name);
  try {
    const items = await Item.find({ name: { $regex: `.*${req.query.name}.*`, $options: 'i' } });
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ msg: "Items cannot be found", 'req.query': req.query });
  }
}

