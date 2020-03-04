import User from "../model/user"

export default class BaseController {
  bind = (jsonObject: JSON, prototype: any): any => {
    return Object.assign(jsonObject, Object.create(prototype))
  }
}