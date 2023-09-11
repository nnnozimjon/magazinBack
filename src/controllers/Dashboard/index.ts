import { Request, Response } from 'express'
import ValidatorController from '../validators'
import {
  PaymentsModel,
  OrderItemsModel,
  OrdersModel,
  StoreProductModel,
} from '../../models'
import { Op } from 'sequelize'

class Dashboard {
  static async getSoldProductQuantity(req: Request, res: Response) {
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

    try {
      const soldProducts = await OrderItemsModel.findAll({
        where: {},
        include: [
          {
            model: OrdersModel,
            where: {
              storeID,
              OrderDate: {
                [Op.between]: [dateFrom, dateTo],
              },
            },
          },
          {
            model: PaymentsModel,
          },
        ],
      })

      let soldProductsCount = 0
      let totalSoldProductsPrice = 0

      for (const orderItem of soldProducts) {
        const { Quantity, Subtotal } = orderItem
        const storeProduct = await StoreProductModel.findByPk(
          orderItem.ProductID
        )

        if (storeProduct) {
          soldProductsCount += Quantity
          totalSoldProductsPrice += Quantity * Subtotal
        }
      }

      return res.status(200).json({
        code: 200,
        message: 'Successfully retrieved sold products count and total price',
        data: {
          soldProductsCount,
          totalSoldProductsPrice,
        },
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        code: 500,
        message: 'Internal server error',
      })
    }
  }
}

export default Dashboard
