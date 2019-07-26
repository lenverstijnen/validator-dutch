module.exports = {
  maxLength: "validator-dutch: maxLength must be defined and of type 'number'",
  minLength: "validator-dutch: minLength must be defined and of type 'number'",
  minAndMaxLength: [
    "validator-dutch: minLength can't be equal to, or bigger then maxLength",
    "validator-dutch: minLength & maxLength must be defined and of type 'number'"
  ],
  required:
    "validator-dutch: an input can't be required and optional at the same time",
  optional:
    "validator-dutch: an input can't be optional and required at the same time",
  regex:
    "validator-dutch: 'regex' must be an instance of RegExp and example must be of type 'string'",
  validate: [
    "validator-dutch: 'input' and 'tests' must be defined and of type 'object'",
    "validator-dutch: 'input' must contain all the properties of the 'tests' object",
    "validator-dutch: All properties of the 'tests' object must contain valid tests"
  ],
  setCustomMessages: [
    "validator dutch: messages must be defined and of type 'object'",
    "validator dutch: you can't set a custom message on a method that doesn't exist"
  ]
}
