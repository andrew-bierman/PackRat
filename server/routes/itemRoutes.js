import express from "express";
import {
  getItems,
  getItemById,
  addItem,
  editItem,
  deleteItem,
  searchItemsByName
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/:packId", getItems);
router.get("/i/:packId", getItemById);
router.get("/search", searchItemsByName)
router.post("/", addItem);
router.put("/", editItem);
router.delete("/", deleteItem);

export default router;
