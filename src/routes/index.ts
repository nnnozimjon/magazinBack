import express, { Response, Request } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocumentOne from '../docs/swagger.json'
// import System from '../controllers'
// import Api from '../constants'

const Router = express.Router()

Router.use(
  '/api-docs',
  swaggerUi.serveFiles(swaggerDocumentOne),
  swaggerUi.setup(swaggerDocumentOne, { explorer: true })
)

Router.get('/', (req: Request, res: Response) => {
  res.send('Production!')
})

export default Router
