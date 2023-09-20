import { Request, Response } from 'express'
import baseURL from '../../utils'
import { StoreProductModel } from '../../models'
import { WishlistModel } from '../../models'
import { Op } from 'sequelize'

class ProductsController {
  static async getAllProducts(req: Request, res: Response) {
    try {
      const {
        page = 1,
        pageSize = 10,
        userId,
        productName,
        category,
        premium,
        minPrice,
        maxPrice,
        color,
        size,
      } = req.query

      // Define options for Sequelize query
      const options: any = {
        limit: pageSize,
        offset: (Number(page) - 1) * Number(pageSize),
        where: {
          ...(productName && {
            ProductName: {
              [Op.like]: `%${productName}%`,
            },
          }),
          ...(minPrice && {
            Price: {
              [Op.gte]: minPrice,
            },
          }),
          ...(maxPrice && {
            Price: {
              [Op.lte]: maxPrice,
            },
          }),
          ...(color && {
            Color: color,
          }),
          ...(size && {
            Size: size,
          }),
          ...(category && {
            Catagory: category,
          }),
          ...(premium && {
            Premium: premium,
          }),
        },
        order: [
          ['premium', 'DESC'],
          ['category', 'ASC'],
        ],
      }

      // Query the database using Sequelize
      const products = await StoreProductModel.findAll(options)

      const userWishlist = await WishlistModel.findAll({
        ...(userId && {
          where: { CustomerID: userId },
        }),
      })

      const wishlistStatusMap: Record<number, boolean> = {}

      // Initialize the map with default values
      userId &&
        products.forEach(product => {
          wishlistStatusMap[product.ProductID] = false
        })

      // Update the map with wishlist status
      userId &&
        userWishlist.forEach(wishlistItem => {
          wishlistStatusMap[wishlistItem.ProductID] = true
        })

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
          ...(userId && {
            isWishlisted: wishlistStatusMap[product.ProductID],
          }),
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
