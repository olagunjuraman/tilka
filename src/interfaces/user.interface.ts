import { Model, Optional } from "sequelize";

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}
export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}
