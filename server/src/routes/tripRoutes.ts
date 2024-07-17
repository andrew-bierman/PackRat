import { Hono } from 'hono';
import {
  getPublicTrips,
  getTrips,
  getTripById,
  addTrip,
  editTrip,
  deleteTrip,
} from '../controllers/trip/index';
import * as validator from '@packrat/validations';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';

const router = new Hono();

router.get(
  '/',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getPublicTrips),
);

router.get(
  '/:ownerId',
  authTokenMiddleware as any,
  zodParser(validator.getTrips, 'params'),
  tryCatchWrapper(getTrips),
);

router.get(
  '/t/:tripId',
  authTokenMiddleware as any,
  zodParser(validator.getTripById, 'params'),
  tryCatchWrapper(getTripById),
);

router.post(
  '/',
  authTokenMiddleware as any,
  zodParser(validator.addTrip, 'body'),
  tryCatchWrapper(addTrip),
);

router.put(
  '/',
  authTokenMiddleware as any,
  zodParser(validator.editTrip, 'body'),
  tryCatchWrapper(editTrip),
);

router.delete(
  '/',
  authTokenMiddleware as any,
  zodParser(validator.deleteTrip, 'body'),
  tryCatchWrapper(deleteTrip),
);

export default router;
