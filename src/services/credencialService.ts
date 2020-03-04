import UserValidator from "./validators/userValidator";
import User from "../model/user"

export default class CredencialService {

  public userValidator: UserValidator;

  constructor(container: any) {
    this.userValidator = container.userValidator;
  }

  create(user: User): Promise<any> {
    return new Promise((resolve) => {resolve(this.userValidator.create(user))})
    .then(() =>{ return user})
  }
}