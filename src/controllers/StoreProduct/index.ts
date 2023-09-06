import { Request, Response } from 'express'
import ValidatorController from '../validators'
import { StoreProductModel } from '../../models/index'

class StoreProduct {
  static async createProduct(req: Request, res: Response) {
    const { name, description, price, category, color, size } = req.body

    const requiredFields = {
      name,
      description,
      price,
      category,
      size,
    }

    const files: any = req.files
    const storeFiles = files && files['files']

    const validation =
      ValidatorController.validateRequiredFields(requiredFields)

    if (!validation.valid) {
      ValidatorController.deleteFile('', 'storeProducts')
      return res.status(400).json({
        code: 400,
        message: validation.error,
      })
    }

    try {
      const newProduct = await StoreProductModel.create({
        ProductName: 'Pro1',
        Description: 'Fucking',
        Price: 190.99,
        StockQuantity: 10,
        CategoryID: 1,
        Images: [],
        storeID: 53,
        Size: [],
        Color: [],
      })

      if (newProduct) {
        res.status(200).json({
          code: 200,
          message: 'Product created successfully!',
        })
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: error,
      })
    }
  }
}

export default StoreProduct
