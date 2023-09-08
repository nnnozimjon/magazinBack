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

  static registerCustomer() {}
  static registerAffiliatePartner() {}

  // PARTNER AUTH CONTROLLER

  static async loginPartnerStore(req: Request, res: Response) {
    try {
      const { storeName, password } = req.body
      const requiredFields = { storeName, password }

      const validation =
        ValidatorController.validateRequiredFields(requiredFields)

      if (!validation.valid) {
        return res.status(400).json({
          code: 400,
          message: 'Отсутствуют обязательные поля!',
        })
      }

      const store: any = await ValidatorController.isStoreCredentialValid(
        res,
        storeName,
        password
      )

      if (!store) {
        return res.status(400).json({
          code: 400,
          message: 'Неверные учетные данные!',
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
      res.json({
        code: 200,
        accessToken: token,
      })
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: 'Внутренняя ошибка сервера!',
      })
    }
  }

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
        'Необходимые файлы отсутствуют!'
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
        'Неверный адрес электронной почты!'
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
