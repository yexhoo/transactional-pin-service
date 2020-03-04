export default class Credential {

    public userId: number
    public pwd: Uint8Array
    public salt: Uint8Array
    public pin: string
  
    constructor(userId:number, pwd: Uint8Array, salt: Uint8Array, pin: string) {
        this.userId = userId
        this.pwd = pwd
        this.salt = salt
        this.pin = pin
    }
}