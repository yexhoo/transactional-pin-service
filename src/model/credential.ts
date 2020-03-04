export default class Credential {

    public userId?: number
    public pwd?: Uint8Array
    public pin?: Uint8Array
    public pwdSalt?: Uint8Array
    public pinSalt?: Uint8Array
  
    constructor(userId?:number, pwd?: Uint8Array, pin?: Uint8Array, pwdSalt?: Uint8Array, pinSalt?: Uint8Array) {
        this.userId = userId
        this.pwd = pwd
        this.pin = pin
        this.pwdSalt = pwdSalt
        this.pinSalt = pinSalt
    }
}