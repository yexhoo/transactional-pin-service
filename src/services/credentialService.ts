import User from "../model/user"
import UserValidator from "./validators/userValidator";
import CredentialRepository from "./repositories/credentialRepository"
import BadRequest from "../errors/badRequest";
import CipherService from "./cipherService";
import Credential from "../model/credential"

export default class CredentialService {

  public userValidator: UserValidator;
  public credentialRepository: CredentialRepository;
  public cipherService: CipherService

  constructor(container: any) {
    this.userValidator = container.userValidator;
    this.credentialRepository = container.credentialRepository;
    this.cipherService = container.cipherService;
  }

  create(user: User): Promise<any> {
    return new Promise((resolve) => { resolve(this.userValidator.create(user)) })
      .then(() => this.credentialRepository.get(user.id))
      .then((rows) => { if (rows.length) { throw new BadRequest("User credentials already exists") } })
      .then(() => this.encryptUser(user))
      .then((credential) => this.credentialRepository.save(credential))
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