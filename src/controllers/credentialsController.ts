import { GET, route } from "awilix-express";
import {Request, Response} from "express";

@route("/credentials")
export default class ProductsController {

  @route("/")
  @GET()
  public test(req: Request, res: Response) {
    console.log(req)
    res.json(req.body);
  }
}
