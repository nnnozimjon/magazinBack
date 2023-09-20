import { Response, Request } from 'express'
import ValidatorController from '../validators'
import { CustomersModel, PartnerStore } from '../../models/index'
import { CustomerSecretKey, partnerStoreSecretKey } from '../../common/token'
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

  static async loginCustomer(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const requiredFields = { email, password }

      const validation =
        ValidatorController.validateRequiredFields(requiredFields)

      if (!validation.valid) {
        return res.status(400).json({
          code: 400,
          message: 'Отсутствуют обязательные поля!',
        })
      }

      if (!ValidatorController.isValidEmail(email)) {
        return res
          .status(400)
          .json({ code: 400, message: 'Неверный адрес электронной почты!' })
      }
      const customer: any = await ValidatorController.isCustomerCredentialValid(
        res,
        email,
        password
      )

      if (!customer) {
        return res.status(400).json({
          code: 400,
          message: 'Неверные учетные данные!',
        })
      }
      const token = await jwt.sign(
        {
          customerID: customer.CustomerID,
          Username: customer.Username,
          email: customer.Email,
        },
        CustomerSecretKey,
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

  static async registerCustomer(req: Request, res: Response) {
    const { email, phoneNumber, username, password } = req.body
    const requiredFields = {
      email,
      phoneNumber,
      username,
      password,
    }

    // DO THE BODY FIELD PROVIDED
    const validation =
      ValidatorController.validateRequiredFields(requiredFields)

    if (!validation.valid) {
      return res.status(400).json({
        code: 400,
        message: validation.error,
      })
    }

    // CHECK THE BODY FIELD VALIDITY
    const isPhoneNumberCorrect =
      ValidatorController.validatePhoneNumber(phoneNumber)
    const isEmailCorrect = ValidatorController.isValidEmail(email)

    if (!isPhoneNumberCorrect) {
      return res.status(400).json({
        code: 400,
        message:
          'Неверный номер телефона! Принимается только номеров телефонов Таджикистана!',
      })
    }

    if (!isEmailCorrect) {
      return res.status(400).json({
        code: 400,
        message: 'Неверный адрес электронной почты!',
      })
    }

    // CHECK IF THE FIELDS ARE NOT IN DATABASE
    const isCustomerByPhoneNumberExists =
      await ValidatorController.isCustomerByPhoneNumberExists(
        ValidatorController.cleanPhoneNumber(phoneNumber)
      )

    const isCustomerByEmailExits =
      await ValidatorController.isCustomerByEmailExists(email)

    if (isCustomerByPhoneNumberExists) {
      return res.status(400).json({
        code: 400,
        message: 'Клиент по указанному номеру телефона уже существует!',
      })
    }

    if (isCustomerByEmailExits) {
      return res.status(400).json({
        code: 400,
        message: 'Клиент по электронной почте уже существует!',
      })
    }

    const cleanedPhoneNumber = ValidatorController.cleanPhoneNumber(phoneNumber)

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const customer: CustomersModel = await CustomersModel.create({
        Username: username,
        Email: email,
        Password: hashedPassword,
        PhoneNumber: cleanedPhoneNumber,
      })

      if (customer) {
        res.status(200).json({
          code: 200,
          message: 'Аккаунт успешно создан!',
        })
      } else {
        return res.status(500).json({
          code: 500,
          message: 'Не удалось создать аккаунт! Попробуйте еще раз!',
        })
      }
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        message: 'Не удалось создать аккаунт! Попробуйте еще раз!',
      })
    }
  }

  static registerAffiliatePartner() {}
  static loginAffiliate() {}

  // PARTNER AUTH CONTROLLER
  static async loginPartnerStore(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const requiredFields = { email, password }

      const validation =
        ValidatorController.validateRequiredFields(requiredFields)

      if (!validation.valid) {
        return res.status(400).json({
          code: 400,
          message: 'Отсутствуют обязательные поля!',
        })
      }

      if (!ValidatorController.isValidEmail(email)) {
        return res
          .status(400)
          .json({ code: 400, message: 'Неверный адрес электронной почты!' })
      }
      const store: any = await ValidatorController.isStoreCredentialValid(
        res,
        email,
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

    const isPhoneNumberCorrect =
      ValidatorController.validatePhoneNumber(phoneNumber)

    const isStoreByEmailExists = await ValidatorController.isStoreByEmailExists(
      email
    )
    const isStoreByPhoneNumberExists =
      await ValidatorController.isStoreByPhoneNumberExists(
        ValidatorController.cleanPhoneNumber(phoneNumber)
      )

    const isStoreNameExists = await ValidatorController.isStoreNameExists(
      storeName
    )

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

    if (!isPhoneNumberCorrect) {
      await ValidatorController.deleteFile(
        storeBrandLogoFile,
        'partnerStoresImages'
      )
      await ValidatorController.deleteFile(
        storeHeaderPhotoFile,
        'partnerStoresImages'
      )
      return res.status(400).json({
        code: 400,
        message:
          'Неверный номер телефона! Принимается только номеров телефонов Таджикистана!',
      })
    }

    if (isStoreByPhoneNumberExists) {
      await ValidatorController.deleteFile(
        storeBrandLogoFile,
        'partnerStoresImages'
      )
      await ValidatorController.deleteFile(
        storeHeaderPhotoFile,
        'partnerStoresImages'
      )
      return res.status(400).json({
        code: 400,
        message: 'Магазин по указанному номеру телефона уже существует!',
      })
    }

    if (isStoreByEmailExists) {
      await ValidatorController.deleteFile(
        storeBrandLogoFile,
        'partnerStoresImages'
      )
      await ValidatorController.deleteFile(
        storeHeaderPhotoFile,
        'partnerStoresImages'
      )
      return res.status(400).json({
        code: 400,
        message: 'Магазин по электронной почте уже существует!',
      })
    }

    if (isStoreNameExists) {
      await ValidatorController.deleteFile(
        storeBrandLogoFile,
        'partnerStoresImages'
      )
      await ValidatorController.deleteFile(
        storeHeaderPhotoFile,
        'partnerStoresImages'
      )
      return res.status(400).json({
        code: 400,
        message: 'Магазин с таким названием уже существует!',
      })
    }

    const cleanedPhoneNumber = ValidatorController.cleanPhoneNumber(phoneNumber)

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const newStore: PartnerStore = await PartnerStore.create({
        StoreName: storeName,
        Username: username,
        Email: email,
        Password: hashedPassword,
        StoreAddress: storeAddress,
        PhoneNumber: cleanedPhoneNumber,
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
          'Не удалось создать магазин! Попробуйте еще раз!'
        )
      }
    } catch (error: any) {
      let errorMessage = 'Не удалось создать магазин! Попробуйте еще раз!'

      console.log(error)

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
