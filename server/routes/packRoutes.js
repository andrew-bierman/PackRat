import express from "express";
import {
  getPacks,
  getPackById,
  addPack,
  editPack,
  deletePack,
  getPublicPacks,
} from "../controllers/packController.js";
import * as validator from "../middleware/validators/index.js"

const router = express.Router();

router.get("/", getPublicPacks);
router.get("/:ownerId", validator.getPacks, getPacks);
router.get("/p/:packId", validator.getPackById, getPackById);
router.post("/", validator.addPack, addPack);
router.put("/", validator.editPack, editPack);
router.delete("/", validator.deletePack, deletePack);

export default router;
