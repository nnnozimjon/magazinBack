import { NextFunction, Request, Response } from 'express'
import { partnerStoreSecretKey } from '../../common/token'
const jwt = require('jsonwebtoken')

function verifyToken(req: Request, res: Response, next: NextFunction) {
  // Check if the request headers contain an 'Authorization' header with a Bearer token
  const tokenHeader = req.headers.authorization

  if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized: Bearer token missing',
    })
  }

  // Extract the token from the header
  const token = tokenHeader.split(' ')[1]

  // Verify the token
  jwt.verify(token, partnerStoreSecretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized: Invalid token',
      })
    }

    // If the token is valid, you can access the decoded payload in the 'decoded' variable
    console.log(decoded)

    // Proceed to the next middleware or route handler
    next()
  })
}

export default verifyToken
