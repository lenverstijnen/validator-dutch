const { validate, Test, setCustomMessages } = require("../app")
const _errors = require("../errorMessages")

describe("validate", () => {
  it("should throw if input or tests is not an object", () => {
    expect(() => {
      validate("", "")
    }).toThrowError(new Error(_errors.validate[0]))
    expect(() => {
      validate({}, "")
    }).toThrowError(new Error(_errors.validate[0]))
    expect(() => {
      validate({}, [])
    }).toThrowError(new Error(_errors.validate[0]))
  })
  it("should throw if one or more property's tests on test aren't actual test instances", () => {
    expect(() => {
      validate({ one: "a" }, { one: "b" })
    }).toThrowError(new Error(_errors.validate[2]))
    expect(() => {
      validate({ one: "" }, { one: Test().optional() })
    }).not.toThrow()
  })
  it("Should throw if input is not an object", () => {
    const tests = {
      one: Test().optional()
    }

    const input = "Hoi"

    expect(() => {
      validate(input, tests)
    }).toThrow()
  })
})

describe("setCustomMessages", () => {
  it("Should set the custom message if an custom message is defined", () => {
    setCustomMessages({
      required: "Dit moet ingevuld zijn",
      minLength:
        "De zin moet uit {minLength} karakters bestaan, dat is de minimale lengte"
    })

    const tests = {
      one: Test().required(),
      two: Test().minLength(4),
      three: Test().number()
    }
    const input = {
      one: "",
      two: "1",
      three: "string"
    }

    const result = validate(input, tests)

    expect(result).toMatchObject({
      one: "Dit moet ingevuld zijn",
      two: "De zin moet uit 4 karakters bestaan, dat is de minimale lengte",
      three: "Vul een getal in"
    })
  })

  it("should throw if you try to set a message on a method that doesn't exist", () => {
    expect(() => {
      setCustomMessages({ random: "random" })
    }).toThrowError(new Error(_errors.setCustomMessages[1]))
  })

  it("should throw the input is not an object", () => {
    expect(() => {
      setCustomMessages("foo")
    }).toThrowError(new Error(_errors.setCustomMessages[0]))
  })
})
