import { NextFunction, Request, Response } from "express";

const notFound = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(404).send({ errors: [{ message: "Resource not found" }] });
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err?.message;

  //   Check for Mongoose
  if (err?.name === "CaseError") {
    message = "Resource not found";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "" : err?.stack,
  });
};

export { notFound, errorHandler };
