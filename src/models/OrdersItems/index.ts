import { Model, DataTypes } from 'sequelize'
import sequelize from '../../config/db/index'
import OrdersModel from '../Orders' // Import the OrdersModel for the foreign key reference
import ProductsModel from '../storeProduct' // Import the ProductsModel for the foreign key reference

class OrderItemsModel extends Model {
  public OrderItemID!: number
  public OrderID!: number
  public storeID!: number
  public ProductID!: number
  public Quantity!: number
  public Subtotal!: number

  // You can define associations and methods here
}

OrderItemsModel.init(
  {
    OrderItemID: {
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
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProductsModel, // Reference the ProductsModel for the foreign key
        key: 'ProductID',
      },
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OrderItems',
    tableName: 'OrderItems',
    timestamps: false, // If you want Sequelize to handle timestamps, set this to true
  }
)

export default OrderItemsModel
