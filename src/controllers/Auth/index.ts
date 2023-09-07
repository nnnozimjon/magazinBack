import { Response, Request } from 'express'
import ValidatorController from '../validators'
import { PartnerStore } from '../../models/index'
import { partnerStoreSecretKey } from '../../common/token'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class UserAuth {
  static async handleRegistrationError(
    res: Response,
    storeBrandLogoFile: any,
    storeHeaderPhotoFile: any,
    errorMessage: string
  ) {
    await ValidatorController.deleteFile(
      storeBrandLogoFile,
      'partnerStoresImages'
    )
    await ValidatorController.deleteFile(
      storeHeaderPhotoFile,
      'partnerStoresImages'
    )
    res.status(400).json({ code: res.statusCode, message: errorMessage })
  }

  static loginCustomer() {}
  static loginAffiliate() {}

  static async loginPartnerStore(req: Request, res: Response) {
    try {
      const { storeName, password } = req.body
      // Check if required fields are provided
      const requiredFields = { storeName, password }
      const validation =
        ValidatorController.validateRequiredFields(requiredFields)

      if (!validation.valid) {
        return res.status(400).json({
          code: 400,
          message: 'Required fields are missing!',
        })
      }

      // Check if the store is valid and get the store details
      const store: any = await ValidatorController.isStoreValid(
        res,
        storeName,
        password
      )

      if (!store) {
        return res.status(400).json({
          code: 400,
          message: 'Invalid store credentials!',
        })
      }
      const token = await jwt.sign(
        {
          StoreID: store.StoreID,
          StoreName: store.StoreName,
          Username: store.Username,
        },
        partnerStoreSecretKey,
        {
          expiresIn: '3d',
        }
      )
      // If the credentials are valid, you can proceed with further actions
      res.json({
        code: 200,
        accessToken: token,
        message: 'Store logged in successfully!',
      })
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: 'Internal server error',
      })
    }
  }

  static registerCustomer() {}
  static registerAffiliatePartner() {}

  static async registerPartnerStore(req: Request, res: Response) {
    const {
      email,
      phoneNumber,
      storeName,
      username,
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
      username,
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

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const newStore: PartnerStore = await PartnerStore.create({
        StoreName: storeName,
        Username: username,
        Email: email,
        Password: hashedPassword,
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
          case 'StoreName':
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
