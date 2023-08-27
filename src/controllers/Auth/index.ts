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
      return res.status(400).json({
        message: validation.error,
      })
    }

    if (!ValidatorController.isValidEmail(email)) {
      return res.status(400).json({
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

      // Check if the store was successfully created
      if (newStore) {
        console.log('Store created successfully:', newStore.toJSON())
        // Send a success response
        res.status(201).json({ message: 'Store created successfully' })
      } else {
        console.log('Store creation failed')
        // Send an error response
        res.status(500).json({ message: 'Store creation failed' })
      }
    } catch (error) {
      console.error('Error creating store:', error)
      res.status(500).json({ message: 'Store creation failed' })
    }
  }
}

export default UserAuth
