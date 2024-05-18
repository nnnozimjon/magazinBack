import { Request, Response } from 'express'
import ValidatorController from '../validators'
import {
  PaymentsModel,
  OrderItemsModel,
  OrdersModel,
  StoreProductModel,
  PartnerStore,
} from '../../models'
import { Op } from 'sequelize'

class Dashboard {
  static async getSoldProductQuantity(req: Request, res: Response) {
    const token = req.headers.authorization || ''
    const { storeID } = ValidatorController.getTokenData(token, res)
  }
}

export default Dashboard
