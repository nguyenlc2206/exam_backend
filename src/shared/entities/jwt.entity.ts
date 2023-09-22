export interface TokenGenerator {
    generate(key: KeyEntity): Promise<string>
}

export interface Decrypter {
    decrypt(value: string): Promise<any>
}

export type KeyEntity = {
    email: string
    id: string
}

/* Define DecodeAccountTokenType model*/
export type DecodeAccountTokenType = {
    key: string
    iat: number
    exp?: number
}
