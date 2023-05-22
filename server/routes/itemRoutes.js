import express from "express";
import {
  getItems,
  getItemById,
  addItem,
  editItem,
  deleteItem,
  searchItemsByName,
} from "../controllers/itemController.js";
import * as validator from "../middleware/validators/index.js"

const router = express.Router();

router.get("/packItems/:packId", validator.getItems, getItems);
router.get("/i/:packId", validator.getItemById, getItemById);
router.get("/search", searchItemsByName)
router.post("/", validator.addItem, addItem);
router.put("/", validator.editItem, editItem);
router.delete("/", validator.deleteItem, deleteItem);

export default router;
