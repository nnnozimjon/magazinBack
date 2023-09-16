import { Request, Response } from 'express'
import ValidatorController from '../validators'
import { PartnerStore } from '../../models'
import baseURL from '../../utils'

class StoreController {
  static async getUserData(req: Request, res: Response) {
    const token = req.headers.authorization || ''
    const { storeID } = ValidatorController.getTokenData(token, res)

    try {
      const storeData = await PartnerStore.findOne({
        where: {
          storeID: storeID,
        },
      })

      if (storeData) {
        res.status(200).json({
          storeId: storeData.StoreID,
          userName: storeData.Username,
          storeName: storeData.StoreName,
          email: storeData.Email,
          phoneNumber: storeData.PhoneNumber,
          brandIconUrl:
            baseURL +
            '/api/v1/partner-store/profile/store-image/' +
            storeData.BrandIconURL,
          headerPhotoUrl:
            baseURL +
            '/api/v1/partner-store/profile/store-image/' +
            storeData.HeaderPhotoURL,
          cityAddress: storeData.CityAddress,
          storeAddress: storeData.StoreAddress,
        })
      } else {
        res.status(400).json({
          code: 400,
          message: 'Магазин не найден',
        })
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Внутренняя ошибка сервера!',
      })
    }
  }

  static async editStore(req: Request, res: Response) {
    const token = req.headers.authorization || ''
    const { storeID } = ValidatorController.getTokenData(token, res)

    try {
      const {
        userName,
        storeName,
        email,
        phoneNumber,
        cityAddress,
        storeAddress,
      } = req.body

      const requiredFields = {
        userName,
        storeName,
        email,
        phoneNumber,
        cityAddress,
        storeAddress,
      }

      const validation =
        ValidatorController.validateRequiredFields(requiredFields)

      if (!validation.valid) {
        return res.status(400).json({
          code: 400,
          message: validation.error + ' требуется!',
        })
      }

      const updatedData = {}

      // Check if StoreID is provided in the request
      if (!storeID) {
        return res
          .status(400)
          .json({ code: '', message: 'Необходимо указать StoreID.' })
      }

      const updatedStoreData = await PartnerStore.update(updatedData, {
        where: { storeID },
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ code: 500, message: 'Внутренняя ошибка сервера!' })
    }
  }

  static async deleteStore(req: Request, res: Response) {}
}

export default StoreController
