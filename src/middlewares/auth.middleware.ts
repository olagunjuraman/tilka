import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { authenticationError } from "./error.middleware";
import User from "../database/models/user.model";
import { Request, Response, NextFunction } from "express";
import { DecodedUser } from "../types/express";
import config from "../config/config";

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw authenticationError("Not authorized to access this route");
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret) as DecodedUser;
      req.user = await User.findOne({
        where: { id: decoded.userId },
      });
      next();
    } catch (error) {
      throw authenticationError("Not authorized to access this route");
    }
  }
);
