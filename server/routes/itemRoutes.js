import express from "express";
import {
  getItems,
  getItemById,
  addItem,
  editItem,
  deleteItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/:packId", getItems);
router.get("/i/:packId", getItemById);
router.post("/", addItem);
router.put("/", editItem);
router.delete("/", deleteItem);

export default router;
