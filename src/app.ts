import express, { Request, Response, NextFunction } from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import morgan from "morgan";
import helmet from "helmet";
import noCache from "nocache";
import { CORS_WHITELIST, PORT } from "./util/secrets";
import { connectDatabase } from "./services";

// Create Express server
const app = express();
connectDatabase();

// Import Routes
import apiRoute from "./routes/api.route";
import productRoute from "./routes/product.route";

// Express configuration
app.set("port", PORT || 3003);
app.set("etag", false);
app.use(morgan("combined"));
app.use(helmet());
app.use(noCache());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string;
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

  if (!Object.values(CORS_WHITELIST).includes(origin)) {
    console.log(`CORS rejected request from ${origin}`);
    return res.status(403).json({ success: false, message: "CORS Error not Authorized" });
  }
  res.setHeader("Access-Control-Allow-Origin", origin);
  next();
});

app.use("/api", apiRoute);
app.use("/api/product", productRoute);

app.use(function (err: Error, req: Request, res: Response, next: any) {
  console.error(err);
  const errorResponse = {
    success: false,
    data: {
      message: err.message,
    },
  };
  if (err.name === "CustomError") res.status(400).json(errorResponse);
  else {
    errorResponse.data.message = "Internal error";
    res.status(500).json(errorResponse);
  }
});

export default app;
