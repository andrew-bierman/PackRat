import express from "express";
import {
  getUsers,
  getUserById,
  addUser,
  editUser,
  deleteUser,
  login,
  addToFavorite,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", addUser);
router.post("/login", login);
router.post("/favorite", addToFavorite);
router.put("/", editUser);
router.delete("/", deleteUser);

export default router;
