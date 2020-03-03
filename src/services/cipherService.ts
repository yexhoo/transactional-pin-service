import pbkdf from 'js-crypto-pbkdf'; // for npm
import GeneratorService from './generatorService';

export default class CipherService {
    
    generatorService: GeneratorService;

    constructor(generatorService: GeneratorService){
        this.generatorService = generatorService
    }

    encrypt(password: string): Promise<Uint8Array> {
        
        const salt: Uint8Array = this.generatorService.salt()
        const iterationCount: number = Number(process.env.ITERATION_COUNT);
        const derivedKeyLen: number = Number(process.env.DERIVED_KEY_LEN);
        const hash: any = String(process.env.HASH);

        return pbkdf.pbkdf2(
            password,
            salt,
            iterationCount,
            derivedKeyLen,
            hash
        )
    }
}