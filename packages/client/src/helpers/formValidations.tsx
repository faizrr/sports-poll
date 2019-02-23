export const required = (value: string | undefined) =>
  value ? undefined : 'Required'
export const shouldMatch = (valueToMatch: string) => (
  value: string | undefined
) => (value === valueToMatch ? undefined : "Doesn't match")

export const combineValidations = (
  validations: Array<(value: string) => string | undefined>
) => (value: string | never) => {
  for (let validation of validations) {
    const validationResult = validation(value)
    if (validationResult) {
      return validationResult
    }
  }
}
