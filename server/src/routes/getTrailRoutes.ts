import express from 'express';
import { getTrails } from '../controllers/getTrail/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';

const router = express.Router();

router.post('/', tryCatchWrapper(getTrails));

export default router;
