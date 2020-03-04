import BaseError from "./baseError"

export default class InternalError extends BaseError {
  constructor(message?: string) {
    super(500, message)
  }
}