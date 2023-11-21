import { Model, DataTypes } from 'sequelize'
import sequelize from '../../config/db/index'
import OrdersModel from '../Orders' // Import the OrdersModel for the foreign key reference

class PaymentsModel extends Model {
  public PaymentID!: number
  public OrderID!: number
  public PaymentDate!: Date
  public PaymentAmount!: number
  public PaymentMethod!: string

  // You can define associations and methods here
}

PaymentsModel.init(
  {
    PaymentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: OrdersModel, // Reference the OrdersModel for the foreign key
        key: 'OrderID',
      },
    },
    PaymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    PaymentAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    PaymentMethod: {
      type: DataTypes.STRING(50),
    },
  },
  {
    sequelize,
    modelName: 'Payments',
    tableName: 'Payments',
    timestamps: false, // If you want Sequelize to handle timestamps, set this to true
  }
)

export default PaymentsModel
