import Aes from "./ciphers/aes"
import User from "../model/user"
import Credential from "../model/credential"
import KeyDerivation from "./ciphers/keyDerivation"
import ValidatorService from "./validators/validatorService"
import CredentialRepository from "./repositories/credentialRepository"

export default class CredentialService {

  public validatorService: ValidatorService;
  public credentialRepository: CredentialRepository;
  public keyDerivation: KeyDerivation
  public aes: Aes

  constructor(container: any) {
    this.validatorService = container.validatorService;
    this.credentialRepository = container.credentialRepository;
    this.keyDerivation = container.keyDerivation;
    this.aes = container.aes
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
    return new Promise((resolve) => { resolve(this.validatorService.update(user)) })
      .then(() => this.credentialRepository.get(user.id))
      .then((rows) => { this.validatorService.exist(rows); return rows[0];})
      .then((credential) => {

        user.pin = this.aes.decrypt(credential.pin, user.password)
        user.password = user.newPassword
        return this.encryptCredentials(user)
      })
      .then((credential) => this.credentialRepository.update(credential))
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