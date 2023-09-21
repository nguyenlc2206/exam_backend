import jwt from "jsonwebtoken";
import { Decrypter, KeyEntity, TokenGenerator } from "../entities/jwt.entity";

export class TokenGeneratorAdapter implements TokenGenerator, Decrypter {
    constructor(
        private readonly jwtSecret: string,
        private readonly expiresIn: string
    ) {}

    async generate(key: KeyEntity): Promise<string> {
        return jwt.sign({ key }, this.jwtSecret, {
            expiresIn: this.expiresIn,
        });
    }

    async decrypt(token: string): Promise<any> {
        const decode = jwt.verify(token, this.jwtSecret);
        return decode;
    }
}
