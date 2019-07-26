const utils = require("../utils")
const { validate, Test } = require("../app")

describe("areValidObjects", () => {
  it("should return true if all given objects are actual objects, else return false", () => {
    expect(utils._areValidObjects({}, {})).toBe(true)
    expect(utils._areValidObjects({ one: "" })).toBe(true)
    expect(utils._areValidObjects(["one"], ["two"])).toBe(false)
    expect(utils._areValidObjects({ one: "" }, {})).toBe(true)
    expect(utils._areValidObjects("foo", {})).toBe(false)
    expect(
      utils._areValidObjects(
        { one: "" },
        { two: undefined },
        { three: null },
        { four: [] },
        { five: false }
      )
    ).toBe(true)
  })
})

describe("haveEqualKeys", () => {
  test.each`
    a                             | b                             | expected
    ${{ foo: "bar", bar: "baz" }} | ${{ bar: "baz", foo: "bar" }} | ${true}
    ${{ foo: "bar" }}             | ${{ bar: "baz", foo: "bar" }} | ${false}
    ${{ foo: "bar", bar: "baz" }} | ${{ foo: "bar" }}             | ${false}
    ${{ foo: "bar", bar: "baz" }} | ${{}}                         | ${false}
    ${{ foo: "bar", bar: "baz" }} | ${"foo"}                      | ${false}
  `("returns $expected for $a and $b", ({ a, b, expected }) => {
    expect(utils._objectsHaveEqualKeys(a, b)).toEqual(expected)
  })
})

describe("inputContainsAllTestKeys", () => {
  test.each`
    input                         | tests                         | expected
    ${{ foo: "bar", bar: "baz" }} | ${{ bar: "baz", foo: "bar" }} | ${true}
    ${{ foo: "bar" }}             | ${{ bar: "baz", foo: "bar" }} | ${false}
    ${{ foo: "bar", bar: "baz" }} | ${{ foo: "bar" }}             | ${true}
    ${{ foo: "bar", bar: "baz" }} | ${{ baz: "foo" }}             | ${false}
    ${{ foo: "bar", bar: "baz" }} | ${"foo"}                      | ${false}
  `("returns $expected for $input and $tests", ({ input, tests, expected }) => {
    expect(utils._inputContainsAllTestKeys(input, tests)).toEqual(expected)
  })
})

describe("containsValidTests", () => {
  it("Should throw if object is empty or does contain properties that doesn't hold actual tests", () => {
    const testsOne = {}
    const inputOne = {
      one: "hi"
    }
    const testsTwo = {
      one: "hi"
    }
    const inputTwo = {
      one: "hi"
    }

    expect(() => {
      validate(inputOne, testsOne)
    }).toThrow()
    expect(() => {
      validate(inputTwo, testsTwo)
    }).toThrow()
  })
})
