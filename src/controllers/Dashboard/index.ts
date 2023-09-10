import { Request, Response } from 'express'
import { StoreProductModel } from '../../models/index'
import ValidatorController from '../validators'

class Dashboard {
  static getSoldProductQuantity(req: Request, res: Response) {
    const token = req.headers.authorization || ''
    const { storeID } = ValidatorController.getTokenData(token, res)
    const { dateFrom, dateTo } = req.body

    const requiredFields = {
      dateFrom,
      dateTo,
    }

    const validation =
      ValidatorController.validateRequiredFields(requiredFields)

    if (!validation.valid) {
      return res.status(400).json({
        code: 400,
        message: validation.error,
      })
    }

    // from  yyyy-MM-dd to yyyy-MM-dd
    // I want to get the sold quantity
  }
  static getSoldProductsMoney() {}
}

export default Dashboard
