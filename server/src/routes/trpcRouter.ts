import { getPhotonDetailsRoute } from './../controllers/getOsm/getPhotonDetails';

import { googleSigninRoute } from '../controllers/passport/signInGoogle';

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
  refreshTokenRoute,
  logoutRoute,
} from '../controllers/auth';
import { getWeatherRoute } from '../controllers/weather';
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
  getSimilarPacksRoute,
  scorePackRoute,
} from '../controllers/pack';

import {
  getAIResponseRoute,
  getUserChatsRoute,
  getAISuggestionsRoute,
} from '../controllers/openAi';
import {
  addGlobalItemToPackRoute,
  addItemGlobalRoute,
  importItemsGlobalRoute,
  addItemRoute,
  importItemsRoute,
  deleteGlobalItemRoute,
  deleteItemRoute,
  editGlobalItemAsDuplicateRoute,
  editItemRoute,
  getItemByIdRoute,
  getItemImagesRoute,
  getItemsGloballyRoute,
  getItemsRoute,
  searchItemsByNameRoute,
  getSimilarItemsRoute,
  importFromBucketRoute,
} from '../controllers/item';
import { getTrailsRoute } from '../controllers/getTrail';
import { getParksRoute } from '../controllers/getParks';
import { getGeoCodeRoute } from '../controllers/geoCode';
import {
  addToFavoriteRoute,
  getFavoritePacksByUserRoute,
  getUserFavoritesRoute,
} from '../controllers/favorite';
import {
  getDestinationRoute,
  getOsmRoute,
  getParksOSMRoute,
  getPhotonResultsRoute,
  getTrailsOSMRoute,
  postSingleGeoJSONRoute,
} from '../controllers/getOsm';
import {
  getPublicFeedRoute,
  getUserPacksFeedRoute,
  getUserTripsFeedRoute,
} from '../modules/feed';
import {
  getPackTemplatesRoute,
  getPackTemplateRoute,
  createPackFromTemplateRoute,
} from '../controllers/packTemplates';

import { router as trpcRouter } from '../trpc';

import { getOfflineMapsRoute, saveOfflineMapRoute } from '../modules/map';

export const appRouter = trpcRouter({
  getUserById: getUserByIdRoute(),
  signIn: userSignInRoute(),
  signUp: signUpRoute(),
  logout: logoutRoute(),
  refreshToken: refreshTokenRoute(),
  resetPassword: resetPasswordRoute(),
  getGoogleAuthURL: getGoogleAuthURLRoute(),
  googleSignin: googleSigninRoute(),
  editUser: editUserRoute(),
  deleteUser: deleteUserRoute(),
  getMe: getMeRoute(),
  emailExists: emailExistsRoute(),
  checkCode: checkCodeRoute(),
  getUsers: getUsersRoute(),
  resetPasswordEmail: sentEmailRoute(),
  updatePassword: updatePasswordRoute(),
  // weather routes
  getWeather: getWeatherRoute(),
  // feed routes
  getPublicFeed: getPublicFeedRoute(),
  getUserPacksFeed: getUserPacksFeedRoute(),
  getUserTripsFeed: getUserTripsFeedRoute(),
  // map routes
  getOfflineMaps: getOfflineMapsRoute(),
  saveOfflineMap: saveOfflineMapRoute(),
  // trips routes
  getPublicTripsRoute: getPublicTripsRoute(),
  getTrips: getTripsRoute(),
  getTripById: getTripByIdRoute(),
  addTrip: addTripRoute(),
  editTrip: editTripRoute(),
  deleteTrip: deleteTripRoute(),
  // templates routes
  getPackTemplates: getPackTemplatesRoute(),
  getPackTemplate: getPackTemplateRoute(),
  createPackFromTemplate: createPackFromTemplateRoute(),
  getTemplates: getTemplatesRoute(),
  getTemplateById: getTemplateByIdRoute(),
  addTemplate: addTemplateRoute(),
  editTemplate: editTemplateRoute(),
  deleteTemplate: deleteTemplateRoute(),
  // password reset routes
  requestPasswordResetEmailAndToken: requestPasswordResetEmailAndTokenRoute(),
  handlePasswordReset: handlePasswordResetRoute(),
  // packs routes
  getPublicPacks: getPublicPacksRoute(), // Done (Sorting by Items is left)
  getPacks: getPacksRoute(), // Done (Sorting by Items is left)
  getPackById: getPackByIdRoute(), // Done
  addPack: addPackRoute(), // Done
  editPack: editPackRoute(), // Done
  deletePack: deletePackRoute(), // Done
  scorePack: scorePackRoute(), // Done
  duplicatePublicPack: duplicatePublicPackRoute(), // Not Implemented
  getSimilarPacks: getSimilarPacksRoute(),
  // osm routes - currently breaking tests, see patch file
  getPhotonResults: getPhotonResultsRoute(),
  getTrailsOSM: getTrailsOSMRoute(),
  getParksOSM: getParksOSMRoute(),
  getOsm: getOsmRoute(),
  postSingleGeoJSON: postSingleGeoJSONRoute(),
  getDestination: getDestinationRoute(),
  getPhotonDetails: getPhotonDetailsRoute(),
  // open ai routes
  getAIResponse: getAIResponseRoute(),
  getAISuggestions: getAISuggestionsRoute(),
  getUserChats: getUserChatsRoute(),
  // item routes
  getItems: getItemsRoute(),
  getItemById: getItemByIdRoute(),
  getItemImages: getItemImagesRoute(),
  searchItemsByName: searchItemsByNameRoute(),
  addItem: addItemRoute(), // Done
  importItems: importItemsRoute(), // Done
  editItem: editItemRoute(), // Done
  deleteItem: deleteItemRoute(), // Done
  addItemGlobal: addItemGlobalRoute(), // Done
  importItemsGlobal: importItemsGlobalRoute(), // Done
  getItemsGlobally: getItemsGloballyRoute(), // Done
  addGlobalItemToPack: addGlobalItemToPackRoute(), // Done
  editGlobalItemAsDuplicate: editGlobalItemAsDuplicateRoute(), // Not Implemented
  deleteGlobalItem: deleteGlobalItemRoute(), // Done,
  getSimilarItems: getSimilarItemsRoute(),
  importFromBucket: importFromBucketRoute(),
  // trails routes
  getTrails: getTrailsRoute(),
  // // parks route
  getParks: getParksRoute(),
  // geo code routes
  getGeoCode: getGeoCodeRoute(),
  // // favorite routes
  addToFavorite: addToFavoriteRoute(),
  getUserFavorites: getUserFavoritesRoute(),
  getFavoritePacksByUser: getFavoritePacksByUserRoute(),
});

export type AppRouter = typeof appRouter;
