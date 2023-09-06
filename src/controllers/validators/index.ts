import { PartnerStore } from '../../models/index'
import { Response } from 'express'
import bcrypt from 'bcrypt'
import fs from 'fs/promises'
import path from 'path'

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
        return { valid: false, error: `${key} required!` }
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

  static async deleteFile(filename: any, folder: string) {
    if (filename) {
      const filePath = path.resolve(
        __dirname,
        `../../assets/${folder}/${filename.filename}`
      )
      await fs.unlink(filePath)
    }
  }

  static async isStoreValid(
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
}

export default ValidatorController
