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
}

export default ValidatorController
