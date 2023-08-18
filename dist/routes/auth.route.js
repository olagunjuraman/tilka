"use strict";
// import { Request, Response, NextFunction, Router } from "express";
// import { celebrate, Joi } from "celebrate";
// import AuthController from "../controllers/auth.controller";
// import { successResponse } from "../utils/responseHelper";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// class AuthRoutes {
//   public router: Router;
//   private authController: AuthController;
//   constructor(authController: AuthController) {
//     this.router = Router();
//     this.authController = authController;
//     // Bind the methods to the instance of the class
//     this.signUp = this.signUp.bind(this);
//     this.login = this.login.bind(this);
//     this.routes();
//   }
//   private async signUp(req: Request, res: Response, next: NextFunction) {
//     try {
//       const result = await this.authController.registerUser(req.body);
//       successResponse(res, result);
//     } catch (error) {
//       next(error);
//     }
//   }
//   private async login(req: Request, res: Response, next: NextFunction) {
//     try {
//       const result = await this.authController.loginUser(req.body);
//       successResponse(res, result);
//     } catch (error) {
//       next(error);
//     }
//   }
//   private routes() {
//     this.router.route("/signup").post(
//       celebrate({
//         body: Joi.object({
//           firstName: Joi.string().trim().required(),
//           lastName: Joi.string().trim().required(),
//           email: Joi.string().trim().email().lowercase().required(),
//           password: Joi.string().min(6).required(),
//         }),
//       }),
//       this.signUp
//     );
//     this.router.route("/login").post(
//       celebrate({
//         body: Joi.object({
//           email: Joi.string().trim().email().lowercase().required(),
//           password: Joi.string().required(),
//         }),
//       }),
//       this.login
//     );
//   }
// }
// const authController = new AuthController();
// export default new AuthRoutes(authController).router;
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const responseHelper_1 = require("../utils/responseHelper");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.default();
        this.routes();
    }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.authController.registerUser(req.body);
                (0, responseHelper_1.successResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.authController.loginUser(req.body);
                (0, responseHelper_1.successResponse)(res, result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    routes() {
        this.router.route("/signup").post((0, celebrate_1.celebrate)({
            body: celebrate_1.Joi.object({
                firstName: celebrate_1.Joi.string().trim().required(),
                lastName: celebrate_1.Joi.string().trim().required(),
                email: celebrate_1.Joi.string().trim().email().lowercase().required(),
                password: celebrate_1.Joi.string().min(6).required(),
            }),
        }), (req, res, next) => this.signUp(req, res, next));
        this.router.route("/login").post((0, celebrate_1.celebrate)({
            body: celebrate_1.Joi.object({
                email: celebrate_1.Joi.string().trim().email().lowercase().required(),
                password: celebrate_1.Joi.string().required(),
            }),
        }), (req, res, next) => this.login(req, res, next));
    }
}
exports.default = new AuthRoutes().router;
//# sourceMappingURL=auth.route.js.map