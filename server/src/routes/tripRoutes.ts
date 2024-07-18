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
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getPublicTrips),
);

router.get(
  '/:ownerId',
  authTokenMiddleware,
  zodParser(validator.getTrips, 'params'),
  tryCatchWrapper(getTrips),
);

router.get(
  '/t/:tripId',
  authTokenMiddleware,
  zodParser(validator.getTripById, 'params'),
  tryCatchWrapper(getTripById),
);

router.post(
  '/',
  authTokenMiddleware,
  zodParser(validator.addTrip, 'body'),
  tryCatchWrapper(addTrip),
);

router.put(
  '/',
  authTokenMiddleware,
  zodParser(validator.editTrip, 'body'),
  tryCatchWrapper(editTrip),
);

router.delete(
  '/',
  authTokenMiddleware,
  zodParser(validator.deleteTrip, 'body'),
  tryCatchWrapper(deleteTrip),
);

export default router;
