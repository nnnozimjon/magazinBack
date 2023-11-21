import { Model, DataTypes } from 'sequelize'
import sequelize from '../../config/db/index'
import WishlistModel from '../Wishlists'

class StoreProductModel extends Model {
  public ProductID!: number
  public ProductName!: string
  public Description!: string
  public Price!: number
  public StockQuantity!: number
  public CategoryID!: number
  public Images?: string[]
  public storeID!: number
  public Size?: string[]
  public Color?: string[]
  public Discount?: number

  static associate(models: any) {
    StoreProductModel.belongsTo(models.PartnerStore, {
      foreignKey: 'StoreID',
      as: 'store',
    })
  }
}

const { INTEGER, JSON, STRING, TEXT } = DataTypes

StoreProductModel.init(
  {
    ProductID: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ProductName: {
      type: STRING,
      allowNull: false,
    },
    Description: {
      type: TEXT,
      allowNull: false,
    },
    Price: {
      type: INTEGER,
      allowNull: false,
    },
    Discount: {
      type: INTEGER,
      allowNull: true,
    },
    CategoryID: {
      type: INTEGER,
      allowNull: false,
    },
    StockQuantity: {
      type: INTEGER,
      allowNull: false,
    },
    Images: {
      type: JSON,
      allowNull: false,
    },
    storeID: {
      type: INTEGER,
      allowNull: false,
    },
    Size: {
      type: JSON,
      allowNull: true,
    },
    Color: {
      type: JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'StoreProductModel',
    tableName: 'Products',
  }
)

export default StoreProductModel
