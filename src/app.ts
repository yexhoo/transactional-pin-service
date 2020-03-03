import { loadControllers, scopePerRequest } from "awilix-express";
import express, { Application } from "express";
import setup from "./setup";

const app: Application = express();
const PORT = 3000

app.use(express.json());
app.use(scopePerRequest(setup.getContainer()));
app.use(loadControllers("controllers/**/*.ts", { cwd: __dirname }));
app.use(loadControllers("controllers/**/*.js", { cwd: __dirname }));
app.listen(PORT, () => console.info("Transactional PIN service is running ..."));