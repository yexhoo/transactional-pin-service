import { POST, route } from "awilix-express";
import { Request, Response } from "express";
import BaseController from "./baseController"
import BaseError from "../errors/baseError"

import User from "../model/user"
import CredentialService from "../services/credentialService";

@route("/credentials")
export default class CredentialController extends BaseController {

  public credentialService: CredentialService;

  constructor(container: any) {
    super();
    this.credentialService = container.credentialService;
  }

  @route("/")
  @POST()
  public test(req: Request, res: Response) {
    return this.credentialService
      .create(this.bind(req.body, User.prototype))
      .then((data) => { res.json(data) })
      .catch((err: BaseError) => res.status(err.code).send({ error: err.message }))
  }
}
