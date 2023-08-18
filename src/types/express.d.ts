import { UserInstance } from "../src/models/user.interface";

export interface DecodedUser {
  userId: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserInstance;
    }
  }
}
