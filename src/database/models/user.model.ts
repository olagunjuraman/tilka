"use strict";
import bcrypt from "bcrypt";
import { Model, DataTypes, Sequelize } from "sequelize";
import {
  UserAttributes,
  UserCreationAttributes,
  UserInstance,
} from "../../interfaces/user.interface";

export default class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  id!: string;
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        underscored: true,
        paranoid: true,
      }
    );
  }
}
