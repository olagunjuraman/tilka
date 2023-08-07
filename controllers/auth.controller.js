import AuthService from "../services/auth.service.js";
import asyncHandler from "express-async-handler";

export const signUp = asyncHandler(async (req, res) => {
  const response = await AuthService.signUp(req.body);
  return res.status(201).json({ success: true, data: response });
});

export const login = asyncHandler(async (req, res) => {
  const response = await AuthService.logIn(req.body);
  return res.status(200).json({ success: true, data: response });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const response = await AuthService.refreshAccessToken(req.body);
  return res.status(200).json({ success: true, data: response });
});
