const userMassege = document.getElementById('user-message')
const contactNumer = document.getElementById('cnumber')
const userEmail = document.getElementById('email')
const lastName = document.getElementById('lname')
const firstName = document.getElementById('fname')
const form = document.getElementById('form-id')
form.addEventListener('change', () => {
    
})

const passwordValidator = pass => {
    //length validation
    if (pass.length < 8 || pass.length > 18) {
        return false
    }
    // at least one uppercase
    if (pass == pass.toLowerCase()) {
        return false
    }
    // at least one lowercase
    if (pass == pass.toUpperCase()) {
        return false
    }
    //contains a number
    if (!/\d/.test(pass)) {
        return false
    }

    // everything is ok
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

