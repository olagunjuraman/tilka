"use strict";
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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../database/models/index");
const error_middleware_1 = require("../middlewares/error.middleware");
const config_1 = __importDefault(require("../config/config"));
class AuthService {
    signUp(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password } = input;
            const existingUser = yield index_1.User.findOne({
                where: {
                    email: email,
                },
            });
            if (existingUser) {
                throw (0, error_middleware_1.badRequestError)("Email already in use");
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield index_1.User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.default.jwt.secret, {
                expiresIn: config_1.default.jwt.expiresIn,
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
        });
    }
    logIn(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            const user = yield index_1.User.findOne({
                where: {
                    email: email,
                },
            });
            if (!user) {
                throw (0, error_middleware_1.badRequestError)("Invalid email or password");
            }
            const valid = yield bcrypt_1.default.compare(password, user.password);
            if (!valid) {
                throw (0, error_middleware_1.badRequestError)("Invalid email or password");
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.default.jwt.secret, {
                expiresIn: config_1.default.jwt.expiresIn,
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
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map