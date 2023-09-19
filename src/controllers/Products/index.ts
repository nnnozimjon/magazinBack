import { Request, Response } from 'express'
import Api from '../../constants'
import baseURL from '../../utils'
import { StoreProductModel } from '../../models'

class ProductsController {
  static async getAllProducts(req: Request, res: Response) {
    try {
      const { page, pageSize, category, premium } = req.query

      // Define options for Sequelize query
      const options: any = {
        limit: pageSize,
        offset: (Number(page) - 1) * Number(pageSize),
      }

      //   if (category) {
      //     options.where = { category }
      //   }

      //   if (premium) {
      //     // Assuming "premium" or "top" is a boolean value
      //     options.where = { ...options.where, premium: premium === 'true' }
      //   }

      // Query the database using Sequelize
      const products = await StoreProductModel.findAll(options)

      const dataTobeSent = products.map(product => {
        const images = product.Images?.map(e => {
          return (
            baseURL + '/api/v1/partner-store/product/store-product-image/' + e
          )
        })

        return {
          productId: product.ProductID,
          productName: product.ProductName,
          description: product.Description,
          price: product.Price,
          discount: product.Discount,
          images: images,
        }
      })

      res.status(200).json({
        code: 200,
        message: 'Все товары успешно доставлены!',
        payload: dataTobeSent,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ code: 500, error: 'Внутренняя ошибка сервера!' })
    }
  }
}

export default ProductsController
