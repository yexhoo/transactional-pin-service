import { POST, route } from "awilix-express";
import { Request, Response } from "express";
import BaseController from "./baseController"
import BaseError from "../errors/baseError"

import User from "../model/user"
import CredencialsService from "../services/credencialService";

@route("/credentials")
export default class CredentialController extends BaseController {

  public credencialsService: CredencialsService;

  constructor(container: any) {
    super();
    this.credencialsService = container.credencialService;
  }

  @route("/")
  @POST()
  public test(req: Request, res: Response) {
    return this.credencialsService
      .create(this.bind(req.body, User.prototype))
      .then((data) => { res.json(data) })
      .catch((err: BaseError) => res.status(err.code).send({ error: err.message }))
  }
}
