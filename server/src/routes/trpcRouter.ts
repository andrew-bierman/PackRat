import { getPhotonDetailsRoute } from './../controllers/getOsm/getPhotonDetails';

import { googleSigninRoute } from '../controllers/passport';
import { router as trpcRouter, createCallerFactory } from '../trpc';

import {
  userSignInRoute,
  getUsersRoute,
  getUserByIdRoute,
  signUpRoute,
  resetPasswordRoute,
  getGoogleAuthURLRoute,
  editUserRoute,
  deleteUserRoute,
  getMeRoute,
  sentEmailRoute,
} from '../controllers/user';
import {
  checkCodeRoute,
  emailExistsRoute,
  updatePasswordRoute,
} from '../controllers/auth';
import { getWeatherRoute, getWeatherWeekRoute } from '../controllers/weather';
import {
  addTripRoute,
  deleteTripRoute,
  editTripRoute,
  getPublicTripsRoute,
  getTripByIdRoute,
  getTripsRoute,
} from '../controllers/trip';
import {
  addTemplateRoute,
  deleteTemplateRoute,
  editTemplateRoute,
  getTemplateByIdRoute,
  getTemplatesRoute,
} from '../controllers/template';
import {
  handlePasswordResetRoute,
  requestPasswordResetEmailAndTokenRoute,
} from '../controllers/passwordReset';
import {
  addPackRoute,
  deletePackRoute,
  duplicatePublicPackRoute,
  editPackRoute,
  getPackByIdRoute,
  getPacksRoute,
  getPublicPacksRoute,
  scorePackRoute,
} from '../controllers/pack';
import {
  getDestinationRoute,
  getOsmRoute,
  getParksOSMRoute,
  getPhotonResultsRoute,
  getTrailsOSMRoute,
  postSingleGeoJSONRoute,
} from '../controllers/getOsm';
import { getAIResponseRoute, getUserChatsRoute } from '../controllers/openAi';
import {
  addGlobalItemToPackRoute,
  addItemGlobalRoute,
  addItemRoute,
  deleteGlobalItemRoute,
  deleteItemRoute,
  editGlobalItemAsDuplicateRoute,
  editItemRoute,
  getItemByIdRoute,
  getItemsGloballyRoute,
  getItemsRoute,
  searchItemsByNameRoute,
} from '../controllers/item';
import { getTrailsRoute } from '../controllers/getTrail';
import { getParksRoute } from '../controllers/getParks';
import { getGeoCodeRoute } from '../controllers/geoCode';
import {
  addToFavoriteRoute,
  getFavoritePacksByUserRoute,
  getUserFavoritesRoute,
} from '../controllers/favorite';

export const appRouter = trpcRouter({
  // user routes
  getUserById: getUserByIdRoute(),
  signIn: userSignInRoute(),
  signUp: signUpRoute(),
  resetPassword: resetPasswordRoute(),
  getGoogleAuthURL: getGoogleAuthURLRoute(),
  googleSignin: googleSigninRoute(),
  editUser: editUserRoute(),
  deleteUser: deleteUserRoute(),
  getMe: getMeRoute(),
  emaileExists: emailExistsRoute(),
  checkCode: checkCodeRoute(),
  getUsers: getUsersRoute(),
  resetPasswordEmail: sentEmailRoute(),
  updatePassword: updatePasswordRoute(),
  // weather routes
  getWeather: getWeatherRoute(),
  getWeatherWeek: getWeatherWeekRoute(),
  // trips routes
  getPublicTripsRoute: getPublicTripsRoute(),
  getTrips: getTripsRoute(),
  getTripById: getTripByIdRoute(),
  addTrip: addTripRoute(),
  editTrip: editTripRoute(),
  deleteTrip: deleteTripRoute(),
  // templates routes
  getTemplates: getTemplatesRoute(),
  getTemplateById: getTemplateByIdRoute(),
  addTemplate: addTemplateRoute(),
  editTemplate: editTemplateRoute(),
  deleteTemplate: deleteTemplateRoute(),
  // password reset routes
  requestPasswordResetEmailAndToken: requestPasswordResetEmailAndTokenRoute(),
  handlePasswordReset: handlePasswordResetRoute(),
  // packs routes
  getPublicPacks: getPublicPacksRoute(),
  getPacks: getPacksRoute(),
  getPackById: getPackByIdRoute(),
  addPack: addPackRoute(),
  editPack: editPackRoute(),
  deletePack: deletePackRoute(),
  scorePack: scorePackRoute(),
  duplicatePublicPack: duplicatePublicPackRoute(),
  // osm routes
  getPhotonResults: getPhotonResultsRoute(),
  getTrailsOSM: getTrailsOSMRoute(),
  getParksOSM: getParksOSMRoute(),
  getOsm: getOsmRoute(),
  postSingleGeoJSON: postSingleGeoJSONRoute(),
  getDestination: getDestinationRoute(),
  getPhotonDetails: getPhotonDetailsRoute(),
  // open ai routes
  getAIResponse: getAIResponseRoute(),
  getUserChats: getUserChatsRoute(),
  // item routes
  getItems: getItemsRoute(),
  getItemById: getItemByIdRoute(),
  searchItemsByName: searchItemsByNameRoute(),
  addItem: addItemRoute(),
  editItem: editItemRoute(),
  deleteItem: deleteItemRoute(),
  addItemGlobal: addItemGlobalRoute(),
  getItemsGlobally: getItemsGloballyRoute(),
  addGlobalItemToPack: addGlobalItemToPackRoute(),
  editGlobalItemAsDuplicate: editGlobalItemAsDuplicateRoute(),
  deleteGlobalItem: deleteGlobalItemRoute(),
  // trails routes
  getTrails: getTrailsRoute(),
  // parks route
  getParks: getParksRoute(),
  // geo code routes
  getGeoCode: getGeoCodeRoute(),
  // favorite routes
  addToFavorite: addToFavoriteRoute(),
  getUserFavorites: getUserFavoritesRoute(),
  getFavoritePacksByUser: getFavoritePacksByUserRoute(),
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
