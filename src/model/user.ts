export default class User {

    id:number
    password: string
    pin: string

    constructor(id:number = -1, password: string = '', pin: string = ''){
        this.id = id
        this.password = password
        this.pin = pin
    }
}