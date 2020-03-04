import InternalError from "../errors/internalError";
import Constants from "../constants"

const setup = require("../migrations/migrations-setup")
const helper = require("../migrations/migrations-helper")
const file = require("../migrations/wrappers/file-wrapper")
const wrapper = require("../migrations/wrappers/migrate-wrapper")

export default class MigrationService {

  up = (): Promise<any> => {
    return setup
      .createConfigs()
      .then((lastRun: any[]) => this.buildFile(lastRun))
      .then(() => this.runMigrations())
      .catch((err: Error) => { throw new InternalError(err.message) })
  }

  runMigrations = (): Promise<any> => {
    return wrapper
      .load({ stateStore: Constants.MIGRATE_FILE })
      .then((instance: any) => wrapper.up(instance))
      .then(() => file.read(Constants.MIGRATE_FILE))
      .then((file: any) => this.saveLastRun(file))
  }

  saveLastRun = (file: any): Promise<any> =>
    setup.saveLastRun(helper.parseFile(file));

  buildFile = (lastRun: Array<any>) =>
    file
      .write(Constants.MIGRATE_FILE, helper.formatValidFile(lastRun))

  down = () => {
    return { greeting: "Migration down ..." };
  }
}