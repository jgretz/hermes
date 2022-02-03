import {Request, Response, NextFunction} from 'express';

export const enforceKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!process.env.AUTH_KEY || req.headers.auth_key === process.env.AUTH_KEY) {
    next();
    return;
  }

  res.status(403).send();
};
