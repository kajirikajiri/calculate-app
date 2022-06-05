import { err, ok, Result } from "./result"

export const calculator = {
  value: "",
  regex: /[^-()\d/*+.]/g,
  set setValue(v: string) {
    this.value = this.sanitize(v)
  },
  sanitize(v: string) {
    return v.replace(this.regex, '')
  },
  calculate(): Result<number, "Invalid input"> {
    try {
      const result = eval(this.value)
      if (typeof result !== 'number') {
        console.error(`Invalid result: ${result}`)
        return err("Invalid input")
      }

      return ok(result)
    } catch (error) {
      console.error(error)
      return err("Invalid input")
    }
  },
}
