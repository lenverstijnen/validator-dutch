# Validator Dutch

Simple form-validation package for validating input strings. The error messages are in Dutch but can be customised.

## Installation

```
npm install validator-dutch
```

## Example Usage:

The validate function returns an object with error messages or null if no errors are found.

```javascript
import { Test, validate } from "validator-dutch"

const tests = {
  atLeastTenChars: Test().minLength(10),
  atLeastTenCharsOrEmpty: Test()
    .minLength(10)
    .optional(),
  date: Test().date(),
  equality: Test().shouldEqual("date")
}

const input = {
  atLeastTenChars: "123", // => fails, length is 3
  atLeastTenCharsOrEmpty: "", // => passes, because is optional
  date: "1-12-2018" // => passes
  equality: "1-12-2018" // => passes, cause is equal to date"
}

validate(input, tests)
```

## Validators:

(all validators are chainable)

### Javascript types

| Validator    | Description                                                                |
| ------------ | -------------------------------------------------------------------------- |
| dateObject() | Checks if input is a javascript date object. Usually used for date pickers |
| boolean()    | Checks if input is boolean                                                 |
| array()      | Checks if input is a javascript array. The array can be empty              |
| object()     | Checks if input is a javascript object. The object can be empty            |

### String validators

| Validator                             | Description                                                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| maxLength(maxLength)                  | Checks if string doesn't exceed the maxLenght. The message from `required()` is returned if input has no length.         |
| minLength(minLength)                  | Checks if string is longer than minLength                                                                                |
| minAndMaxLength(minLength, maxLength) | Checks if string is between the range of min and max length                                                              |
| shouldEqual(inputName)                | Compares the input of inputName (see example usage)                                                                      |
| required()                            | Checks if input is given                                                                                                 |
| optional()                            | Input is optional. You can chain this with other methods if input is optional but has to be validated if input is given. |
| email()                               | Checks if input is valid e-mail adress                                                                                   |
| dutchPhone()                          | Checks if input is a Dutch phone number                                                                                  |
| dutchMobile()                         | Checks if input is a Dutch mobile phone number                                                                           |
| postalCode()                          | Checks if input is a Dutch postal code                                                                                   |
| time()                                | Checks if input is a time. Valid formats are 13:00 and 13.00                                                             |
| date()                                | Checks if input is a valid date                                                                                          |
| number()                              | Checks if input is a number                                                                                              |
| minNumber(minNumber)                  | Checks if input is a number that is larger than minNumber                                                                |
| maxNumber(maxNumber)                  | Checks if input is a number that is smaler than maxNumber                                                                |
| minAndMaxNumber(minNumber, maxNumber) | Checks if input is a number between min and max number                                                                   |
| fullName()                            | Checks if full name is given (first and last name)                                                                       |
| regex(regex, message)                 | Checks if input matches the regex. A custom errormessage is mandatory for this method                                    |

Unless you use `optional()`, the input is always required.

## Custom Error Messages

If any errors are found the package returns an object with dutch error messages. This is fully customizable. There are two ways to customize error messages.

### Change standard messages

Import the `setCustomMessages()` method from the package. The method takes in an object, where the property names should be the names of the methods you want to set a custom message for. You have to call the method before you call the `validate()` function.

```javascript
import { Test, validate, setCustomMessages } from "validator-dutch"

// use the name of the method to target it's message
const customMessages = {
  email: "your custom message",
  number: "another custom message",
  minLength: "you should use {minlength} characters"
}

setCustomMessages(customMessages)
// ...
```

For all the methods that take in arguments, you can output this arguments as a variable in your custom error message. You should place the variables between curly braces like shown on the `minLength` property above. The variable names are the same as the names of the arguments the method takes in. This does not work for the `regex()` method, since you have to give in a custom message anyway.

### Set custom message on a method

You can give in a custom message on every method it'self. Make sure you always pass the message as the last argument. This can come in handy if you want to have two different messages on the same method or just want to change the message for one method.

```javascript
import { Test, validate } from "validator-dutch"

// the message should always be the last argument!
const tests = {
  email: Test().email("custom message"),
  emailTwo: Test().email("different custom message"),
  maxLength: Test().maxLength(4, "custom message") // note that the message is the last argument
}
// ...
```
