import { PartnerStore } from '../../models/index'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import fs from 'fs/promises'
import path from 'path'
import { partnerStoreSecretKey } from '../../common/token'

class ValidatorController {
  static isValidEmail(email: any) {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    // Test the email against the regular expression
    return emailRegex.test(email)
  }

  static validateRequiredFields(fields: { [key: string]: any }): {
    valid: boolean
    error: string
  } {
    for (const key in fields) {
      if (!fields[key]) {
        return { valid: false, error: `${key} требуется!` }
      }
    }
    return { valid: true, error: '' }
  }

  static isNameValid(name: any) {
    // Basic validation for names (only letters and spaces)
    const nameRegex = /^[A-Za-z\s]+$/
    return nameRegex.test(name)
  }

  static isUsernameValid(username: any) {
    // Basic validation for usernames (letters, numbers, underscores)
    const usernameRegex = /^[A-Za-z0-9_]+$/
    return usernameRegex.test(username)
  }

  static async deleteFile(file: any, folder: string) {
    if (file) {
      const filePath = path.resolve(
        __dirname,
        `../../assets/${folder}/${file?.filename}`
      )
      await fs.unlink(filePath)
    }
  }

  static async isStoreCredentialValid(
    res: Response,
    storeName: string,
    password: string
  ) {
    try {
      const store = await PartnerStore.findOne({
        where: {
          StoreName: storeName,
        },
      })

      if (store) {
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, store.Password)

        if (passwordMatch) {
          return store
        } else {
          return null // Passwords do not match
        }
      } else {
        return null // Store not found
      }
    } catch (err: any) {
      return res.status(500).json({
        code: 500,
        message: err.message,
      })
    }
  }

  static getTokenData(
    token: string,
    res: Response
  ): {
    storeID: number
    storeName: string
    username: string
  } {
    const tokenValue = token.split(' ')[1]

    const decodedToken: any = jwt.verify(
      tokenValue,
      partnerStoreSecretKey,
      (err, decoded) => {
        if (err) {
          res.status(401).json({
            code: 401,
            message: 'Неавторизованный!',
          })
        }

        return decoded
      }
    )

    return {
      storeID: decodedToken.StoreID,
      storeName: decodedToken.StoreName,
      username: decodedToken.Username,
    }
  }
}

export default ValidatorController
