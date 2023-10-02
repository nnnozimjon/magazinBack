import { Request, Response } from 'express'
import ValidatorController from '../validators'
import { CustomersModel, OrdersModel } from '../../models'

class CustomerController {
  static async profileData(req: Request, res: Response) {
    try {
      const token = req.headers.authorization || ''
      const { customerId } = ValidatorController.getCustomerTokenData(
        token,
        res
      )

      const customerInfo: any = await CustomersModel.findOne({
        where: {
          CustomerId: customerId,
        },
      })

      const orderedProducts: any = await OrdersModel.findAll({
        where: {
          CustomerID: customerId,
        },
      })

      // productName
      // productPrice
      // descount
      // size
      // color
      // process
      // kodi ki baroi priz
      // }

      const neededCustomerInfo: any = {
        name: customerInfo.Username,
        phoneNumber: customerInfo.PhoneNumber,
        address: customerInfo.Email,
      }

      const neededOrdersToSent = orderedProducts?.map(() => {})

      res.status(200).json({
        code: 200,
        message: '',
        payload: { ...neededCustomerInfo, orders: neededOrdersToSent },
      })
    } catch (error: any) {
      res.status(500).json({
        code: 500,
        message: '',
      })
    }
  }
}

export default CustomerController
