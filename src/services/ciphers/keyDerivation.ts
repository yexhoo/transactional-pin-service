import pbkdf from 'js-crypto-pbkdf';
import GeneratorService from '../generatorService';

export default class KeyDerivation {

    public generatorService: GeneratorService;

    constructor(container: any) {
        this.generatorService = container.generatorService
    }

    encrypt(password: string, optional_salt: Uint8Array = new Uint8Array(0)): Promise<any> {

        const salt: Uint8Array = optional_salt.length == 0 ? this.generatorService.salt() : optional_salt
        const iterationCount: number = Number(process.env.ITERATION_COUNT);
        const derivedKeyLen: number = Number(process.env.DERIVED_KEY_LEN);
        const hash: any = String(process.env.HASH);

        return pbkdf.pbkdf2(
            password,
            salt,
            iterationCount,
            derivedKeyLen,
            hash
        ).then((data) => { return { data: data, salt: salt } })
    }
}