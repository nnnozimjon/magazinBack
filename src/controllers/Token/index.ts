import { NextFunction, Request, Response } from 'express'
import { partnerStoreSecretKey } from '../../common/token'
const jwt = require('jsonwebtoken')

function verifyToken(req: Request, res: Response, next: NextFunction) {
  // Check if the request headers contain an 'Authorization' header with a Bearer token
  const tokenHeader = req.headers.authorization

  if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      code: 401,
      message: 'Неавторизованный!',
    })
  }

  // Extract the token from the header
  const token = tokenHeader.split(' ')[1]

  // Verify the token
  jwt.verify(token, partnerStoreSecretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({
        code: 401,
        message: 'Неавторизованный!',
      })
    }

    // Proceed to the next middleware or route handler
    next()
  })
}

export default verifyToken
