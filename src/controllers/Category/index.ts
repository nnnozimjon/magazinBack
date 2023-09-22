import { Request, Response } from 'express'
import { CategoryModel, SubcategoryModel } from '../../models'

class CategoriesController {
  static async getCategoriesWithSubcategories(req: Request, res: Response) {
    try {
      const categories = await CategoryModel.findAll({
        include: [
          {
            model: SubcategoryModel,
            as: 'subcategories',
          },
        ],
      })

      const refreshedCategories = categories.map((cat: any) => {
        const subcategories = cat?.subcategories.map((sub: any) => {
          return {
            subCategoryId: sub.SubcategoryID,
            subCategoryName: sub.SubcategoryName,
          }
        })
        return {
          categoryId: cat.CategoryID,
          categoryName: cat.CategoryName,
          subCategories: subcategories,
        }
      })

      res.status(200).json({
        code: 200,
        message: 'Все категории успешно прошли!',
        payload: refreshedCategories,
      })
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: error,
      })
    }
  }
}

export default CategoriesController
