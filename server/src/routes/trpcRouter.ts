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
import {
  getDestinationRoute,
  getOsmRoute,
  getParksOSMRoute,
  getPhotonResultsRoute,
  getTrailsOSMRoute,
  postSingleGeoJSONRoute,
} from '../controllers/getOsm';

import {
  router as trpcRouter,
  publicProcedure,
  protectedProcedure,
} from '../trpc';
import { z } from 'zod';

export const helloRouter = trpcRouter({
  world: publicProcedure.input(z.string()).query(async ({ input }) => {
    console.log('input', input);
    return `Hello ${input}!`;
  }),
});

export const helloRouter2 = () => {
  return publicProcedure.query(async ({ input }) => {
    console.log('input', input);
    return `Hello ${input}!`;
  });
};

export const appRouter = trpcRouter({
  hello1: trpcRouter({
    world: publicProcedure.query(() => {
      return 'Hello World';
    }),
  }),
  hello2: helloRouter,
  hello3: publicProcedure.query(async (opts) => {
    return 'Hello World';
  }),
  helloRouter2: helloRouter2(),
  protectedHello: protectedProcedure.query(async (opts) => 'Hello World'),
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
  emailExists: emailExistsRoute(),
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
  getPublicPacks: getPublicPacksRoute(), // Done (Sorting by Items is left)
  getPacks: getPacksRoute(), // Done (Sorting by Items is left)
  getPackById: getPackByIdRoute(), // Done
  addPack: addPackRoute(), // Done
  editPack: editPackRoute(), // Done
  deletePack: deletePackRoute(), // Done
  scorePack: scorePackRoute(), // Done
  duplicatePublicPack: duplicatePublicPackRoute(), // Not Implemented
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
  getUserChats: getUserChatsRoute(),
  // item routes
  getItems: getItemsRoute(),
  getItemById: getItemByIdRoute(),
  searchItemsByName: searchItemsByNameRoute(),
  addItem: addItemRoute(), // Done
  editItem: editItemRoute(), // Done
  deleteItem: deleteItemRoute(), // Done
  addItemGlobal: addItemGlobalRoute(), // Done
  getItemsGlobally: getItemsGloballyRoute(), // Done
  addGlobalItemToPack: addGlobalItemToPackRoute(), // Done
  editGlobalItemAsDuplicate: editGlobalItemAsDuplicateRoute(), // Not Implemented
  deleteGlobalItem: deleteGlobalItemRoute(), // Done,
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
