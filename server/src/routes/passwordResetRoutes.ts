import express from "express";
import {
  requestPasswordResetEmailAndToken,
  handlePasswordReset,
} from "../controllers/passwordReset/index";

const router = express.Router();

router.post("/", requestPasswordResetEmailAndToken);
router.post("/:token", handlePasswordReset);

export default router;
