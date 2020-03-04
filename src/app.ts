import { loadControllers, scopePerRequest } from "awilix-express";
import express, { Application } from "express";
import setup from "./setup";
import dotenv from "dotenv"

const app: Application = express();
dotenv.config();

app.use(express.json());
app.use(scopePerRequest(setup.getContainer()));
app.use(loadControllers("controllers/**/*.ts", { cwd: __dirname }));
app.use(loadControllers("controllers/**/*.js", { cwd: __dirname }));
app.listen(process.env.PORT, () => console.info("Transactional PIN service is running ..."));