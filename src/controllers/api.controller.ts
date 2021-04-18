import { Response, Request } from "express";

export const getApi = (req: Request, res: Response) => {
  res.status(200).json({ success: "true" });
};
