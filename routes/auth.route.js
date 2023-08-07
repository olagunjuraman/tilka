import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import {
  signUp,
  login,
  refreshAccessToken,
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/signup").post(
  celebrate({
    body: Joi.object({
      firstName: Joi.string().trim().required(),
      lastName: Joi.string().trim().required(),
      email: Joi.string().trim().email().lowercase().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  signUp
);

router.route("/login").post(
  celebrate({
    body: Joi.object({
      email: Joi.string().trim().email().lowercase().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);

router.route("/refreshToken").post(
  celebrate({
    body: Joi.object({
      refreshToken: Joi.string().required(),
    }),
  }),
  refreshAccessToken
);

export default router;
