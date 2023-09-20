import { Model, DataTypes } from 'sequelize'
import sequelize from '../../config/db/index'
import CustomersModel from '../Customers'
import StoreProductModel from '../storeProduct'

class WishlistModel extends Model {
  public WishlistID!: number
  public CustomerID!: number
  public ProductID!: number
}

const { INTEGER } = DataTypes

WishlistModel.init(
  {
    WishlistID: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    CustomerID: {
      type: INTEGER,
      allowNull: false,
    },

    ProductID: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'WishlistModel',
    tableName: 'Wishlists',
  }
)

export default WishlistModel
