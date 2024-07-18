import { Hono } from 'hono';
import {
  getDestination,
  getOsm,
  getParksOSM,
  getPhotonResults,
  getTrailsOSM,
  postSingleGeoJSON,
  getPhotonDetails,
} from '../controllers/getOsm/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';

const router = new Hono();

router.get(
  '/photon/search',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getPhotonResults),
);

router.get(
  '/trails',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getTrailsOSM),
);

router.get(
  '/parks',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getParksOSM),
);

router.post(
  '/osm',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getOsm),
);

router.post(
  '/process/geojson',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(postSingleGeoJSON),
);

router.get(
  '/destination/:id',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getDestination),
);

router.get(
  '/photonDetails/:type/:id',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getPhotonDetails),
);

export default router;
