import { Request, Response } from 'express'
import baseURL from '../../utils'
import { StoreProductModel } from '../../models'
import { WishlistModel } from '../../models'
import { Op, or } from 'sequelize'
import ValidatorController from '../validators'

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
        // order: premium
        //   ? [
        //       ['premium', 'DESC'],
        //       ['category', 'ASC'],
        //     ]
        //   : [['category', 'ASC']],
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

  static getAllWishlistProducts() {}

  static async productAndWishlist(req: Request, res: Response) {
    try {
      const { productId } = req.query
      const token = req.headers.authorization || ''
      const { customerId } = ValidatorController.getCustomerTokenData(
        token,
        res
      )

      const validation = ValidatorController.validateRequiredFields({
        productId,
      })

      if (!validation.valid) {
        return res.status(400).json({
          code: 400,
          message: validation.error,
        })
      }

      // Find the product to add to the wishlist
      const product = await StoreProductModel.findOne({
        where: {
          ProductID: productId,
        },
      })

      if (!product) {
        return res
          .status(400)
          .json({ code: 400, message: 'Продукт не найден!' })
      }

      // Find the customer's wishlist
      const wishlist: any = await WishlistModel.findOne({
        where: { CustomerID: customerId, ProductID: productId },
      })

      if (!wishlist) {
        WishlistModel.create({
          CustomerID: customerId,
          ProductID: productId,
        })
        return res.status(400).json({
          code: 400,
          message: 'Продукт успешно добавлен в список желаний!',
        })
      } else {
        WishlistModel.destroy({
          where: {
            CustomerID: customerId,
            ProductID: productId,
          },
        })
        return res.status(200).json({
          code: 200,
          message: 'Продукт успешно удален из списка желаний!',
        })
      }
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ code: 500, message: 'Внутренняя ошибка сервера!' })
    }
  }
}

export default ProductsController
