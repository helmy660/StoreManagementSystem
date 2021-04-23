interface ICustomError {
  code: number;
  message: string;
}

export class CustomError extends Error {
  constructor(error: ICustomError) {
    super(error.message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.message = error.message;
    this.code = error.code;
    this.name = "CustomError";
  }
  public code: number;
}

export const ErrorTypes = {
  INVALID_REQUEST_BODY: {
    code: 4001,
    message: "Error: Invalid data in request body",
  },
  INVALID_CREDENTIALS: {
    code: 4002,
    message: "Error: Invalid userName or password",
  },
  INVALID_USERNAME: {
    code: 4003,
    message: "Error: Invalid userName",
  },
  INVALID_USER_ID: {
    code: 4004,
    message: "Error: Invalid user id",
  },
  USER_NOT_AUTHORIZED: {
    code: 4005,
    message: "Error: This User is not authorized to perform this action",
  },
};
