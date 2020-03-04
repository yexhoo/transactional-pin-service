import { Request, Response } from "express";
import { POST, route } from "awilix-express";

import Binder from "../binder"
import User from "../model/user"
import BaseError from "../errors/baseError"
import CredentialService from "../services/credentialService";

@route("/credentials")
export default class CredentialController {

  public credentialService: CredentialService;

  constructor(container: any) {
    this.credentialService = container.credentialService;
  }

  @route("/")
  @POST()
  public save(req: Request, res: Response) {
    return this.credentialService
      .create(Binder.bind(req.body, User.prototype))
      .then((data) => { res.json(data) })
      .catch((err: BaseError) => res.status(err.code).send({ error: err.message }))
  }
}