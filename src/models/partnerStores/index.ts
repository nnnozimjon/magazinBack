import { Model, DataTypes } from 'sequelize'
import sequelize from '../../config/db/index'

class PartnerStore extends Model {
  public StoreID!: number
  public StoreName!: string
  public Username!: string
  public Email!: string
  public PhoneNumber!: string | null
  public BrandIconURL!: string | null
  public HeaderPhotoURL!: string | null
  public CityAddress!: string | null
  public StoreAddress!: string | null
  public Password!: string
  public Currency!: 'TJS' | 'Somoni'
  public AcceptTerms!: boolean
  // Timestamps will be automatically added: createdAt, updatedAt
}

PartnerStore.init(
  {
    StoreID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    StoreName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    BrandIconURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    HeaderPhotoURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CityAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    StoreAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Currency: {
      type: DataTypes.ENUM('TJS', 'Somoni'),
      allowNull: false,
    },
    AcceptTerms: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'PartnerStore',
    tableName: 'PartnerStores', // Make sure this matches your table name
  }
)

export default PartnerStore
