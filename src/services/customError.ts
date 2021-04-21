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
    code: 4002,
    message: "Error: Invalid userName",
  },
};
