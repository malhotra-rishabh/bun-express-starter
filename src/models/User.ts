import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { getDatabase } from '../config/database';

export interface UserAttributes {
  id: bigint;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id?: bigint;
  declare name: string;
  declare email: string;
  declare password: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name cannot be empty' },
        len: {
          args: [2, 50],
          msg: 'Name must be between 2 and 50 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Invalid email format' },
        notEmpty: { msg: 'Email cannot be empty' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password cannot be empty' },
        len: {
          args: [6, 100],
          msg: 'Password must be between 6 and 100 characters'
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    sequelize: getDatabase(),
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ]
  }
);

export default User; 