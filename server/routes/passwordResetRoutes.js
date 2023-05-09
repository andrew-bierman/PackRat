import express from "express";
import {
    requestPasswordResetEmailAndToken,
    handlePasswordReset
} from "../controllers/passwordResetController.js";

const router = express.Router();

router.post("/", requestPasswordResetEmailAndToken);
router.post("/:token", handlePasswordReset)

export default router;