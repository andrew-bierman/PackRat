export const NotFoundError = { statusCode: 404, message: 'Resource not found' };
export const UnauthorizedError = {
  statusCode: 401,
  message: 'Unauthorized access',
};
export const PermissionDeniedError = {
  statusCode: 403,
  message: 'Permission denied',
};
export const TimeoutError = { statusCode: 504, message: 'Request timed out' };
export const NetworkError = { statusCode: 500, message: 'Network error' };
export const InvalidCredentialsError = {
  statusCode: 401,
  message: 'Invalid credentials',
};
export const AuthenticationError = {
  statusCode: 401,
  message: 'Authentication failed',
};
export const InvalidTokenError = { statusCode: 401, message: 'Invalid token' };
export const InvalidRequestError = {
  statusCode: 400,
  message: 'Invalid request',
};
export const InvalidResponseError = {
  statusCode: 500,
  message: 'Invalid response',
};
export const MongoError = { statusCode: 500, message: 'MongoDB error' };
export const InternalServerError = {
  statusCode: 500,
  message: "It's not you, It's us having trouble processing your request",
};
export const ValidationError = {
  statusCode: 422,
  message: 'Invalid input data',
};
export const PackNotFoundError = { statusCode: 404, message: 'Pack not found' };
export const UserNotFoundError = { statusCode: 404, message: 'User not found' };
export const ItemNotFoundError = { statusCode: 404, message: 'Item not found' };
export const ItemAlreadyExistsError = {
  statusCode: 409,
  message: 'Item already exists',
};
export const PackAlreadyExistsError = {
  statusCode: 409,
  message: 'Pack already exists',
};
export const TripNotFoundError = { statusCode: 404, message: 'Trip not found' };
export const TripAlreadyExistsError = {
  statusCode: 409,
  message: 'Trip already exists',
};
export const UserAlreadyExistsError = {
  statusCode: 409,
  message: 'User already exists',
};
export const EmailAlreadyExistsError = {
  statusCode: 409,
  message: 'Email already exists',
};
export const InvalidEmailError = { statusCode: 400, message: 'Invalid email' };
export const InvalidPasswordError = {
  statusCode: 400,
  message: 'Invalid password',
};
export const InvalidCodeError = { statusCode: 400, message: 'Invalid code' };
export const UserFavoritesNotFoundError = {
  statusCode: 404,
  message: 'User favorites not found',
};
export const UnableToSendCodeError = {
  statusCode: 500,
  message: 'Unable to send code',
};
export const UnableTouUpdatePasswordError = {
  statusCode: 500,
  message: 'Unable to update password',
};
export const ErrorFetchingGeoCodeError = {
  statusCode: 500,
  message: 'Error fetching GeoCode',
};
export const NoDestinationFoundWithThatIDError = {
  statusCode: 404,
  message: 'No destination found with that ID',
};
export const InvalidRequestParamsError = {
  statusCode: 400,
  message: 'Invalid request parameters',
};
export const ErrorProcessingRequestError = {
  statusCode: 500,
  message: 'Error processing request',
};
export const ErrorProcessingNominatimError = {
  statusCode: 500,
  message: 'Error processing Nominatim Data',
};
export const ErrorRetrievingNominatimError = {
  statusCode: 500,
  message: 'Error retrieving Nominatim Data',
};
export const ErrorProcessingOverpassError = {
  statusCode: 500,
  message: 'Error processing Overpass Data',
};
export const ErrorRetrievingOverpassError = {
  statusCode: 500,
  message: 'Error retrieving Overpass Data',
};
export const ErrorRetrievingParksOSMError = {
  statusCode: 500,
  message: 'Error retrieving Parks OSM Data',
};
export const RetrievingPhotonDetailsError = {
  statusCode: 500,
  message: 'Error retrieving Photon Details',
};
export const RetrievingTrailsOSMError = {
  statusCode: 500,
  message: 'Error retrieving Trails OSM Data',
};
export const RetrievingParksDataError = {
  statusCode: 500,
  message: 'Error retrieving Parks Data',
};
export const RetrievingTrailsDataError = {
  statusCode: 500,
  message: 'Error retrieving Trails Data',
};
export const UnableToAddItemError = {
  statusCode: 500,
  message: 'Unable to add item',
};
export const UnableToDeleteItemError = {
  statusCode: 500,
  message: 'Unable to delete item',
};
export const UnableToEditItemError = {
  statusCode: 500,
  message: 'Unable to edit item',
};
export const GetResponseFromAIError = {
  statusCode: 500,
  message: 'Unable to get response from AI',
};
export const FailedToRetrieveUserChats = {
  statusCode: 500,
  message: 'Failed to retrieve user chats',
};
export const UnableToDeletePackError = {
  statusCode: 500,
  message: 'Unable to delete pack',
};
export const UnableToDuplicatePackError = {
  statusCode: 500,
  message: 'Unable to duplicate pack',
};
export const UnableToEditPackError = {
  statusCode: 500,
  message: 'Unable to edit pack',
};
export const UnableToScorePackError = {
  statusCode: 500,
  message: 'Unable to score pack',
};
export const TemplateNotFoundError = {
  statusCode: 404,
  message: 'Template not found',
};
export const UnableToAddTripError = {
  statusCode: 500,
  message: 'Unable to add trip',
};
export const UnableToDeleteTripError = {
  statusCode: 500,
  message: 'Unable to delete trip',
};
export const UnableToEditTripError = {
  statusCode: 500,
  message: 'Unable to edit trip',
};
export const RetrievingWeatherFromOpenWeatherError = {
  statusCode: 500,
  message: 'Error retrieving weather data',
};
export const UnableToEditUserError = {
  statusCode: 500,
  message: 'Unable to edit user',
};
export const MapNotFoundError = { statusCode: 404, message: 'Map not found' };
export const UnableToAddMapError = {
  statusCode: 500,
  message: 'Unable to add map',
};
export const UnableToDeleteMapError = {
  statusCode: 500,
  message: 'Unable to delete map',
};
export const UnableToEditMapError = {
  statusCode: 500,
  message: 'Unable to edit map',
};
