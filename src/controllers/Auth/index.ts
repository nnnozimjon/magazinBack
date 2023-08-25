import { Response, Request } from 'express'
import ValidatorController from '../validators'

class UserAuth {
  static loginCustomer() {}
  static loginAffiliate() {}
  static loginPartnerStore() {}

  static registerCustomer() {}
  static registerAffiliatePartner() {}
  static registerPartnerStore(req: Request, res: Response) {
    const {
      email,
      phoneNumber,
      storeName,
      city,
      storeAddress,
      password,
      acceptTerms,
    } = req.query
    const currency = 'TJS'

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
    if (!validation.valid) {
      return res.json({
        status: 400,
        message: validation.error,
      })
    }

    if (!ValidatorController.isValidEmail(email)) {
      return res.json({
        status: 400,
        message: 'Invalid email address!',
      })
    }
    // const { logo, headerPhoto } = req.body
  }
}

export default UserAuth
