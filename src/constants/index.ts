// Http status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// Common error messages
export const ERROR_MESSAGES = {
  CLIENT_NOT_FOUND: "Client not found",
  ACCOUNT_NOT_FOUND: "Account not found",
  MOVEMENT_NOT_FOUND: "Movement not found",
  ACCOUNT_NOT_BELONG_TO_CLIENT: "The account don't belong to the specified user",
  VALIDATION_FAILED: "Invalid JSON format",
  SERVER_ERROR: "Something went wrong! :(",
};
