import { Response, Request } from 'express'
import ValidatorController from '../validators'
import { PartnerStore } from '../../models/index'
import { StringDecoder } from 'string_decoder'
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
    } = req.body
    const files: any = req.files
    const currency = 'TJS'

    const storeBrandLogoFile = files?.find(
      (file: any) => file.fieldname === 'storeBrandLogo'
    )
    const storeHeaderPhotoFile = files?.find(
      (file: any) => file.fieldname === 'storeHeaderPhoto'
    )

    console.log(storeHeaderPhotoFile)

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

    if (!storeBrandLogoFile) {
      return res.status(400).send('Brand Logo not found!')
    }

    if (!storeHeaderPhotoFile) {
      return res.status(400).send('Brand Header photo not found!')
    }

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
        Name: storeName,
        Email: email,
        BrandName: 'Example Brand',
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
