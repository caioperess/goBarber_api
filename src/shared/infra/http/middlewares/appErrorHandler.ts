import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

export default function HandleAppErrors(
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction,
) {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'ERROR', message: err.message });
  }

  return res
    .status(500)
    .json({ status: 'ERROR', message: 'Internal server error' });
}
