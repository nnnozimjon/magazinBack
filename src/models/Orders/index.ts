import { Model, DataTypes } from 'sequelize'
import sequelize from '../../config/db/index'
import CustomersModel from '../Customers'

class OrdersModel extends Model {
  public OrderID!: number
  public CustomerID!: number
  public OrderDate!: Date
  public TotalAmount!: number
  public ShippingAddress!: string | null
  public OrderStatus!: 'Pending' | 'Shipped' | 'Delivered'

  // You can define associations and methods here
}

OrdersModel.init(
  {
    OrderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CustomersModel, // Reference the CustomersModel for the foreign key
        key: 'CustomerId',
      },
    },
    OrderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    TotalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    ShippingAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    OrderStatus: {
      type: DataTypes.ENUM('Pending', 'Shipped', 'Delivered'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Orders',
    tableName: 'Orders',
    timestamps: false, // If you want Sequelize to handle timestamps, set this to true
  }
)

export default OrdersModel
