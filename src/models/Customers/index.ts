import { Model, DataTypes } from 'sequelize'
import sequelize from '../../config/db/index'

class CustomersModel extends Model {
  public CustomerId!: number
  public Email!: string
  public PhoneNumber!: string
  public Username!: string
  public Password!: string
  public createdAt!: Date

  // You can define associations and methods here
}

CustomersModel.init(
  {
    CustomerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    Email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.STRING(20),
    },

    Password: {
      type: DataTypes.STRING(255),
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Customers',
    tableName: 'Customers',
    timestamps: false, // If you want Sequelize to handle timestamps, set this to true
  }
)

export default CustomersModel
