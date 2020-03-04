export default class User {

    id: number
    password: string
    pin: string
    newPassword: string

    constructor(id: number = -1, password: string = '', pin: string = '', newPassword: string = '') {
        this.id = id
        this.password = password
        this.pin = pin
        this.newPassword = newPassword
    }
}