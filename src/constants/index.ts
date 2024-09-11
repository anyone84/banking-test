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

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  CLIENT_NOT_FOUND: "Cliente no encontrado",
  ACCOUNT_NOT_FOUND: "Cuenta no encontrada",
  MOVEMENT_NOT_FOUND: "Movimiento no encontrado",
  ACCOUNT_NOT_BELONG_TO_CLIENT:
    "La cuenta no pertenece al cliente especificado",
  VALIDATION_FAILED: "El json es invalido",
  SERVER_ERROR: "Algo ha fallado",
};
