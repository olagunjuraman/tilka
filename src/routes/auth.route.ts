import { Request, Response, NextFunction, Router } from "express";
import { celebrate, Joi } from "celebrate";
import AuthController from "../controllers/auth.controller";
import { successResponse } from "../utils/responseHelper";

class AuthRoutes {
  public router: Router;
  private authController: AuthController;

  constructor(authController: AuthController) {
    this.router = Router();
    this.authController = authController;

    // Bind the methods to the instance of the class
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);

    this.routes();
  }

  private async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authController.registerUser(req.body);
      successResponse(res, result);
    } catch (error) {
      next(error);
    }
  }

  private async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authController.loginUser(req.body);
      successResponse(res, result);
    } catch (error) {
      next(error);
    }
  }

  private routes() {
    this.router.route("/signup").post(
      celebrate({
        body: Joi.object({
          firstName: Joi.string().trim().required(),
          lastName: Joi.string().trim().required(),
          email: Joi.string().trim().email().lowercase().required(),
          password: Joi.string().min(6).required(),
        }),
      }),
      this.signUp
    );

    this.router.route("/login").post(
      celebrate({
        body: Joi.object({
          email: Joi.string().trim().email().lowercase().required(),
          password: Joi.string().required(),
        }),
      }),
      this.login
    );
  }
}

const authController = new AuthController();
export default new AuthRoutes(authController).router;
