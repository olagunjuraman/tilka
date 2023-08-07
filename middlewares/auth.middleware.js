import jwt from "jsonwebtoken";

import asyncHandler from "express-async-handler";
import { authenticationError, badRequestError } from "./error.middleware.js";
import User from "../models/user.model.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    throw authenticationError("Not authorized to access this route");
  }
});

export const protectAdmin = asyncHandler(async (req, res, next) => {
  await protect(req, res, () => {});

  if (req.user && req.user.role === "admin") {
    next(); // If the user is an admin, allow them to proceed
  } else {
    throw authenticationError("Not authorized as an admin");
  }
});
