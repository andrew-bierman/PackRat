import express from "express";
import { getParks } from "../controllers/getParksController.js";

import { validate } from "../middleware/validation.js";
import parkSchemas  from "../utils/validationSchemas/parksSchema.js";

const router = express.Router();

router.get("/", validate(parkSchemas.getParks, "query" ), getParks);

export default router;
