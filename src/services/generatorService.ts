export default class GeneratorService {
    salt = (): Uint8Array => {
        return new Uint8Array(String(new Date().getTime())
            .split('')
            .map(n => Number(n)))
    }
}