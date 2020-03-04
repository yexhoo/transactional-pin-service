import User from "../model/user"
import UserValidator from "./validators/userValidator";
import UserRepository from "./repositories/userRepository"
import BadRequest from "../errors/badRequest";
import CipherService from "./cipherService";
import Credential from "../model/credential"

export default class CredentialService {

  public userValidator: UserValidator;
  public userRepository: UserRepository;
  public cipherService: CipherService

  constructor(container: any) {
    this.userValidator = container.userValidator;
    this.userRepository = container.userRepository;
    this.cipherService = container.cipherService;
  }

  create(user: User): Promise<any> {
    return new Promise((resolve) => { resolve(this.userValidator.create(user)) })
      .then(() => this.userRepository.get(user.id))
      .then((rows) => { if (rows.length) { throw new BadRequest("User credentials already exists") } })
      .then(() => this.encryptUser(user))
      .then((credential) => this.userRepository.save(credential))
      .then(() => { return user })
  }

  encryptUser(user: User) {

    const credential: Credential = new Credential()
    credential.userId = user.id
    return this.cipherService.encrypt(user.password)
      .then((result) => {
        credential.pwd = result.data
        credential.pwdSalt = result.salt
        return this.cipherService.encrypt(user.pin)
      })
      .then((result) => {
        credential.pin = result.data
        credential.pinSalt = result.salt
        return credential
      })
  }
}