const { _setMessage } = require("./utils")
const _messages = require("./messages")
const _errors = require("./errorMessages")
const _regex = require("./regex")

module.exports = class Validators {
  constructor() {
    this.tests = []
    this.isOptional = false
    this.isRequired = false
    this.isTest = true
  }
  // Javascript Types
  dateObject(message) {
    this.tests.push(input => {
      return !input || !(input instanceof Date)
        ? message || _messages.dateObject
        : null
    })
    return this
  }

  boolean(message) {
    this.tests.push(input => {
      return !(typeof input === "boolean") ? message || _messages.boolean : null
    })
    return this
  }

  array(message) {
    this.tests.push(input => {
      return !input || !(input.constructor === Array)
        ? message || _messages.array
        : null
    })
    return this
  }

  object(message) {
    this.tests.push(input => {
      return !input || !(input.constructor === Object)
        ? message || _messages.object
        : null
    })
    return this
  }

  // String validators

  maxLength(maxLength, message) {
    if (typeof maxLength !== "number") {
      throw new Error(_errors.maxLength)
    }

    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString
      if (!input.length) return _messages.required

      const replacers = {
        maxLength
      }
      return input.length > maxLength
        ? message || _setMessage(_messages.maxLength, replacers)
        : null
    })
    return this
  }

  minLength(minLength, message) {
    if (typeof minLength !== "number") {
      throw new Error(_errors.minLength)
    }

    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      const replacers = {
        minLength
      }
      return input.length < minLength
        ? message || _setMessage(_messages.minLength, replacers)
        : null
    })
    return this
  }

  minAndMaxLength(minLength, maxLength, message) {
    if (minLength >= maxLength) throw new Error(_errors.minAndMaxLength[0])
    if (typeof minLength !== "number" || typeof maxLength !== "number")
      throw new Error(_errors.minAndMaxLength[1])

    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      const replacers = {
        minLength,
        maxLength
      }
      return input.length < minLength || input.length > maxLength
        ? message || _setMessage(_messages.minAndMaxLength, replacers)
        : null
    })
    return this
  }

  shouldEqual(inputName, message) {
    this.tests.push((input, inputObj) => {
      if (typeof input !== "string") return _messages.notAString

      const replacers = { inputName }

      const seccondInput = inputObj[inputName]
      return !(input === seccondInput)
        ? message || _setMessage(_messages.shouldEqual, replacers)
        : null
    })
    return this
  }

  required(message) {
    if (this.isOptional) throw new Error(_errors.required)
    this.isRequired = true

    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !input.length ? message || _messages.required : null
    })
    return this
  }

  optional() {
    if (this.isRequired) throw new Error(_errors.optional)

    this.isOptional = true
    return this
  }

  // regex methods

  email(message) {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.email.test(input) ? message || _messages.email : null
    })
    return this
  }

  dutchPhone(message) {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.dutchPhone.test(input)
        ? message || _messages.dutchPhone
        : null
    })
    return this
  }

  dutchMobile(message) {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.dutchMobile.test(input)
        ? message || _messages.dutchMobile
        : null
    })
    return this
  }

  postalCode(message) {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.postalCode.test(input)
        ? message || _messages.postalCode
        : null
    })
    return this
  }

  time(message) {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.time.test(input) ? message || _messages.time : null
    })
    return this
  }

  date(message) {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.date.test(input) ? message || _messages.date : null
    })
    return this
  }

  number(message) {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.number.test(input) ? message || _messages.number : null
    })
    return this
  }

  minNumber(minNumber, message) {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      const replacers = { minNumber }
      return parseFloat(input.replace(",", ".")) < minNumber
        ? message || _setMessage(_messages.minNumber, replacers)
        : null
    })
    return this
  }

  maxNumber(maxNumber, message) {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      const replacers = { maxNumber }
      return parseFloat(input.replace(",", ".")) > maxNumber
        ? message || _setMessage(_messages.maxNumber, replacers)
        : null
    })
    return this
  }
  minAndMaxNumber(minNumber, maxNumber, message) {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      const replacers = {
        minNumber,
        maxNumber
      }
      return parseFloat(input.replace(",", ".")) < minNumber ||
        parseFloat(input.replace(",", ".")) > maxNumber
        ? message || _setMessage(_messages.minAndMaxNumber, replacers)
        : null
    })
    return this
  }

  fullName(message) {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.fullName.test(input) ? message || _messages.fullName : null
    })
    return this
  }

  regex(regex, message) {
    if (!(regex instanceof RegExp) || typeof message !== "string")
      throw new Error(_errors.regex)

    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !regex.test(input) ? message : null
    })
    return this
  }
}
