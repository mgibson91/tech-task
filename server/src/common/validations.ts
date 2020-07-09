import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export class CustomError extends Error {
  name: string;

  /**
   * Calls Error super constructor and captures stack trace
   * @param {string} message - The error message that should be used for the output.
   */
  constructor(message: string) {
    super(message);
    this.name = (this.constructor as any).name;
    (Error as any).captureStackTrace(this, this.constructor);
  }
}

/**
 * Error which can return an array of express validation errors
 */
export class ExpressValidationError extends CustomError {
  errors: object[];

  constructor(errors: object[]) {
    super('');
    Object.setPrototypeOf(this, ExpressValidationError.prototype);
    this.errors = errors;
  }
}

/**
 * Execute any specified express validations on the request
 * @param req
 * @param res
 * @param next
 */
export function executeValidations(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ExpressValidationError(errors.array() as any[]);
  }

  next();
}

