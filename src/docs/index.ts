// Example usage:

import { SwaggerDefinition } from 'swagger-jsdoc'
import ApiGroups from './groups'
import ApiServers from './servers'
import ApiPaths from './apis'

export const swaggerJSON: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Dushanbe Market API',
    version: '1.0.0',
    description:
      'This is Dushanbe Market API application made with Express and documented with Swagger!',
  },
  servers: ApiServers,
  paths: ApiPaths,
  tags: ApiGroups,
}

// Now you can use the swaggerJSON object with TypeScript type checking.
