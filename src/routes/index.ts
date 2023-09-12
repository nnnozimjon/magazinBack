import express, { Response, Request, NextFunction } from 'express'
import Service from '../services'
import swaggerUi from 'swagger-ui-express'
import { swaggerJSON } from '../docs'
import System from '../controllers'
import Api from '../constants'
import verifyToken from '../controllers/Token'

const Router = express.Router()

// Swagger API configuration!
Router.use(
  '/docs',
  swaggerUi.serveFiles(swaggerJSON),
  swaggerUi.setup(swaggerJSON, { explorer: true })
)

// Client Auth API configuration
Router.post(Api.auth.loginCustomer, System.UserAuth.loginCustomer)
Router.post(Api.auth.registerCustomer, System.UserAuth.registerCustomer)

// Affiliate Auth API configuration
Router.post(Api.auth.loginAffiliate, System.UserAuth.loginAffiliate)
Router.post(
  Api.auth.registerAffiliate,
  System.UserAuth.registerAffiliatePartner
)

// Partner Store Auth API configuration
Router.post(Api.auth.loginPartnerStore, System.UserAuth.loginPartnerStore)
Router.post(
  Api.auth.registerPartnerStore,
  [
    // Service.FileDownload.AuthFiles().any(),
    Service.FileDownload.AuthFiles().fields([
      { name: 'storeBrandLogo', maxCount: 1 },
      { name: 'storeHeaderPhoto', maxCount: 1 },
    ]),
  ],
  System.UserAuth.registerPartnerStore
)

// Partner Store Products API
Router.post(
  Api.partnerStore.product.createProduct,
  [
    verifyToken,
    Service.FileDownload.ProductPhoto().fields([{ name: 'file', maxCount: 3 }]),
  ],
  System.StoreProduct.createProduct
)

Router.put(
  Api.partnerStore.product.editProduct,
  [verifyToken],
  System.StoreProduct.editProduct
)

Router.delete(
  Api.partnerStore.product.deleteProduct,
  [verifyToken],
  System.StoreProduct.deleteProduct
)

Router.get(
  Api.partnerStore.product.getAllProducts,
  [verifyToken],
  System.StoreProduct.getProducts
)

Router.get(
  Api.partnerStore.product.storeProductImage,
  System.ImageController.storeProductImage
)

// Partner Store Profile API
Router.get(
  Api.partnerStore.profile.storeImage,
  System.ImageController.partnerStoreImage
)

// Partner Store Dashboard API
Router.post(
  Api.dashboard.partnerStores.soldProductsCount,
  [verifyToken],
  System.Dashboard.getSoldProductQuantity
)

export default Router
