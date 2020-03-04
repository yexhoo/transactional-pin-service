const util = require("util")
const executor = require("../../db/executor")
const script = require("./scripts/credential")
import Credential from "../../model/credential"

export default class CredentialRepository {
    public get(userId: number): Promise<any> {
        return executor.select(util.format(script.get, userId))
    }

    public save(c: Credential) {
        return executor
            .run(util
                .format(script.save
                    , c.userId
                    , c.pwd?.toString()
                    , c.salt?.toString()
                    , c.pin?.toString()))
    }

    public update(c: Credential) {
        return executor
            .run(util
                .format(script.update
                    , c.pwd?.toString()
                    , c.salt?.toString()
                    , c.pin?.toString()
                    , c.userId))
    }
}