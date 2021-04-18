import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const ENVIRONMENT = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const CORS_WHITELIST = process.env.CORS_WHITELIST.split(",");
