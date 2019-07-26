const Validators = require("./Validators")
const _errors = require("./errorMessages")
const messages = require("./messages")
const { _areValidObjects, _containsValidTests } = require("./utils")

const Test = () => {
  return new Validators()
}

const setCustomMessages = customMessages => {
  if (!_areValidObjects(customMessages))
    throw new Error(_errors.setCustomMessages[0])
  for (let prop in customMessages) {
    if (!messages.hasOwnProperty(prop))
      throw new Error(_errors.setCustomMessages[1])
  }
  for (let key in customMessages) {
    messages[key] = customMessages[key]
  }
}

const validate = (input, tests) => {
  if (!_areValidObjects(input, tests)) throw new Error(_errors.validate[0])
  if (!_containsValidTests(tests)) throw new Error(_errors.validate[2])

  const errors = {}
  for (let key in tests) {
    tests[key].tests.forEach(func => {
      const error = func(input[key], input)

      if (error) errors[key] = error
      if (
        (tests[key].isOptional &&
          typeof input[key] === "string" &&
          input[key].length === 0) ||
        (tests[key].isOptional && !input[key])
      )
        delete errors[key]
    })
  }
  return Object.keys(errors).length ? errors : null
}

module.exports = { validate, Test, setCustomMessages }
