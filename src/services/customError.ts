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
  INVALID_ACTION: {
    code: 4006,
    message: "Error: Failed to perform this action",
  },
  CUSTOMER_ALREADY_HAS_CART: {
    code: 4007,
    message: "Error: This User already has an existing cart",
  },
  CART_NOT_EXISTING: {
    code: 4008,
    message: "Error: No carts are found",
  },
  INVALID_CART_SUSBEND: {
    code: 4009,
    message: "Error: Failed to susbend this cart",
  },
  INVALID_CART: {
    code: 4010,
    message: "Error: Invalid cart",
  },
  CART_SUSBENDED: {
    code: 4011,
    message: "Error: This cart is susbended",
  },
  INVALID_QUANTITY: {
    code: 4012,
    message: "Error: No sufficient quantity for this product",
  },
  INVALID_PRODUCT: {
    code: 4013,
    message: "Error: Invalid product",
  },
  Empty_CART: {
    code: 4014,
    message: "Error: Cart is already empty",
  },
};
