import User from "../../model/user"
import BadRequest from "../../errors/badRequest"

export default class ValidatorService {

    create(user: User) {
        this.pin(user)
        if (!user.pin) { throw new BadRequest("PIN is required") }
    }

    update(user: User) {
        this.pin(user)
        if (!user.newPassword) { throw new BadRequest("New password is required") }
    }

    pin(user: User) {
        if (!user) { throw new BadRequest("User data is required") }
        if (user.id <= 0) { throw new BadRequest("User id is required") }
        if (!user.password) { throw new BadRequest("Password is required") }
    }

    password(current: string, stored: string) {
        if (current !== stored) { throw new BadRequest("Wrong password") }
    }

    exist(rows: any[]) {
        if (!rows.length) { throw new BadRequest("User not exists") }
    }

    credentials(rows: any[]) {
        if (rows.length) { throw new BadRequest("User credentials already exists") }
    }
}