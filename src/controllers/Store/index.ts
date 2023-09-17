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
          message: validation.error,
        })
      }

      // email validation
      const isEmailCorrect = ValidatorController.isValidEmail(email)
      if (!isEmailCorrect) {
        return res.status(400).json({
          code: 400,
          message: 'Указан неверный адрес электронной почты!',
        })
      }

      const isPhoneNumberCorrect =
        ValidatorController.validatePhoneNumber(phoneNumber)
      if (!isPhoneNumberCorrect) {
        return res.status(400).json({
          code: 400,
          message:
            'Неверный номер телефона! Принимается только номеров телефонов Таджикистана!',
        })
      }

      const isStoreByEmailExists =
        await ValidatorController.isStoreByEmailExists(email, storeID)

      if (isStoreByEmailExists) {
        return res.status(400).json({
          code: 400,
          message: 'Магазин по электронной почте уже существует!',
        })
      }

      const isStoreNameExists = await ValidatorController.isStoreNameExists(
        storeName,
        storeID
      )

      if (isStoreNameExists) {
        return res.status(400).json({
          code: 400,
          message: 'Магазин с таким названием уже существует!',
        })
      }

      const isStoreByPhoneNumberExists =
        await ValidatorController.isStoreByPhoneNumberExists(
          phoneNumber,
          storeID
        )

      if (isStoreByPhoneNumberExists) {
        return res.status(400).json({
          code: 400,
          message: 'Магазин по указанному номеру телефона уже существует!',
        })
      }

      const cleanedPhoneNumber =
        ValidatorController.cleanPhoneNumber(phoneNumber)

      const updatedData = {
        StoreName: storeName,
        Username: userName,
        Email: email,
        PhoneNumber: cleanedPhoneNumber,
        CityAddress: cityAddress,
        StoreAddress: storeAddress,
      }

      const [rowsAffected] = await PartnerStore.update(updatedData, {
        where: { StoreID: storeID },
      })
      console.log(rowsAffected)

      if (rowsAffected === 1) {
        res.status(200).json({
          code: 200,
          message: 'Магазин успешно обновлен!',
        })
      } else {
        res.status(500).json({
          code: 500,
          message: 'Внутренняя ошибка сервера!',
        })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ code: 500, message: 'Внутренняя ошибка сервера!' })
    }
  }

  static async deleteStore(req: Request, res: Response) {
    const token = req.headers.authorization || ''
    const { storeID } = ValidatorController.getTokenData(token, res)

    try {
      // Check if the store exists
      const existingStore = await PartnerStore.findOne({ where: { storeID } })

      if (!existingStore) {
        return res.status(404).json({
          code: 404,
          message: 'Магазин не найден!',
        })
      }

      // Delete the store
      await PartnerStore.destroy({ where: { storeID } })

      res.status(200).json({
        code: 200,
        message: 'Магазин успешно удален!',
      })
    } catch (error) {
      console.error('Error deleting store:', error)
      res.status(500).json({
        code: 500,
        message: 'Внутренняя ошибка сервера!',
      })
    }
  }
}

export default StoreController
