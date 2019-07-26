const isValidObject = obj => obj.constructor === Object

// TODO: Export invidiual utils
module.exports = {
  _areValidObjects(...objects) {
    return objects.every(isValidObject)
  },
  _containsValidTests(tests) {
    let isTest = true
    if (!Object.keys(tests).length) return false
    for (let key in tests) {
      if (!tests[key].isTest) isTest = false
    }
    return isTest
  },
  _setMessage(message, replacers) {
    return message.replace(/{(\w+)}/g, (m, p1) => {
      return replacers[p1]
    })
  },
  _objectsHaveEqualKeys(input, tests) {
    const inputKeys = Object.keys(input)
    const testsKeys = Object.keys(tests)
    if (
      !isValidObject(input) ||
      !isValidObject(tests) ||
      inputKeys.length !== testsKeys.length
    )
      return false

    return inputKeys.every(k => testsKeys.includes(k))
  },
  _inputContainsAllTestKeys(input, tests) {
    let containsAllTests = true
    const testKeys = Object.keys(tests)
    testKeys.forEach(key => {
      if (!input.hasOwnProperty(key)) containsAllTests = false
    })
    return containsAllTests
  }
}
