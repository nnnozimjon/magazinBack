import { Model, DataTypes } from 'sequelize'
import sequelize from '../../config/db/index' // Import your Sequelize instance

class CartItems extends Model {
  public CartItemID!: number
  public CustomerID!: number
  public ProductID!: number
  public Quantity!: number
}

const { INTEGER } = DataTypes

CartItems.init(
  {
    CartItemID: {
      primaryKey: true,
      autoIncrement: true,
      type: INTEGER,
      allowNull: false,
    },
    CustomerID: {
      type: INTEGER,
      allowNull: false,
    },
    ProductID: {
      type: INTEGER,
      allowNull: false,
    },
    Quantity: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'CartItems',
    modelName: 'CartItems',
  }
)

const CartItemsModel = CartItems

export default CartItemsModel
