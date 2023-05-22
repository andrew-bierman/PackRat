import express from "express";
import {
  getPacks,
  getPackById,
  addPack,
  editPack,
  deletePack,
  getPublicPacks,
} from "../controllers/packController.js";

const router = express.Router();

router.get("/", getPublicPacks);
router.get("/:ownerId", getPacks);
router.get("/p/:packId", getPackById);
router.post("/", addPack);
router.put("/", editPack);
router.delete("/", deletePack);

export default router;
