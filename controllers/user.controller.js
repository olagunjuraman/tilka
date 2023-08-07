import UserService from "../services/user.service.js";
import asyncHandler from "express-async-handler";

export const transfer = asyncHandler(async (req, res) => {
  const response = await UserService.transfer(req.user.id, req.body);
  return res.status(200).json(response);
});

export const setTransactionPin = asyncHandler(async (req, res) => {
  const response = await UserService.setTransactionPin(req.user.id, req.body);
  return res.status(200).json(response);
});

export const fetchUsers = asyncHandler(async (req, res) => {
  const response = await UserService.fetchUsers();
  return res.status(200).json(response);
});
