const util = require("util")
const executor = require("../../db/executor")
const script = require("./scripts/user")
import Credential from ".././../model/credential"

export default class UserRepository {
    public get(userId: number): Promise<any> {
        return executor.select(util.format(script.get, userId))
    }

    public save(c: Credential) {
        return executor
            .run(util
                .format(script.save
                    , c.userId
                    , c.pwd?.toString()
                    , c.pin?.toString()
                    , c.pwdSalt?.toString()
                    , c.pinSalt?.toString()))
    }
}