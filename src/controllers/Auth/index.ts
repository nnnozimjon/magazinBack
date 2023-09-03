import { Response, Request } from 'express'
import ValidatorController from '../validators'
import { PartnerStore } from '../../models/index'
import fs from 'fs/promises'
import path from 'path'

class UserAuth {
  static async deleteFile(filename: any) {
    if (filename) {
      const filePath = path.resolve(
        __dirname,
        `../../assets/partnerStoresImages/${filename.filename}`
      )
      await fs.unlink(filePath)
    }
  }

  static async handleRegistrationError(
    res: Response,
    storeBrandLogoFile: any,
    storeHeaderPhotoFile: any,
    errorMessage: string
  ) {
    await UserAuth.deleteFile(storeBrandLogoFile)
    await UserAuth.deleteFile(storeHeaderPhotoFile)
    res.status(400).json({ code: res.statusCode, message: errorMessage })
  }

  static loginCustomer() {}
  static loginAffiliate() {}
  static loginPartnerStore() {}

  static registerCustomer() {}
  static registerAffiliatePartner() {}

  static async registerPartnerStore(req: Request, res: Response) {
    const {
      email,
      phoneNumber,
      storeName,
      city,
      storeAddress,
      password,
      acceptTerms,
    } = req.body

    const files: any = req.files
    const currency = 'TJS'

    const storeBrandLogoFile =
      files && files['storeBrandLogo'] ? files['storeBrandLogo'][0] : null
    const storeHeaderPhotoFile =
      files && files['storeHeaderPhoto'] ? files['storeHeaderPhoto'][0] : null

    const requiredFields = {
      email,
      phoneNumber,
      storeName,
      city,
      storeAddress,
      password,
      acceptTerms,
    }

    const validation =
      ValidatorController.validateRequiredFields(requiredFields)

    if (!storeBrandLogoFile || !storeHeaderPhotoFile) {
      return UserAuth.handleRegistrationError(
        res,
        storeBrandLogoFile,
        storeHeaderPhotoFile,
        'Required files are missing!'
      )
    }

    if (!validation.valid) {
      return UserAuth.handleRegistrationError(
        res,
        storeBrandLogoFile,
        storeHeaderPhotoFile,
        validation.error
      )
    }

    if (!ValidatorController.isValidEmail(email)) {
      return UserAuth.handleRegistrationError(
        res,
        storeBrandLogoFile,
        storeHeaderPhotoFile,
        'Invalid email address!'
      )
    }

    try {
      const newStore: PartnerStore = await PartnerStore.create({
        Name: storeName,
        Email: email,
        Password: password,
        StoreAddress: storeAddress,
        PhoneNumber: phoneNumber,
        CityAddress: city,
        Currency: currency,
        AcceptTerms: true,
        BrandIconURL: storeBrandLogoFile?.filename,
        HeaderPhotoURL: storeHeaderPhotoFile?.filename,
      })

      // Check if the store was successfully created
      if (newStore) {
        res.status(200).json({
          code: 200,
          message: 'Магазин успешно создан!',
        })
      } else {
        return UserAuth.handleRegistrationError(
          res,
          storeBrandLogoFile,
          storeHeaderPhotoFile,
          'Не удалось создать магазин.'
        )
      }
    } catch (error: any) {
      let errorMessage = 'Не удалось создать магазин!'

      if (error.errors[0]?.type === 'unique violation') {
        switch (error.errors[0]?.path) {
          case 'Name':
            errorMessage = 'Магазин с таким названием существует!'
            break
          case 'Email':
            errorMessage = 'Магазин с таким электронным адресом существует!'
            break
          default:
            errorMessage = 'Магазин с таким номер телефона существует!'
            break
        }
      } else {
        errorMessage = 'Ошибка при создании магазина: ' + error.message
      }

      return UserAuth.handleRegistrationError(
        res,
        storeBrandLogoFile,
        storeHeaderPhotoFile,
        errorMessage
      )
    }
  }
}

export default UserAuth
