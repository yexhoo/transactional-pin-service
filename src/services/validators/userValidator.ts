import User from "../../model/user"
import BadRequest from "../../errors/badRequest"

export default class UserValidator {

    create(user: User) {

        if (!user) {
            throw new BadRequest("User data is required")
        }

        if (user.id <= 0) {
            throw new BadRequest("User id is required")
        }

        if (!user.password) {
            throw new BadRequest("Password is required")
        }

        if (!user.pin) {
            throw new BadRequest("PIN is required")
        }

    }
}