export default class GeneratorService {
    salt = (): Uint8Array => {
        return new Uint8Array(String(new Date().getTime())
            .split('')
            .map(n => Number(n)))
    }

    saltBySource = (source: string): Uint8Array => {
        return new Uint8Array(source
            .split(',')
            .map(n => Number(n)))
    }
}