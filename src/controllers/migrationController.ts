import { GET, route } from "awilix-express";
import { Request, Response } from "express";

import BaseError from "../errors/baseError";
import MigrationService from "../services/migrationService";

@route("/migration")
export default class MigrationController {

  public migrationService: MigrationService;

  constructor(container: any) {
    this.migrationService = container.migrationService;
  }

  @route("/up/")
  @GET()
  public up(req: Request, res: Response) {
    this.migrationService.up()
      .then((data) => { res.json(data) })
      .catch((err: BaseError) => res.status(err.code).send({ error: err.message }))
  }
}