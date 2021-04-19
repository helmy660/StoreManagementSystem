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
    code: 4007,
    message: "Error: Invalid data in request body",
  },
};
