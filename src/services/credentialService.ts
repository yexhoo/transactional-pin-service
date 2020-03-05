import Aes from "./ciphers/aes"
import User from "../model/user"
import Credential from "../model/credential"
import KeyDerivation from "./ciphers/keyDerivation"
import ValidatorService from "./validators/validatorService"
import CredentialRepository from "./repositories/credentialRepository"
import GeneratorService from "./generatorService"
import Binder from "../binder"

export default class CredentialService {

  public validatorService: ValidatorService;
  public credentialRepository: CredentialRepository;
  public keyDerivation: KeyDerivation
  public aes: Aes
  public generatorService: GeneratorService

  constructor(container: any) {
    this.validatorService = container.validatorService;
    this.credentialRepository = container.credentialRepository;
    this.keyDerivation = container.keyDerivation;
    this.aes = container.aes
    this.generatorService = container.generatorService
  }

  create(user: User): Promise<any> {
    return new Promise((resolve) => { resolve(this.validatorService.create(user)) })
      .then(() => this.credentialRepository.get(user.id))
      .then((rows) => { this.validatorService.credentials(rows) })
      .then(() => this.encryptCredentials(user))
      .then((credential) => this.credentialRepository.save(credential))
      .then(() => { return user })
  }

  update(user: User): Promise<any> {
    
    let credential: Credential
    return new Promise((resolve) => { resolve(this.validatorService.update(user)) })
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
        user.password = user.newPassword
        return this.encryptCredentials(user)
      })
      .then((newCredential) => this.credentialRepository.update(newCredential))
      .then(() => { return user })
  }

  encryptCredentials(user: User) {
    return this.keyDerivation.encrypt(user.password)
      .then((result) => {
        return new Credential(user.id, result.data, result.salt, this.aes.encrypt(user.pin, user.password)
        )
      })
  }
}