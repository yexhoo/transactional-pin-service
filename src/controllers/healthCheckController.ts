import { Request, Response } from "express";
import { GET, route} from "awilix-express";
import CredentialService from "../services/credentialService";

@route("/healthCheck")
export default class CredentialController {

  public credentialService: CredentialService;

  constructor(container: any) {
    this.credentialService = container.credentialService;
  }

  @route("/")
  @GET()
  public check(req: Request, res: Response) {
    return  res.json({"application": "transactionl-pin-service"})
  }
}