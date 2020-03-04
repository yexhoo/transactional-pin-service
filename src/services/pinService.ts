import User from "../model/user"
import ValidatorService from "./validators/validatorService";
import CredentialRepository from "./repositories/credentialRepository"
import KeyDerivation from "./ciphers/keyDerivation";
import Credential from "../model/credential"
import Aes from "./ciphers/aes"
import GeneratorService from "./generatorService"
import Binder from "../binder"

export default class PinService {

  public validatorService: ValidatorService;
  public credentialRepository: CredentialRepository;
  public keyDerivation: KeyDerivation
  public aes: Aes
  public generatorService: GeneratorService

  constructor(container: any) {
    this.validatorService = container.validatorService;
    this.credentialRepository = container.credentialRepository;
    this.keyDerivation = container.keyDerivation;
    this.aes = container.aes;
    this.generatorService = container.generatorService;
  }

  get(user: User): Promise<any> {

    let credential: Credential
    return new Promise((resolve) => { resolve(this.validatorService.pin(user)) })
      .then(() => this.credentialRepository.get(user.id))
      .then((rows) => {
        this.validatorService.exist(rows)
        credential = Binder.bind(rows[0], Credential.prototype)
      })
      .then(() => {
        const salt = this.generatorService.saltBySource(credential.salt.toString())
        return this.keyDerivation.encrypt(user.password, salt)
      })
      .then((result) => {
        this.validatorService.password(result.data.toString(), credential.pwd.toString())
        user.pin = this.aes.decrypt(credential.pin, user.password)
        return user
      })
  }
}