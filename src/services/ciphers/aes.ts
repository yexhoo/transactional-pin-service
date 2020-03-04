const crypto = require("crypto-js");

export default class Aes {
    encrypt(data:string, key:string): string {
        return crypto.AES.encrypt(data, key).toString();
    }

    decrypt(data:string, key:string) {
        return crypto.AES.decrypt(data, key).toString(crypto.enc.Utf8);
    }
}