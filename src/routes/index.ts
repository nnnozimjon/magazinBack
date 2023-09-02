import express, { Response, Request, NextFunction } from 'express'
import Service from '../services'
import swaggerUi from 'swagger-ui-express'
import { swaggerJSON } from '../docs'
import System from '../controllers'
import Api from '../constants'

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
  [Service.FileDownload.AuthFiles().any()],
  System.UserAuth.registerPartnerStore
)

export default Router
