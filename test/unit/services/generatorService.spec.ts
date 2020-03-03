import 'mocha'
import { expect } from 'chai'

import GeneratorService from '../../../src/services/generatorService';

describe('GeneratorService', () => {

    let service: GeneratorService = new GeneratorService()

    it('Get salt method returns different values every time', function () {
        expect(service.salt()).is.not.equal(service.salt())
    });
});
