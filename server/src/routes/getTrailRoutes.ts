import express from 'express';
import { getTrails } from '../controllers/getTrail/index';

const router = express.Router();

router.post('/', getTrails);

export default router;
