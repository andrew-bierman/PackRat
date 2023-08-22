import express from "express";
import { getStaticMapPreview } from "../controllers/map";

const router = express.Router();

router.get("/static/*", getStaticMapPreview);

export default router;
