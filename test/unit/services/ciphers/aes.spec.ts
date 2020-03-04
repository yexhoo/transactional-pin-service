import 'mocha'
import { expect } from 'chai'
import Aes from '../../../../src/services/ciphers/aes';

describe('Aes', () => {

    let service: Aes = new Aes()

    it('encrypt data', function () {
        const message = "message", key = "secret"
        const encrypted = service.encrypt(message, key)
        expect(service.decrypt(encrypted, key)).is.equal(message)
    });
});