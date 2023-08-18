import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../database/models/index";
import { badRequestError } from "../middlewares/error.middleware";
import config from "../config/config";

export default class AuthService {
  async signUp(input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const { firstName, lastName, email, password } = input;

    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw badRequestError("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user.id }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    const userObject = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      user: userObject,
      token,
    };
  }

  async logIn(input: { email: string; password: string }) {
    const { email, password } = input;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw badRequestError("Invalid email or password");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw badRequestError("Invalid email or password");
    }

    const token = jwt.sign({ userId: user.id }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    const userObject = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      user: userObject,
      token,
    };
  }
}
