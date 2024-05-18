import { SwaggerDefinition } from 'swagger-jsdoc'

const ApiServers: SwaggerDefinition['servers'] = [
  {
    url: 'http://localhost:8002',
  },
  {
    url: 'http://dev-api.dushanbemarket.com',
  },
  {
    url: 'http://api.dushanbemarket.com',
  },
]

export default ApiServers
