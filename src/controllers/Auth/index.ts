import { Response, Request } from 'express'
import ValidatorController from '../validators'
import { PartnerStore } from '../../models/index'
class UserAuth {
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
    // const { logo, headerPhoto } = req.body

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

    try {
      const newStore: PartnerStore = await PartnerStore.create({
        Name: 'Example Store',
        Email: 'store@example.com',
        BrandName: 'Example Brand',
        Password: 'securePassword',
        Currency: 'TJS',
        AcceptTerms: true,
      })

      console.log(newStore.toJSON())
    } catch (error) {
      console.error('Error creating store:', error)
    }
  }
}

export default UserAuth
