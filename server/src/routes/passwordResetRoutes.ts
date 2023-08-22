import express from 'express';
import {
  requestPasswordResetEmailAndToken,
  handlePasswordReset,
} from "../controllers/passwordReset/index";
import { tryCatchWrapper } from "../helpers/tryCatchWrapper";

const router = express.Router();

router.post("/",tryCatchWrapper(requestPasswordResetEmailAndToken));
router.post("/:token", tryCatchWrapper(handlePasswordReset));

export default router;
