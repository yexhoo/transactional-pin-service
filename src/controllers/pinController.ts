import { GET, route } from "awilix-express";
import { Request, Response } from "express";

import User from "../model/user"
import BaseError from "../errors/baseError"
import PinService from "../services/pinService";

@route("/pin")
export default class PinController{

  public pinService: PinService;

  constructor(container: any) {
    this.pinService = container.pinService;
  }

  @route("/:userId/:password")
  @GET()
  public pin(req: Request, res: Response) {
    return this.pinService
      .get(new User(Number(req.params.userId), req.params.password))
      .then((data) => { res.json(data) })
      .catch((err: BaseError) => res.status(err.code).send({ error: err.message }))
  }
}