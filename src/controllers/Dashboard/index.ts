import { Request, Response } from 'express'
import ValidatorController from '../validators'
import { StoreProductModel, PaymentsModel, OrderItemsModel } from '../../models'

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

    // return numberOfSoldItems, priceOfSoldItems

    // check if dateFrom is not greater than dateTo
  }
}

export default Dashboard
