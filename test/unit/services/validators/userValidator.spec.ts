import 'mocha'
import { expect } from 'chai'

import ValidatorService from "../../../../src/services/validators/validatorService"
import User from '../../../../src/model/user';

describe('UserValidator', () => {

    let validator : ValidatorService = new ValidatorService()
    let user:User

    it('User id is required', () => {
        user = new User()
        expect(() => validator.create(user)).to.throw(Error, "User id is required")
    });

    it('Password is required', () => {
        user = new User(12345)
        expect(() => validator.create(user)).to.throw(Error, "Password is required")
    });
    
    it('PIN is required', () => {
        user = new User(12345, "password")
        expect(() => validator.create(user)).to.throw(Error, "PIN is required")
    });

    it('Validation ok', () => {
        user = new User(12345, "password", "pin")
        expect(() => validator.create(user)).to.be.ok
    });

});