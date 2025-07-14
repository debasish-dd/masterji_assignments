const userMassege = document.getElementById('user-message')
const contactNumer = document.getElementById('cnumber')
const userEmail = document.getElementById('email')
const lastName = document.getElementById('lname')
const firstName = document.getElementById('fname')
const password = document.getElementById('password')
const form = document.getElementById('form-id')
const popUP = document.querySelector('.popup-card')
const okButton = document.getElementById('okBTN')
const popUpDescription = document.querySelector('.description')

okButton.addEventListener('click', () => {
  popUP.close()
})
form.addEventListener('submit', event => {
  event.preventDefault()
  

  if (phoneValidator(contactNumer.value) == true) {
    popUpDescription.innerText = `
            ✅ Enter a valid 10-digit mobile number.

Rules:

Must be exactly 10 digits

Should start with 6, 7, 8, or 9

Only numbers are allowed

No spaces, dashes, or country codes

Examples:

✅ 9876543210

❌ 1234567890 (invalid start digit)

❌ 98765-43210 (no dashes allowed)

❌ +91 9876543210 (no country code)
        `
    popUP.show()
  }

  if (passwordValidator(password.value) == false) {
    popUpDescription.innerText = `Recommended Requirements:

At least 8 characters
Must contain:

✅ 1 uppercase letter (A-Z)
✅ 1 lowercase letter (a-z)
✅ 1 number (0-9)
✅ 1 special character (e.g., !@#$%^&*)

Examples:

MyPass@123
Secure2024!

Tips:
   Don't use common passwords like 123456, password
   Don not include your name or email`
    popUP.show()
  }

  if (emailValidator(userEmail.value) == false) {
    popUpDescription.innerText = `
    ✅ Enter a valid email address.
Format: yourname@example.com

Examples:

john.doe@gmail.com
user123@example.co.in

Rules:

Must include @ and a domain (e.g., .com, .org)
No spaces
No special characters like ,, #, or !
    `
    popUP.show()
  }
  if (nameValidator(firstName.value, lastName.value) == false) {
    popUpDescription.innerText = `
        ✅ Enter your full name.

Rules:

Only letters, spaces, hyphens (-), and apostrophes (') are allowed
No numbers or symbols like @, #, %
Can be in any language (e.g., English, Hindi, Chinese)

Examples:

John O'Connor
Renée Élise Goldsberry
Jean-Luc Picard

Invalid Examples:

123abc ❌
John@doe ❌
Mr. John! ❌

    `

    popUP.show()
  }

  if (
    passwordValidator(password.value) &&
    nameValidator(firstName.value, lastName.value) &&
    emailValidator(userEmail.value) &&
    phoneValidator(contactNumer.value)
  ) {
    form.submit()
  }
})

const passwordValidator = pass => {
  pass = pass.trim()

  // Length between 8–18
  if (pass.length < 8 || pass.length > 18) return false

  // At least one uppercase
  if (pass === pass.toLowerCase()) return false

  // At least one lowercase
  if (pass === pass.toUpperCase()) return false

  // At least one number
  if (!/\d/.test(pass)) return false

  // At least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) return false

  return true
}

const nameValidator = (fname, lname) => {
  // Trim whitespace
  const fNameTrimmed = fname.trim()
  const lNameTrimmed = lname.trim()

  // Check length (1 to 100 characters)
  if (fNameTrimmed.length === 0 || fNameTrimmed.length > 100) {
    return false
  }
  if (lNameTrimmed.length > 100) {
    return false
  }

  // Regex: allow Unicode letters, marks, spaces, hyphens, and apostrophes
  const nameRegex = /^[\p{L}\p{M}' -]+$/u

  return nameRegex.test(fNameTrimmed)
}

const emailValidator = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

const phoneValidator = phone => {
  phone = phone.trim()

  // Check length: must be exactly 10 digits (for Indian mobile numbers)
  if (phone.length !== 10) return false

  // Check if it contains only digits
  if (!/^\d+$/.test(phone)) return false

  // Check if it starts with a valid digit (Indian mobiles: 6, 7, 8, or 9)
  if (!/^[6-9]/.test(phone)) return false

  return true
}

