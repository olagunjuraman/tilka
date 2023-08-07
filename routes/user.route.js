import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import {
  setTransactionPin,
  transfer,
  fetchUsers,
} from "../controllers/user.controller.js";

import { protect, protectAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/transfer").post(
  celebrate({
    body: Joi.object({
      transactionPin: Joi.string().length(4).required(),
      amount: Joi.number().positive().required(),
      accountNumber: Joi.string().required(),
    }),
  }),
  protect,
  transfer
);

router.route("/setPin").post(
  celebrate({
    body: Joi.object({
      pin: Joi.string().length(4).required(),
      verifyPin: Joi.string().length(4).required(),
    }),
  }),
  protect,
  setTransactionPin
);

router.route("/").get(protectAdmin, fetchUsers);

export default router;
