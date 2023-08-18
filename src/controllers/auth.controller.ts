import {
  RegisterInterface,
  LoginInterface,
} from "../interfaces/auth.interface";
import logger from "../logger";
import AuthService from "../services/auth.service";

export default class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async registerUser(input: RegisterInterface) {
    try {
      return await this.authService.signUp(input);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  public async loginUser(input: LoginInterface) {
    try {
      return await this.authService.logIn(input);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
