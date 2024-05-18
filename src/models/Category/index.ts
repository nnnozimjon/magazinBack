import { Model, DataTypes } from 'sequelize'
import sequelize from '../../config/db/index' // Import your Sequelize instance

class Categories extends Model {
  public CategoryID!: number
  public CategoryName!: string
}

Categories.init(
  {
    CategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    CategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Categories',
    tableName: 'Categories',
  }
)

class Subcategories extends Model {
  public SubcategoryID!: number
  public SubcategoryName!: string
  public MainCategoryID!: number
}

Subcategories.init(
  {
    SubcategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    SubcategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MainCategoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Subcategories',
    tableName: 'Subcategories',
  }
)

Subcategories.belongsTo(Categories, {
  foreignKey: 'mainCategoryId',
  as: 'mainCategory',
})

Categories.hasMany(Subcategories, {
  foreignKey: 'mainCategoryId',
  as: 'subcategories',
})

export { Categories as CategoryModel, Subcategories as SubcategoryModel }
