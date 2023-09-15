import { Request, Response } from 'express'
import ValidatorController from '../validators'
import { PartnerStore } from '../../models'

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
          storeName: storeData.StoreName,
          userName: storeData.Username,
          email: storeData.Email,
          phoneNumber: storeData.PhoneNumber,
          brandIconUrl: storeData.BrandIconURL,
          headerPhotoUrl: storeData.HeaderPhotoURL,
          cityAddress: storeData.CityAddress,
          storeAddress: storeData.StoreAddress,
        })
      } else {
        res.status(400).json({
          code: 400,
          message: 'Магазин не найден',
        }) // Handle case when storeData is not found
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({
        code: 500,
        message: 'Внутренняя ошибка сервера!',
      }) // Handle other errors
    }
  }

  static async editStore(req: Request, res: Response) {
    try {
      const { StoreID, ...updatedData } = req.body

      // Check if StoreID is provided in the request
      if (!StoreID) {
        return res.status(400).json({ message: 'StoreID is required' })
      }

      // Replace the following lines with your actual logic to update the store data
      // Example: const updatedStoreData = await StoreModel.update(updatedData, { where: { StoreID } });

      // Simulating a successful update
      const updatedStoreData = {
        StoreID,
        ...updatedData,
      }

      res.json(updatedStoreData)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export default StoreController
