import express from 'express';

// Base Error Class
export class AppError extends Error {
  public errorType: string;
  constructor(
    public statusCode: number,
    public message: string,
    errorType?: string,
  ) {
    super(message);
    this.errorType = errorType || this.constructor.name;
  }

  public toJSON() {
    return {
      error: this.message,
      code: this.statusCode,
    };
  }
}

// 4xx Client Errors
class ClientError extends AppError {
  constructor(message: string, code: number, type: string) {
    super(code, message, type);
  }
}

export class NotFoundError extends ClientError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NotFoundError');
  }
}

export class UnauthorizedError extends ClientError {
  constructor(message = 'Unauthorized access') {
    super(message, 401, 'UnauthorizedError');
  }
}

export class InvalidRequestError extends ClientError {
  constructor(message = 'Invalid request') {
    super(message, 400, 'InvalidRequestError');
  }
}

// Add other 4xx errors here

// 5xx Server Errors
class ServerError extends AppError {
  constructor(message: string, code: number, type: string) {
    super(code, message, type);
  }
}

export class NetworkError extends ServerError {
  constructor(message = 'Network error') {
    super(message, 500, 'NetworkError');
  }
}

// ... and so on for each specific error.
export const ERRORS = {
  AppError: new AppError(500, 'General Error'),
  NotFoundError: new NotFoundError(),
  UnauthorizedError: new UnauthorizedError(),
  PermissionDeniedError: new ServerError(
    'Permission denied',
    403,
    'PermissionDeniedError',
  ),
  TimeoutError: new ServerError('Request timed out', 504, 'TimeoutError'),
  NetworkError: new ServerError('Network error', 500, 'NetworkError'),
  InvalidCredentialsError: new ClientError(
    'Invalid credentials',
    401,
    'InvalidCredentialsError',
  ),
  AuthenticationError: new ClientError(
    'Authentication failed',
    401,
    'AuthenticationError',
  ),
  InvalidTokenError: new ClientError('Invalid token', 401, 'InvalidTokenError'),
  InvalidRequestError: new ClientError(
    'Invalid request',
    400,
    'InvalidRequestError',
  ),
  InvalidResponseError: new ServerError(
    'Invalid response',
    500,
    'InvalidResponseError',
  ),
  MongoError: new ServerError('MongoDB error', 500, 'MongoError'),
  InternalServerError: new ServerError(
    "It's not you, It's us having trouble processing your request",
    500,
    'InternalServerError',
  ),
  ValidationError: new ClientError(
    'Invalid input data',
    422,
    'ValidationError',
  ),
  PackNotFoundError: new ClientError(
    'Pack not found',
    404,
    'PackNotFoundError',
  ),
  UserNotFoundError: new ClientError(
    'User not found',
    404,
    'UserNotFoundError',
  ),
  ItemNotFoundError: new ClientError(
    'Item not found',
    404,
    'ItemNotFoundError',
  ),
  ItemAlreadyExistsError: new ClientError(
    'Item already exists',
    409,
    'ItemAlreadyExistsError',
  ),
  PackAlreadyExistsError: new ClientError(
    'Pack already exists',
    409,
    'PackAlreadyExistsError',
  ),
  TripNotFoundError: new ClientError(
    'Trip not found',
    404,
    'TripNotFoundError',
  ),
  TripAlreadyExistsError: new ClientError(
    'Trip already exists',
    409,
    'TripAlreadyExistsError',
  ),
  UserAlreadyExistsError: new ClientError(
    'User already exists',
    409,
    'UserAlreadyExistsError',
  ),
  EmailAlreadyExistsError: new ClientError(
    'Email already exists',
    409,
    'EmailAlreadyExistsError',
  ),
  InvalidEmailError: new ClientError('Invalid email', 400, 'InvalidEmailError'),
  InvalidPasswordError: new ClientError(
    'Invalid password',
    400,
    'InvalidPasswordError',
  ),
  InvalidCodeError: new ClientError('Invalid code', 400, 'InvalidCodeError'),
  UserFavoritesNotFoundError: new ClientError(
    'User favorites not found',
    404,
    'UserFavoritesNotFoundError',
  ),
  UnableToSendCodeError: new ServerError(
    'Unable to send code',
    500,
    'UnableToSendCodeError',
  ),
  UnableTouUpdatePasswordError: new ServerError(
    'Unable to update password',
    500,
    'UnableTouUpdatePasswordError',
  ),
  ErrorFetchingGeoCodeError: new ServerError(
    'Error fetching GeoCode',
    500,
    'ErrorFetchingGeoCodeError',
  ),
  NoDestinationFoundWithThatIDError: new ClientError(
    'No destination found with that ID',
    404,
    'NoDestinationFoundWithThatIDError',
  ),
  InvalidRequestParamsError: new ClientError(
    'Invalid request parameters',
    400,
    'InvalidRequestParamsError',
  ),
  ErrorProcessingRequestError: new ServerError(
    'Error processing request',
    500,
    'ErrorProcessingRequestError',
  ),
  ErrorProcessingNominatimError: new ServerError(
    'Error processing Nominatim Data',
    500,
    'ErrorProcessingNominatimError',
  ),
  ErrorRetrievingNominatimError: new ServerError(
    'Error retrieving Nominatim Data',
    500,
    'ErrorRetrievingNominatimError',
  ),
  ErrorProcessingOverpassError: new ServerError(
    'Error processing Overpass Data',
    500,
    'ErrorProcessingOverpassError',
  ),
  ErrorRetrievingOverpassError: new ServerError(
    'Error retrieving Overpass Data',
    500,
    'ErrorRetrievingOverpassError',
  ),
  ErrorRetrievingParksOSMError: new ServerError(
    'Error retrieving Parks OSM Data',
    500,
    'ErrorRetrievingParksOSMError',
  ),
  RetrievingPhotonDetailsError: new ServerError(
    'Error retrieving Photon Details',
    500,
    'RetrievingPhotonDetailsError',
  ),
  RetrievingTrailsOSMError: new ServerError(
    'Error retrieving Trails OSM Data',
    500,
    'RetrievingTrailsOSMError',
  ),
  RetrievingParksDataError: new ServerError(
    'Error retrieving Parks Data',
    500,
    'RetrievingParksDataError',
  ),
  RetrievingTrailsDataError: new ServerError(
    'Error retrieving Trails Data',
    500,
    'RetrievingTrailsDataError',
  ),
  UnableToAddItemError: new ServerError(
    'Unable to add item',
    500,
    'UnableToAddItemError',
  ),
  UnableToDeleteItemError: new ServerError(
    'Unable to delete item',
    500,
    'UnableToDeleteItemError',
  ),
  UnableToEditItemError: new ServerError(
    'Unable to edit item',
    500,
    'UnableToEditItemError',
  ),
  GetResponseFromAIError: new ServerError(
    'Unable to get response from AI',
    500,
    'GetResponseFromAIError',
  ),
  FailedToRetrieveUserChats: new ServerError(
    'Failed to retrieve user chats',
    500,
    'FailedToRetrieveUserChats',
  ),
  UnableToDeletePackError: new ServerError(
    'Unable to delete pack',
    500,
    'UnableToDeletePackError',
  ),
  UnableToDuplicatePackError: new ServerError(
    'Unable to duplicate pack',
    500,
    'UnableToDuplicatePackError',
  ),
  UnableToEditPackError: new ServerError(
    'Unable to edit pack',
    500,
    'UnableToEditPackError',
  ),
  UnableToScorePackError: new ServerError(
    'Unable to score pack',
    500,
    'UnableToScorePackError',
  ),
  TemplateNotFoundError: new ClientError(
    'Template not found',
    404,
    'TemplateNotFoundError',
  ),
  UnableToAddTripError: new ServerError(
    'Unable to add trip',
    500,
    'UnableToAddTripError',
  ),
  UnableToDeleteTripError: new ServerError(
    'Unable to delete trip',
    500,
    'UnableToDeleteTripError',
  ),
  UnableToEditTripError: new ServerError(
    'Unable to edit trip',
    500,
    'UnableToEditTripError',
  ),
  RetrievingWeatherFromOpenWeatherError: new ServerError(
    'Error retrieving weather data',
    500,
    'RetrievingWeatherFromOpenWeatherError',
  ),
  UnableToEditUserError: new ServerError(
    'Unable to edit user',
    500,
    'UnableToEditUserError',
  ),
};
