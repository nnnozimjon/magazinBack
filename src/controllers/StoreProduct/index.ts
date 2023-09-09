import { Request, Response } from 'express'
import ValidatorController from '../validators'
import { StoreProductModel } from '../../models/index'

class StoreProduct {
  static async createProduct(req: Request, res: Response) {
    const token = req.headers.authorization || ''
    const { storeID } = ValidatorController.getTokenData(token, res)
    const {
      name,
      description,
      price,
      category,
      color,
      size,
      stockQuantity,
      discount,
    } = req.body

    const requiredFields = {
      name,
      description,
      stockQuantity,
      price,
      category,
    }

    const files: any = req.files
    const storeFiles = files && files['file']

    const validation =
      ValidatorController.validateRequiredFields(requiredFields)

    if (!storeFiles || !Array.isArray(storeFiles) || storeFiles.length === 0) {
      return res.json({
        code: 400,
        message: 'Требуется минимум одна фотография товара!',
      })
    }

    if (!validation.valid) {
      for (let i = 0; i <= storeFiles.length - 1; i++) {
        ValidatorController.deleteFile(storeFiles[i], 'storeProductsImages')
      }
      return res.status(400).json({
        code: 400,
        message: validation.error,
      })
    }

    const images = storeFiles.map(file => {
      return file?.filename
    })

    try {
      const newProduct = await StoreProductModel.create({
        ProductName: name,
        Description: description,
        Price: price,
        Discount: discount,
        CategoryID: category,
        StockQuantity: stockQuantity,
        Images: images,
        storeID: storeID,
        Size: size,
        Color: color,
      })

      if (newProduct) {
        res.status(200).json({
          code: 200,
          message: 'Продукт успешно создан!!',
        })
      } else {
        for (let i = 0; i <= storeFiles.length - 1; i++) {
          ValidatorController.deleteFile(storeFiles[i], 'storeProductsImages')
        }
        res.status(500).json({
          code: 500,
          message: 'Внутренняя ошибка сервера!',
        })
      }
    } catch (error) {
      for (let i = 0; i <= storeFiles.length - 1; i++) {
        ValidatorController.deleteFile(storeFiles[i], 'storeProductsImages')
      }
      return res.status(500).json({
        code: 500,
        message: error,
      })
    }
  }

  static async editProduct(req: Request, res: Response) {
    const token = req.headers.authorization || ''
    const { storeID } = ValidatorController.getTokenData(token, res)
    const { id: productID } = req.params
    const {
      name,
      description,
      price,
      category,
      color,
      size,
      stockQuantity,
      discount,
    } = req.body

    const requiredFields = {
      name,
      description,
      stockQuantity,
      price,
      category,
      productID,
    }

    // fields validation
    const validation =
      ValidatorController.validateRequiredFields(requiredFields)

    if (!validation.valid) {
      return res.status(400).json({
        code: 400,
        message: validation.error,
      })
    }

    try {
      const updatedProduct = await StoreProductModel.update(
        {
          ProductName: name,
          Description: description,
          Price: price,
          Discount: discount,
          CategoryID: category,
          StockQuantity: stockQuantity,
          storeID: storeID,
          Size: size,
          Color: color,
        },
        {
          where: { id: productID },
          returning: true,
        }
      )

      if (updatedProduct) {
        res.status(200).json({
          code: 200,
          message: 'Продукт успешно изменен!',
        })
      } else {
        res.status(500).json({
          code: 500,
          message: 'Внутренняя ошибка сервера!',
        })
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: error,
      })
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const token = req.headers.authorization || ''
      const { storeID } = ValidatorController.getTokenData(token, res)
      const { id: productID } = req.params

      // Use StoreProductModel to retrieve the product
      const product = await StoreProductModel.findByPk(productID)

      // Check if the product exists
      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }

      // Check if the product belongs to the store
      if (product.storeID !== storeID) {
        return res
          .status(403)
          .json({ error: 'Unauthorized to delete this product' })
      }

      // Delete the product
      await product.destroy()

      // Respond with a success status
      return res.status(204).send()
    } catch (error) {
      // Handle any errors (e.g., database errors, validation errors)
      console.error(error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async getProducts(req: Request, res: Response) {
    try {
      const token = req.headers.authorization || ''
      const { storeID } = ValidatorController.getTokenData(token, res)

      const products = await StoreProductModel.findAll({
        where: {
          storeID: storeID,
        },
      })

      res.json(products)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({
        code: 500,
        message: 'Внутренняя ошибка сервера!',
      })
    }
  }
}

export default StoreProduct
