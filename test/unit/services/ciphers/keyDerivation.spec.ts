import 'mocha'
import { expect } from 'chai'
import { stubObject } from "ts-sinon";

import KeyDerivation from './../../../../src/services/ciphers/keyDerivation';
import GeneratorService from '../../../../src/services/generatorService';

describe('KeyDerivation', () => {
    
    const TEST_CIPHER_VALUES = { "ITERATION_COUNT": 500, "DERIVED_KEY_LEN": 8, "HASH": "MD5" };
    process.env = Object.assign(TEST_CIPHER_VALUES, process.env);

    let service: KeyDerivation, generatorServiceStub: any

    beforeEach(() => {
        generatorServiceStub = stubObject<GeneratorService>(new GeneratorService());

        const container : any = {"generatorService": generatorServiceStub }
        service = new KeyDerivation(container)
    })

    it('encrypt data', function () {

        const password = "myPassword"
        const SALT_MOCK: number[] = [1, 5, 8, 3, 2, 5, 3, 9, 1, 0, 8, 2, 8]
        const expectedResult: Uint8Array = new Uint8Array([141, 95, 133, 171, 145, 221, 233, 36])
        generatorServiceStub.salt.returns(new Uint8Array(SALT_MOCK));

        return service.encrypt(password)
            .then((encryptedPassword) => {
                expect(encryptedPassword.data.toString()).to.equal(expectedResult.toString())
            })
            .catch(function (m) { throw new Error(m.message) })
    });
});
