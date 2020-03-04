import BaseError from "./baseError"

export default class BadRequest extends BaseError {
  constructor(message?: string) {
    super(400, message)
  }
}