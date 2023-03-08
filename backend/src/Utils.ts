import {NextFunction, Request, RequestHandler, Response} from "express";

export const tryCatch = (func: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await func(req, res, next);
  } catch (error) {
    return next(error);
  }
}