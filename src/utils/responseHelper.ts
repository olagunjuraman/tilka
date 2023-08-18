import { Response } from "express";

export function successResponse(
  res: Response,
  data: any = {},
  statusCode: number = 200
): void {
  res.status(statusCode).json({
    status: "success",
    code: statusCode,
    data,
  });
}
